import os
import sys
import urllib.request
import json


def translate(client_id, client_secret, encText, source_language, target_language):
    encText = urllib.parse.quote(encText)
    data = f"source={source_language}&target={target_language}&text=" + encText
    url = "https://openapi.naver.com/v1/papago/n2mt"
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id",client_id)
    request.add_header("X-Naver-Client-Secret",client_secret)
    response = urllib.request.urlopen(request, data=data.encode("utf-8"))
    rescode = response.getcode()
    if(rescode==200):
        response_body = response.read()
        response_json = json.loads(response_body.decode('utf-8'))
        return response_json['message']['result'].get('translatedText')
    else:
        return "Error Code:" + rescode
