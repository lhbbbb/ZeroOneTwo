import json
import re
from pprint import pprint

with open('.\\examples\\03.json', 'rt', encoding='UTF8') as f:
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
r_items = r'[\d]+[.,][\d]*|TOTAL|TOTAAL'
r_date = r'[\d]+[/:][\d]*'
# if nation == US // 화폐단위는 나라 선택할 때 같이 고려
r_dollar = r'[$]'
# |WET TOTAL(NET TOTAL) 은 일단 제외
r_total = r'^TOTAL|GRAND TOTAL|^TOTAAL'
r_int = r'[\d]+'
r_filters = r'TOTAL|SERVICE|CHANGE|MANAGER|^[\d.,\s]*$'
# r_total = r'(?=(?!(SUB)).*)(?=((TOTAL))).*'
# r_total = r'(?(?=(SUB))[^SUB]|.*)TOTAL'
# r_total = r'(S|[^S].|SU|S[^U].|SUB|SU[^B])\sTOTAL'
# r_total = r'(?!(SUB))\b(TOTAL)'
title = ''
items = []
date = []
for idx, text in enumerate(texts):
    if idx == 0:
        title = ' '.join(text)
    if any(re.search(r_items, t.upper()) for t in text):
        items.append(' '.join(text))
    if any(re.search(r_date, t) for t in text):
        date.append(' '.join(text))

print(title)
pprint(items)
pprint(date)

# Total, TOTAL. Grand Total, Amount Due, Amount Paid
# Total Due
# Sub-Total
# Total Owed

for i in items:
    if re.search(r_total, i.upper()):
        total_strs = re.findall(r_int, i)
        total_str = ''
        for idx, s in enumerate(total_strs):
            if idx == len(total_strs) - 1 and len(total_strs) != 1 and len(s) == 2:
                total_str += f'.{s}'
            else:
                total_str += s
    elif re.search(r_filters, i.upper()):
        continue
    else:
        print(i)
        price_strs = re.findall(r_int, i)
        price_str = ''
        for idx, s in enumerate(price_strs):
            if idx == len(price_strs) - 1 and len(price_strs) != 1 and len(s) == 2:
                price_str += f'.{s}'
            else:
                price_str += s
        print(price_str)


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

'''
US : $, '' // S, USD 
JP : 
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
