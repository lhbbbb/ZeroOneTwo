from skimage.filters import threshold_local
import numpy as np
import argparse
import cv2
import imutils


def calculate_angles(image_name):
	image = cv2.imread(image_name)
	image = imutils.resize(image, height = 500)


	# convert the image to grayscale, blur it, and find edges
	# in the image
	gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
	gray = cv2.GaussianBlur(gray, (5, 5), 0)

	kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (9, 9))
	dilated = cv2.dilate(gray, kernel)

	edged = cv2.Canny(dilated, 75, 200)


	# find the contours in the edged image, keeping only the
	# largest ones, and initialize the screen contour
	cnts = cv2.findContours(edged.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_TC89_KCOS)
	cnts = imutils.grab_contours(cnts)


	# Bounding Rectangles
	cnts = list(map(lambda c: np.int0(cv2.boxPoints(cv2.minAreaRect(c))), cnts))
	cnts = sorted(cnts, key = cv2.contourArea, reverse = True)[:5]


	# Maximum area rectangle
	screenCnt = cnts[0]


	# Calculate angles
	xs = [num[0] for num in screenCnt]
	ys = [num[1] for num in screenCnt]
	angles = np.arctan([
		(ys[0]-ys[1]) / (xs[0]-xs[1]),
		(ys[1]-ys[2]) / (xs[1]-xs[2]),
	])

	# rotation angle
	rotation_angle = abs(np.rad2deg(angles[0]))

	# image area ratio
	area = cv2.contourArea(screenCnt)
	image_area = image.shape[0] * image.shape[1]
	area_ratio = area / image_area

	return (rotation_angle, area_ratio)
