# import sys, os
# sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

from django.shortcuts import render, HttpResponse
from django.contrib.auth import get_user_model, authenticate, login
from django.http import JsonResponse  
from rest_framework import viewsets
from .serializers import *
from .models import User, Boards, Receipts, Items, Rate
from decouple import config
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage

import urllib.request
import requests
import json
import datetime
import base64

import tensorflow as tf
import numpy as np

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
from rest_framework.renderers import JSONRenderer

from IPython import embed
from pprint import pprint

from .naver_ocr import image_NAVER_AI
from .parse import parse_en, parse_jp

from .check_image import angle
from .translation import enko, naver_api


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserModelSerializer
    queryset = User.objects.all()

class BoardsViewSet(viewsets.ModelViewSet):
    serializer_class = BoardsModelSerializer
    queryset = Boards.objects.all()

class ReceiptsViewSet(viewsets.ModelViewSet):
    serializer_class = ReceiptsModelSerializer
    queryset = Receipts.objects.all()

class ItemsViewSet(viewsets.ModelViewSet):
    serializer_class = ItemsModelSerializer
    queryset = Items.objects.all()

class RateViewSet(viewsets.ModelViewSet):
    serializer_class = RateModelSerializer
    queryset = Rate.objects.all()


# Boards URL
class BoardsDataView(generics.GenericAPIView):
    serializer_class = BoardsModelSerializer
    # permission_classes = [IsAuthenticated,] # 인증
    queryset = ''

    def get(self, request, format=None):
        try:
            boards = User.objects.get(pk=request.user.pk).boards.all()
        except:
            return JsonResponse({'error':'No user'})
        serializer = BoardsModelSerializer(boards, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        data = request.data
        data['register'] = request.user.pk
        serializer = BoardsModelSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_receipts(request, board_id):
    '''
    특정 보드에 해당하는 모든 영수증을 반환합니다.
    Board의 id를 url로 전달해야합니다.
    '''
    receipts = list(Receipts.objects.filter(board=board_id).values())
    return JsonResponse({"data": receipts})


# Receipts URL
class ReceiptsDataView(generics.GenericAPIView):
    serializer_class = ReceiptsModelSerializer
    queryset = ''
    
    def get(self, request, format=None):
        
        pass

    def post(self, request, format=None):
        data = request.data
        try:
            file = request.FILES['image']
        except:
            data = {'result':'사진을 넣어주세요.'}
            return JsonResponse(data)
        
        b64_string = base64.b64encode(file.read()) # 이미지 bytes 형식
        img_string = b64_string.decode('utf-8') # 네이버로 보내기 위해 string 전환     

        datetime_now = datetime.datetime.now()
        t_now = '{}_{}_{}_{}_{}_{}'.format(datetime_now.year, datetime_now.month, datetime_now.day, 
                                            datetime_now.hour, datetime_now.minute, datetime_now.second)
        
        country = request.data.get('country')
        
        name = request.user.username if request.user.username else 'temp'
        file_name = name + '_' + t_now + '.jpg'

        default_storage.save(file_name, file)
        
        # Load data
        img = tf.keras.preprocessing.image.load_img("images/" + file_name, target_size=[224, 224])
        img = tf.keras.preprocessing.image.img_to_array(img)
        img = tf.keras.applications.mobilenet_v2.preprocess_input(img[tf.newaxis,...])
        
        data = json.dumps({"signature_name": "serving_default", "instances": img.tolist()})
        headers = {"content-type": "application/json"}

        json_response = requests.post(
            "http://localhost:8501/v1/models/mobilenet:predict", data=data, headers=headers
        )

        predictions = np.array(json.loads(json_response.text)["predictions"])
        # 0 => 영수증 아님, 1 => 영수증
        is_receipts = np.argmax(predictions)
        if is_receipts: 
            global angle
            angle_result = angle.calculate_angles("images/" + file_name)
            if -10 <= angle_result[0] <= 10 or 80 <= angle_result[0] <= 100:
                OCR_result = image_NAVER_AI(img_string, country)
                result = parse_jp(OCR_result) if country == 'jp' else parse_en(OCR_result)
                for idx, item in enumerate(result.get('items')):
                    translated = enko.enko_translation(item.get('item'))
                    result['items'][idx]['item_translated'] = translated
                return JsonResponse(result)
            else:
                return JsonResponse({'result':'영수증이 너무 기울었습니다.'})
        else:
            return JsonResponse({'result':'영수증이 아닙니다.'})
            
            # serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def index(request):
    '''
    This is an index page.
    '''
    return HttpResponse('hello')



def exchange(request, mx):
    '''
    환율 정보를 가져와 DB에 저장하는 URL입니다.
    '''
    exchange_SECRET_KEY=config('exchange_SECRET_KEY')
    
    for i in range(0, mx):
        right = str(datetime.datetime.now() - datetime.timedelta(days=i))
        day = right[0:4] + right[5:7] + right[8:10]
        url = 'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey={}&searchdate={}&data=AP01'.format(exchange_SECRET_KEY, day)
        exchange = requests.get(url).json()
        
        if exchange:
            t_now = datetime.datetime.now()
            that_day = '{}-{}-{}'.format(day[0:4], day[4:6], day[6:8])
            
            new_obj_ttb = {
                'date' : that_day,
                'usa' : '',
                'jpa' : '',
                'cha' : '',
                'way' : 'ttb',
                'register' : request.user,
                'regdate' : t_now
            }
            new_obj_tts = {
                'date' : that_day,
                'usa' : '',
                'jpa' : '',
                'cha' : '',
                'way' : 'tts',
                'register' : request.user,
                'regdate' : t_now
            }
            # 'USD', CNH, JPY(100) / 2015년 이전 중국 위안화는 CNY
            for info in exchange:
                cur_unit = info['cur_unit']
                if cur_unit == 'USD':
                    new_obj_ttb['usa'] = info['ttb'].replace(",",'')
                    new_obj_tts['usa'] = info['tts'].replace(",",'')
                elif cur_unit == 'CNY' or cur_unit ==  'CNH':
                    new_obj_ttb['cha'] = info['ttb'].replace(",",'')
                    new_obj_tts['cha'] = info['tts'].replace(",",'')
                elif cur_unit == 'JPY(100)':
                    new_obj_ttb['jpa'] = info['ttb'].replace(",",'')
                    new_obj_tts['jpa'] = info['tts'].replace(",",'')
            ttb_unit = Rate.objects.create(
                date = new_obj_ttb['date'],
                usa = float(new_obj_ttb['usa']),
                jpa = round(float(new_obj_ttb['jpa']) / 100, 4),
                cha = float(new_obj_ttb['cha']),
                way = new_obj_ttb['way'],
                register = new_obj_ttb['register'],
                regdate = new_obj_ttb['regdate']
            )
            tts_unit = Rate.objects.create(
                date = new_obj_tts['date'],
                usa = float(new_obj_tts['usa']),
                jpa = round(float(new_obj_tts['jpa']) / 100, 4),
                cha = float(new_obj_tts['cha']),
                way = new_obj_tts['way'],
                register = new_obj_tts['register'],
                regdate = new_obj_tts['regdate']                
            )
    
    data = {
        'result' : True,
    }
    return JsonResponse(data)

