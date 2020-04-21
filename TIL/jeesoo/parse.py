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
r_items = r'[\d]+[.,][\d]*'
r_date = r'[\d]+[/:][\d]*'
for text in texts:
    if any(re.search(r_items, t) for t in text):
        print(text)
    elif any(re.search(r_date, t) for t in text):
        print(text)

# 업소이름, 주소, 전화번호

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


# for idx, c in enumerate(content['images'][0]['fields']):
#     min_x = min(map(lambda x: x['x'], c['boundingPoly']['vertices']))
#     max_x_1 = max(map(lambda x: x['x'], content['images'][0]
#                       ['fields'][idx-1]['boundingPoly']['vertices']))
#     if max_x_1 >= min_x and idx != 0:
#         print(content['images'][0]['fields'][idx-1]['inferText'])
#         print(c['inferText'])


# for idx, c in enumerate(content['images'][0]['fields']):
#     # pprint(c)
#     pprint(c['boundingPoly']['vertices'])
#     print(max(map(lambda x: x['x'], c['boundingPoly']['vertices'])))
#     print(min(map(lambda x: x['x'], c['boundingPoly']['vertices'])))
#     # print(max(map(lambda x: x['x'], content['images'][0]
#     #               ['fields'][idx-1]['boundingPoly']['vertices'])))
#     print(max(map(lambda y: y['y'], c['boundingPoly']['vertices'])))
#     # pprint(c['inferText'])
