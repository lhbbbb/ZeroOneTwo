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
