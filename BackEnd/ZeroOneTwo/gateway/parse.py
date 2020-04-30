import json
import re
from pprint import pprint

"""
OCR 이후 데이터 파싱은 현재 영어와 일본어가 지원됩니다. 
알파벳을 사용하는 언어는 영어 함수를 사용합니다. 일단은 
사용할 함수에 json 형식의 데이터를 넣으면 title, date, items, total 값을 반환합니다. 
결과가 좋지 않을 경우 당황하지 말고 담담히 받아들이면 됩니다. 
"""


def parse_en(content):
    # 줄 간격 설정
    min_font_sizes = []
    for c in content["images"][0]["fields"]:
        temp_font_size = max(
            map(lambda y: y["y"], c["boundingPoly"]["vertices"])
        ) - min(map(lambda y: y["y"], c["boundingPoly"]["vertices"]))
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
    # r_dollar = r'[$]'
    # |WET TOTAL(NET TOTAL) 은 일단 제외
    r_total = r"^TOTAL|GRAND TOTAL|^TOTAAL"
    r_int = r"[\d]+"
    r_filters = (
        r"TOTAL|SERVICE|CHANGE|MANAGER|BALANCE|TAX|TOTAAL|ROUNDING|TIP|^[\d.,\s]*$"
    )

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

    return result


def parse_jp(content):
    min_font_sizes = []
    for c in content["images"][0]["fields"]:
        temp_font_size = max(
            map(lambda y: y["y"], c["boundingPoly"]["vertices"])
        ) - min(map(lambda y: y["y"], c["boundingPoly"]["vertices"]))
        min_font_sizes.append(temp_font_size)
    min_font_size = min(min_font_sizes)

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
    # pprint(texts)

    r_items = r"¥|TOTAL|合計"
    r_date = r"[\d]+[/:][\d]*"
    r_total = r"^TOTAL|(合計)+[\s]+"
    r_int = r"[\d]+"
    r_filters = (
        r"合計|小計|小 計|お預り|お釣り|内税|象 計|TOTAL|SERVICE|CHANGE|TAX|^[\d.,\s]*$|[\d]+[)]$"
    )

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
        if any(re.search(r_items, t.upper()) for t in text_list):
            new_max = max(list(map(lambda x: x["max"], text)))
            new_min = min(list(map(lambda x: x["min"], text)))
            if abs(temp_max - new_max) > 2 and abs(temp_min - new_min) > 2:
                items.append(temp_items)
                temp_items = [" ".join(text_list)]
            else:
                temp_items.append(" ".join(text_list))
            temp_max, temp_min = new_max, new_min
        if any(re.search(r_date, t) for t in text_list):
            date.append(" ".join(text_list))
    items.append(temp_items)

    result = {}
    result["title"] = title
    result["date"] = date[0] if date else ""
    # print(title)
    # pprint(items)
    # pprint(date)

    total_str = ""
    for i in sum(items, []):
        # print(i)
        if re.search(r_total, i.upper()):
            total_strs = re.findall(r_int, i)
            for idx, s in enumerate(total_strs):
                if idx == len(total_strs) - 1 and len(total_strs) != 1 and len(s) == 2:
                    total_str += f".{s}"
                else:
                    total_str += s
    result["total"] = total_str

    new_items = []
    for i in items:
        temp = []
        for j in i:
            if re.search(r_filters, j.upper()):
                continue
            else:
                temp.append(j)
        new_items.append(temp)

    r_price = r"[\d.,\s]*$"
    individual_items = list(
        filter(lambda x: len(x) == max(map(lambda y: len(y), new_items)), new_items)
    )
    items_result = []
    item_id = 1
    for i in individual_items[0]:
        if re.search(r_filters, i.upper()):
            continue
        else:
            # print(i)
            r_yen = re.compile(r"(¥)")
            j = r_yen.sub("", i)
            price = re.findall(r_price, j)
            price_org = "".join(price)
            price_str = price_org.replace(" ", "")
            if len(price_str) >= 3 and price_str[-3] in [",", "."]:
                price_str = price_str.replace(",", "").replace(".", "")
                price_str = price_str[:-2] + "." + price_str[-2:]
            else:
                price_str = price_str.replace(",", "").replace(".", "")
            r_price_filter = re.compile(price_org + r"|€|£")
            item = r_price_filter.sub("", j)
            items_result.append({"item_id": item_id, "item": item, "price": price_str})
            item_id += 1
    result["items"] = items_result

    return result


# 주소, 전화번호

"""
1. 데이터 보정 
2. NLP 데이터 파싱 
3. 특성에 따른 군집화 이후 처리 
4. 정규표현식 
"""
