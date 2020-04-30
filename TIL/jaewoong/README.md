# sub3 AI Project

## 아이디어

### 영수증 OCR 

- 일단 카메라 연동
  - 카메라 연동시 1초에 한번씩 캡쳐후 정방향 여부 확인 정방향 아니면 빨간줄 처리
  - 정방향시 저절로 다음화면 넘어가기
  - 초점 안맞으면 초점 떨렸다고 인지후 다시 촬영(촬영 버튼도 되고 자동도 되게끔)
- 카메라 연동 불가시
  - 이미지 업로드별로 정방향 판단
- 장방향 이미지 입력 성공시
  - 텍스트의 y 범위가 매우 유사시(알고리즘은 대략 겹치는 범위가 80프로 이상이라던지) 같은 줄 처리
  - 그렇게 합쳐진 텍스트 라인별로 리스트로 반환
- 리스트 처리 방법
  - 우선 첫줄은 만약 텍스트라면(특수문자가 아니라면) 가게 이름 처리
  - 언어별로 숫자 형식을 가지고 있음(달러는 *.??, 엔화는 *, 원화도 *, 유럽은 *.?? 등)
  - 맨 앞이 숫자라면, 맨뒤도 숫자인지 확인하고 둘다 성립시 아이템 처리 후 갯수와 가격을 러프하게 처리함
  - 맨 마지막 아이템은 총합 처리
  - 날짜 형식을 정규식써서 있는 것은 영수증 날짜 처리
  - :이 있는 것은 전부 key, value 처리
  - 나머지는 etc 처리해서 순서대로 배치
- 이렇게 만들어진 key, value 값을 value로 가지며 y축 좌표를 key로 가지는 딕셔너리 형태로 최종 저장
  - y값에 비례해서 view에 텍스트를 배치하는 식으로 사용자에게 보여줌(프론트엔드 영역)



## 영수증 외곽선 구하기

### 레퍼런스 1

contour_detection.py

```python
import cv2
import numpy as np
from matplotlib import pyplot as plt

filename = '1001-receipt.jpg'
img_path = '.\\large-receipt-image-dataset-SRD\\'


def get_new(old):
    new = np.ones(old.shape, np.uint8)
    cv2.bitwise_not(new,new)
    return new

if __name__ == '__main__':
    orig = cv2.imread(img_path + filename)

    # these constants are carefully picked
    MORPH = 9  # default 9
    CANNY = 200  # default 84
    HOUGH = 25  # default 25

    img = cv2.cvtColor(orig, cv2.COLOR_BGR2GRAY)
    cv2.GaussianBlur(img, (3,3), 0, img)


    # this is to recognize white on white
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT,(MORPH,MORPH))
    dilated = cv2.dilate(img, kernel)

    edges = cv2.Canny(dilated, 0, CANNY, apertureSize=3)

    lines = cv2.HoughLinesP(edges, 1,  1, HOUGH)
    for line in lines[0]:
         cv2.line(edges, (line[0], line[1]), (line[2], line[3]),
                         (255,0,0), 2, 8)

    # finding contours
    _, contours, _ = cv2.findContours(edges.copy(), cv2.RETR_EXTERNAL,
                                   cv2.CHAIN_APPROX_TC89_KCOS)

    # contours = filter(lambda cont: cv2.arcLength(cont, False) > 100, contours)
    # print('arcLength: ')
    # for cont in contours:
    #     print(cv2.arcLength(cont, False))

    # contours = filter(lambda cont: cv2.contourArea(cont) > 10000, contours)
    # print('contourArea: ')
    # for cont in contours:
    #     print(cv2.contourArea(cont))

    # simplify contours down to polygons
    rects = []
    for cont in contours:
        rect = cv2.approxPolyDP(cont, 40, True).copy().reshape(-1, 2)
        rects.append(rect)
    print('rects: ')
    print(rects)

    # that's basically it
    cv2.drawContours(orig, rects,-1,(0,255,0),1)

    # show only contours
    new = get_new(img)
    cv2.drawContours(new, rects,-1,(0,255,0),1)
    cv2.GaussianBlur(new, (9,9), 0, new)
    new = cv2.Canny(new, 0, CANNY, apertureSize=3)

    cv2.namedWindow('result', cv2.WINDOW_NORMAL)
    cv2.imshow('result', orig)
    cv2.waitKey(0)
    cv2.imshow('result', dilated)
    cv2.waitKey(0)
    cv2.imshow('result', edges)
    cv2.waitKey(0)
    cv2.imshow('result', new)
    cv2.waitKey(0)

    cv2.destroyAllWindows()
    
```



### 레퍼런스 2

scan.py

```python
from skimage.filters import threshold_local
import numpy as np
import argparse
import cv2
import imutils

import matplotlib.pyplot as plt

# construct the argument parser and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", required = True,
	help = "Path to the image to be scanned")
args = vars(ap.parse_args())

# load the image and compute the ratio of the old height
# to the new height, clone it, and resize it
image = cv2.imread(args["image"])
ratio = image.shape[0] / 500.0
orig = image.copy()
image = imutils.resize(image, height = 500)

# convert the image to grayscale, blur it, and find edges
# in the image
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
gray = cv2.GaussianBlur(gray, (7, 7), 0)  # (gray, (5, 5), 0)
edged = cv2.Canny(gray, 0, 200)  # (gray, 75, 200)


# # these constants are carefully picked
# MORPH = 9  # default 9
# CANNY = 200  # default 84

# image = cv2.cvtColor(orig, cv2.COLOR_BGR2GRAY)
# cv2.GaussianBlur(image, (5,5), 0)


# # this is to recognize white on white
# kernel = cv2.getStructuringElement(cv2.MORPH_RECT,(MORPH,MORPH))
# dilated = cv2.dilate(image, kernel)

# edged = cv2.Canny(dilated, 75, CANNY, apertureSize=3)


# show the original image and the edge detected image
print("STEP 1: Edge Detection")
cv2.imshow("Image", image)
cv2.imshow("Edged", edged)
cv2.waitKey(0)
cv2.destroyAllWindows()

# find the contours in the edged image, keeping only the
# largest ones, and initialize the screen contour
cnts = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_TC89_KCOS)
cnts = imutils.grab_contours(cnts)
cnts = sorted(cnts, key = cv2.contourArea, reverse = True)  # [:5]

# loop over the contours
for c in cnts:
	# approximate the contour
	peri = cv2.arcLength(c, True)
	approx = cv2.approxPolyDP(c, 0.01 * peri, True)  # 0.02

	# if our approximated contour has four points, then we
	# can assume that we have found our screen
	if len(approx) == 4:
		screenCnt = approx
		break

# show the contour (outline) of the piece of paper
print("STEP 2: Find contours of paper")
cv2.drawContours(image, [screenCnt], -1, (0, 255, 0), 2)
cv2.imshow("Outline", image)
cv2.waitKey(0)
cv2.destroyAllWindows()

# print(screenCnt)
xs = [num[0][0] for num in screenCnt]
ys = [num[0][1] for num in screenCnt]

angles = np.arctan([
	(ys[0]-ys[1]) / (xs[0]-xs[1]),
	(ys[1]-ys[2]) / (xs[1]-xs[2]),
])
# 회전 각도
print('rotation angle: ', abs(np.rad2deg(angles[0])))

# 기울어진 각도
print('tilt angle: ', abs(np.rad2deg(angles[0]-angles[1])))

```



### 내 코드

- 영수증 회전 각도와 기울어진 각도 그리고 영수증/이미지 비율을 출력
- 완벽하지 않아도 됨



check_forward.py

```python
# USAGE
# python check_forward.py --image ../datasets/raw/image_name.png

from skimage.filters import threshold_local
import numpy as np
import argparse
import cv2
import imutils

ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", required = True,
	help = "Path to the image to be scanned")
args = vars(ap.parse_args())

# load the image and compute the ratio of the old height
# to the new height, clone it, and resize it
image = cv2.imread(args["image"])
ratio = image.shape[0] / 500.0
orig = image.copy()
image = imutils.resize(image, height = 500)


# convert the image to grayscale, blur it, and find edges
# in the image
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
gray = cv2.GaussianBlur(gray, (5, 5), 0)  # (gray, (5, 5), 0)

kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (9, 9))
dilated = cv2.dilate(gray, kernel)

edged = cv2.Canny(dilated, 75, 200)  # (gray, 75, 200)


# show the original image and the edge detected image
cv2.imshow("Image", image)
cv2.imshow("Edged", edged)
cv2.waitKey(0)
cv2.destroyAllWindows()


# find the contours in the edged image, keeping only the
# largest ones, and initialize the screen contour
cnts = cv2.findContours(edged.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_TC89_KCOS)
cnts = imutils.grab_contours(cnts)


# Bounding Rectangles
cnts = list(map(lambda c: np.int0(cv2.boxPoints(cv2.minAreaRect(c))), cnts))
cnts = sorted(cnts, key = cv2.contourArea, reverse = True)[:5]


# Maximm area rectangle
screenCnt = cnts[0]


# show the contour (outline) of the piece of paper
cv2.drawContours(image, [screenCnt], -1, (0, 255, 0), 2)
cv2.imshow("Outline", image)
cv2.waitKey(0)
cv2.destroyAllWindows()


# Calculate angles
xs = [num[0] for num in screenCnt]
ys = [num[1] for num in screenCnt]
angles = np.arctan([
	(ys[0]-ys[1]) / (xs[0]-xs[1]),
	(ys[1]-ys[2]) / (xs[1]-xs[2]),
])

# rotation angle
rotation_angle = abs(np.rad2deg(angles[0]))
print('rotation angle: ', rotation_angle)


# tilted angle
titled_angle = abs(np.rad2deg(angles[0] - angles[1]))
print('tilted angle: ', titled_angle)

# image area ratio
area = cv2.contourArea(screenCnt)
image_area = image.shape[0] * image.shape[1]
print(image_area)
print('area ratio: ', area / image_area)

```

강건하지 않은 코드(tilt 측정 불가능)

정확도 높음

**이 코드로 확정**



improved_check_forward.py

```python
from imutils.perspective import four_point_transform
import cv2
import numpy as np
import argparse
import imutils

ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", required = True,
	help = "Path to the image to be scanned")
args = vars(ap.parse_args())

# Load image, grayscale, Gaussian blur, Otsu's threshold
image = cv2.imread(args["image"])
ratio = image.shape[0] / 500.0
orig = image.copy()
image = imutils.resize(image, height = 500)

##(2) convert to hsv-space, then split the channels
hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
h,s,v = cv2.split(hsv)

##(3) threshold the S channel using adaptive method(`THRESH_OTSU`) or fixed thresh
th, threshed = cv2.threshold(s, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

##(4) find all the external contours on the threshed S
#_, cnts, _ = cv2.findContours(threshed, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
_, cnts, _ = cv2.findContours(threshed, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)

canvas  = image.copy()
#cv2.drawContours(canvas, cnts, -1, (0,255,0), 1)

## sort and choose the largest contour
cnts = sorted(cnts, key = cv2.contourArea, reverse=True)


cnt = cnts[0]

## approx the contour, so the get the corner points
arclen = cv2.arcLength(cnt, True)
approx = cv2.approxPolyDP(cnt, 0.02* arclen, True)
print(approx)

cv2.drawContours(canvas, [cnt], -1, (255,0,0), 1, cv2.LINE_AA)
cv2.imshow("contour", canvas)
cv2.waitKey(0)
cv2.destroyAllWindows()

cv2.drawContours(canvas, [approx], -1, (0, 0, 255), 1, cv2.LINE_AA)
cv2.imshow("approx_contour", canvas)
cv2.waitKey(0)
cv2.destroyAllWindows()


# Calculate angles
xs = [num[0][0] for num in approx]
ys = [num[0][1] for num in approx]
angles = np.arctan([
	(ys[0]-ys[1]) / (xs[0]-xs[1]),
	(ys[1]-ys[2]) / (xs[1]-xs[2]),
])

# rotation angle
rotation_angle = abs(np.rad2deg(angles[0]))
print('rotation angle: ', rotation_angle)


# tilted angle
titled_angle = abs(np.rad2deg(angles[0] - angles[1]))
print('tilted angle: ', titled_angle)

# image area ratio
area = cv2.contourArea(cnt)
image_area = image.shape[0] * image.shape[1]
print(image_area)
print('area ratio: ', area / image_area)

# ## Ok, you can see the result as tag(6)
# cv2.imwrite("detected.png", canvas)

```

강건한 코드(이미지 색 차이를 통한 엄격한 박스 출력)

정확도가 낮음



## NMT (Neural Machine Translation)

WIP