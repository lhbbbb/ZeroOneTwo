from django.shortcuts import render, HttpResponse
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
        
        new_obj_ttb = {
            'date' : '',
            'usa' : '',
            'jpa' : '',
            'cha' : '',
            'way' : 'ttb',
            'register' : '',
            'regdate' : ''
        }
        new_obj_tts = {
            'date' : '',
            'usa' : '',
            'jpa' : '',
            'cha' : '',
            'way' : 'tts',
            'register' : '',
            'regdate' : ''
        }        
        # new_obj_ttb = Rate.objects.create(
        #     date = '',
        #     usa = '',
        # )
        # new_obj_tts = Rate.objects.create(
            
        # )
        import IPython
        IPython.embed()
    #     for info in exchange:
    #         if info['cur_unit'] == 'USD':
    #             # DB에 저장
    #             unit = ExchangeRates.objects.create(
    #                 select_date = '{}-{}-{}'.format(day[0:4], day[4:6], day[6:8]),
    #                 usa = float(info['ttb'].replace(',','')),
    #                 jpa = 10,
    #             )
    #             unit.save()
    # data = {
    #     'result' : True,
    # }
    # return JsonResponse(data)