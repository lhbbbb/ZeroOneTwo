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


# 등록
def make_user(request):
    import IPython
    IPython.embed()
    
    pass


@csrf_exempt
def test(request):
    try:
        file = request.FILES['image']
    except:
        data = {'result':'사진을 넣어주세요.'}
        return JsonResponse(data)
    # 파일 이름 수정하는 로직을 작성하자.
    file.name = 'test.jpg'
    default_storage.save(file.name, file)
    data = {'result':'사진이 저장되었습니다.'}
    
    # 
    return JsonResponse(data)


def index(request):
    return HttpResponse('hello')










def exchange(request, mx):
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

