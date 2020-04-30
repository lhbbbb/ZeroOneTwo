import json
import re
from pprint import pprint

with open(".\\examples\\01.json", "rt", encoding="UTF8") as f:
    content = json.load(f)

min_font_sizes = []
for c in content["images"][0]["fields"]:
    temp_font_size = max(map(lambda y: y["y"], c["boundingPoly"]["vertices"])) - min(
        map(lambda y: y["y"], c["boundingPoly"]["vertices"])
    )
    min_font_sizes.append(temp_font_size)
min_font_size = min(min_font_sizes)

# 한 줄 만들기
texts = []
temp_texts = []
temp_y = 0
for c in content["images"][0]["fields"]:
    max_y = max(map(lambda y: y["y"], c["boundingPoly"]["vertices"]))
    if abs(temp_y - max_y) > min_font_size and temp_texts != []:
        texts.append(temp_texts)
        temp_texts = []
    temp_max = max(list(map(lambda x: x["x"], c["boundingPoly"]["vertices"])))
    temp_min = min(list(map(lambda x: x["x"], c["boundingPoly"]["vertices"])))
    temp_texts.append({"text": c["inferText"], "min": temp_min, "max": temp_max})
    temp_y = max_y
texts.append(temp_texts)

# 품목, 날짜
r_items = r"[\d]+[.,][\d]*|TOTAL|TOTAAL"
r_date = r"[\d]+[/:][\d]*"
r_dollar = r"[$]"
# |WET TOTAL(NET TOTAL) 은 일단 제외
r_total = r"^TOTAL|GRAND TOTAL|^TOTAAL"
r_int = r"[\d]+"
r_filters = r"TOTAL|SERVICE|CHANGE|MANAGER|BALANCE|TAX|TOTAAL|ROUNDING|TIP|^[\d.,\s]*$"

temp_max = 0
temp_min = 0
temp_items = []
title = ""
items = []
date = []
for idx, text in enumerate(texts):
    text_list = list(map(lambda x: x["text"], text))
    if idx == 0:
        title = " ".join(text_list)
    # x min max 를 이용해 품목인지 확인
    if any(re.search(r_items, t.upper()) for t in text_list):
        new_max = max(list(map(lambda x: x["max"], text)))
        new_min = min(list(map(lambda x: x["min"], text)))
        if abs(temp_max - new_max) > 2 and abs(temp_min - new_min) > 2:
            items.append(temp_items)
            temp_items = [" ".join(text_list)]
        else:
            temp_items.append(" ".join(text_list))
        temp_max, temp_min = new_max, new_min
        # items.append(' '.join(text_list))
    if any(re.search(r_date, t) for t in text_list):
        date.append(" ".join(text_list))
items.append(temp_items)

result = {}
result["title"] = title
result["date"] = date[0] if date else ""

# Total, TOTAL. Grand Total // Amount Due, Amount Paid, Total Due, Total Owed
total_str = ""
for i in sum(items, []):
    if re.search(r_total, i.upper()):
        total_strs = re.findall(r_int, i)
        for idx, s in enumerate(total_strs):
            if idx == len(total_strs) - 1 and len(total_strs) != 1 and len(s) == 2:
                total_str += f".{s}"
            else:
                total_str += s
result["total"] = total_str

r_price = r"[\d.,\s]*$"
individual_items = list(
    filter(lambda x: len(x) == max(map(lambda y: len(y), items)), items)
)
items_result = []
item_id = 1
for i in individual_items[0]:
    if re.search(r_filters, i.upper()):
        continue
    else:
        r_usd = re.compile(r"(USD)$")
        j = r_usd.sub("", i)
        price = re.findall(r_price, j)
        price_org = "".join(price)
        price_str = price_org.replace(" ", "")
        if price_str[-3] in [",", "."]:
            price_str = price_str.replace(",", "").replace(".", "")
            price_str = price_str[:-2] + "." + price_str[-2:]
        else:
            price_str = price_str.replace(",", "").replace(".", "")
        r_price_filter = re.compile(price_org + r"|€|£")
        item = r_price_filter.sub("", j)
        items_result.append({"item_id": item_id, "item": item, "price": price_str})
        item_id += 1
result["items"] = items_result
pprint(result)


"""
수량 품목 화폐단위 가격 
수량 품목 가격 화폐단위 
품목 수량 화폐단위 가격 
품목 수량 가격 화폐단위 
"""

"""
1. 데이터 보정 
2. NLP 데이터 파싱 
3. 특성에 따른 군집화 이후 처리 
4. 정규표현식 
"""

# 주소, 전화번호
