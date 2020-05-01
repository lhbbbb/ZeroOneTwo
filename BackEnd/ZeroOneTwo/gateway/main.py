from check_image import angle
from translation import enko, naver_api


# 사용법

# modules에 있는 check_image와 translation 모듈을 불러옵니다.

# 사진의 기울어진 각도와 사진대비 영수증의 비율을 알고 싶으면
# angle.calculate_angles(image_name)
# 이때 반드시 이미지는 main.py와 같은 경로상에 있어야합니다.
# 이미지를 같은 경로상으로 가져올 필요가 있습니다.

# 텍스트를 영한번역하고 싶으면
# enko.enko_translation(sentence)
# 마찬가지로 embedding_tran.txt, en_ko_mdl_10.params, en_ko.dic, en_ko.mdl, en_ko.np
# 전부 main.py와 같은 경로상에 있어야합니다.

# 텍스트를 papago 영한 or 일한 번역하고 싶으면
# naver_api.translate(client_id, client_secret, encText, source_language, target_language)
# client_id와 client_secret은 decouple 된 상태로 변수를 받으면 됩니다.

# example code
if __name__ == '__main__':
    print(angle.calculate_angles('0000-receipt.png'))

    print(enko.enko_translation('North Korea has a nuclear weapon.'))

    # ko, en, ja, zh-CN, zh-TW, vi, id, th, de, ru, es, it, fr 가능
    print(naver_api.translate('', '', 'North Korea has a nuclear weapon.', 'en', 'ko'))
