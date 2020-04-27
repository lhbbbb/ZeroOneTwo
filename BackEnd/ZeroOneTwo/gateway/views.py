from django.shortcuts import render, HttpResponse
from django.contrib.auth import get_user_model
from django.http import JsonResponse  
from rest_framework import viewsets
from .serializers import *
from .models import User, Boards, Receipts, Items, Rate
from decouple import config


import urllib.request
import requests
import json
import datetime


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class BoardsViewSet(viewsets.ModelViewSet):
    serializer_class = BoardsSerializer
    queryset = Boards.objects.all()

class ReceiptsViewSet(viewsets.ModelViewSet):
    serializer_class = ReceiptsSerializer
    queryset = Receipts.objects.all()

class ItemsViewSet(viewsets.ModelViewSet):
    serializer_class = ItemsSerializer
    queryset = Items.objects.all()

class RateViewSet(viewsets.ModelViewSet):
    serializer_class = RateSerializer
    queryset = Rate.objects.all()


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
            # 'USD', CNH, JPY(100)
            for info in exchange:
                if info['cur_unit'] == 'USD':
                    new_obj_ttb['usa'] = info['ttb'].replace(",",'')
                    new_obj_tts['usa'] = info['tts'].replace(",",'')
                elif info['cur_unit'] == 'CNH':
                    new_obj_ttb['cha'] = info['ttb'].replace(",",'')
                    new_obj_tts['cha'] = info['tts'].replace(",",'')
                elif info['cur_unit'] == 'JPY(100)':
                    new_obj_ttb['jpa'] = info['ttb'].replace(",",'')
                    new_obj_tts['jpa'] = info['tts'].replace(",",'')
            # DB에 저장
            import IPython
            IPython.embed()
            ttb_unit = Rate.objects.create(
                date = new_obj_ttb['date'],
                usa = float(new_obj_ttb['usa']),
                jpa = float(new_obj_ttb['jpa']) / 100,
                cha = float(new_obj_ttb['cha']),
                way = new_obj_ttb['way'],
                register = new_obj_ttb['register'],
                regdate = new_obj_ttb['regdate']
            )
            tts_unit = Rate.objects.craete(
                date = new_obj_tts['date'],
                usa = float(new_obj_tts['usa']),
                jpa = float(new_obj_tts['jpa']) / 100,
                cha = float(new_obj_tts['cha']),
                way = new_obj_tts['way'],
                register = new_obj_tts['register'],
                regdate = new_obj_tts['regdate']                
            )

    data = {
        'result' : True,
    }
    return JsonResponse(data)