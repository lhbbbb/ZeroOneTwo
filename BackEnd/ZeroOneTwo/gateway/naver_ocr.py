import os
import sys
import urllib.request
import json
import requests
from IPython import embed
import pickle
import pprint
import base64
from decouple import config


def image_NAVER_AI(img_64, country):
    TEMPLATE = {
        "images": [
        {
            "format": "jpg",
            "name": "medium",
            "data": img_64
        }
        ],
            "requestId": "string",
            "resultType": "string",
            "timestamp" : "1",
            "version": "V1"
    }
    
    transmit = json.dumps(TEMPLATE)
    
    data = transmit
    client_secret = config('NAVER_OCR_CLIENT_SECRET_JP') if country=='jp' else config('NAVER_OCR_CLIENT_SECRET_EN')
    url = config('NAVER_OCR_URL_JP') if country=='jp' else config('NAVER_OCR_URL_EN')
    request = urllib.request.Request(url)
    request.add_header("X-OCR-SECRET", client_secret)
    request.add_header("Content-Type", "application/json")

    response = urllib.request.urlopen(request, data=data.encode("utf-8"))
    rescode = response.getcode()

    if(rescode==200):
        response_body = response.read()
        result_str = response_body.decode('utf-8')
        result_dict = json.loads(result_str)
        return result_dict
    else:
        return None
