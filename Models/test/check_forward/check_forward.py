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
