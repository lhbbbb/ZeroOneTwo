
import urllib
import json
from IPython import embed
from decouple import config


def papago_translation(text, country):
    client_id = config('NAVER_PAPAGO_CLIENT_ID')
    client_secret = config('NAVER_PAPAGO_CLIENT_SECRET')
    
    language = 'ja' if country == 'jp' else 'en'
    data = "source={}&target=ko&text={}".format(language, text)
    url = "https://openapi.naver.com/v1/papago/n2mt"
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id", client_id)
    request.add_header("X-Naver-Client-Secret", client_secret)
    response = urllib.request.urlopen(request, data=data.encode("utf-8"))
    rescode = response.getcode()
    if(rescode==200):
        to_string = response.read().decode('utf-8')
        to_dict = json.loads(to_string)
        translated = to_dict["message"]["result"]["translatedText"]
        return translated