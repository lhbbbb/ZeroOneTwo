import json
import re
from pprint import pprint

with open('.\\examples\\02.json', 'rt', encoding='UTF8') as f:
    content = json.load(f)

min_font_sizes = []
for c in content['images'][0]['fields']:
    temp_font_size = max(map(lambda y: y['y'], c['boundingPoly']['vertices'])) - min(
        map(lambda y: y['y'], c['boundingPoly']['vertices']))
    min_font_sizes.append(temp_font_size)
min_font_size = min(min_font_sizes)

texts = []
temp_texts = []
temp_y = 0
for c in content['images'][0]['fields']:
    max_y = max(map(lambda y: y['y'], c['boundingPoly']['vertices']))
    if abs(temp_y - max_y) > min_font_size and temp_texts != []:
        texts.append(temp_texts)
        temp_texts = []
    temp_texts.append(c['inferText'])
    temp_y = max_y
texts.append(temp_texts)
pprint(texts)

# 나라마다 다르게 처리...
# 품목, 날짜
r_items = r'[\d]+[.,][\d]*'
r_date = r'[\d]+[/:][\d]*'
# r_test_1 = r'^\s*(\d+)\s+(.*\S)\s+'
title = ''
items = []
date = []
for idx, text in enumerate(texts):
    if idx == 0:
        title = ' '.join(text)
    if any(re.search(r_items, t) for t in text):
        items.append(' '.join(text))
    if any(re.search(r_date, t) for t in text):
        date.append(' '.join(text))
    # if any(re.search(r_test_1, t) for t in text):
    #     print(text)

print(title)
pprint(items)
pprint(date)

'''
수량 품목 화폐단위 가격 
수량 품목 가격 화폐단위 
품목 수량 화폐단위 가격 
품목 수량 가격 화폐단위 
'''

'''
1. 데이터 보정 
2. NLP 데이터 파싱 
3. 정규표현식 
'''

# 주소, 전화번호

# Title Text

# texts = []
# temp_texts = []
# temp_text = ''
# temp_y = 0
# for idx, c in enumerate(content['images'][0]['fields']):
#     max_y = max(map(lambda y: y['y'], c['boundingPoly']['vertices']))
#     min_x = min(map(lambda x: x['x'], c['boundingPoly']['vertices']))
#     max_x_1 = max(map(lambda x: x['x'], content['images'][0]
#                       ['fields'][idx-1]['boundingPoly']['vertices']))

#     if abs(temp_y - max_y) > min_font_size and temp_texts != []:
#         temp_texts.append(temp_text)
#         texts.append(temp_texts)
#         temp_texts = []
#         temp_text = ''

#     if max_x_1 >= min_x and idx != 0:
#         temp_text += c['inferText']
#     else:
#         temp_texts.append(temp_text)
#         temp_text = c['inferText']
#     temp_y = max_y
# temp_texts.append(temp_text)
# texts.append(temp_texts)

# pprint(texts)
