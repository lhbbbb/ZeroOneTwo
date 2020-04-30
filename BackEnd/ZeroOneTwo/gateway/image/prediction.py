import tensorflow as tf
import numpy as np
import json
import requests

# Load data
img = tf.io.read_file("rec.png")


def decode_img(img):
    # convert the compressed string to a 3D uint8 tensor
    img = tf.image.decode_jpeg(img, channels=3)
    # Use `convert_image_dtype` to convert to floats in the [0,1] range.
    img = tf.image.convert_image_dtype(img, tf.float32)
    # resize the image to the desired size.
    img = tf.image.resize(img, [224, 224])
    # set dimension for mobilenet_v2 input shape
    img = tf.keras.applications.mobilenet_v2.preprocess_input(img[tf.newaxis, ...])
    return img


img = decode_img(img).numpy()

data = json.dumps({"signature_name": "serving_default", "instances": img.tolist()})
headers = {"content-type": "application/json"}

json_response = requests.post(
    "http://localhost:8501/v1/models/mobilenet:predict", data=data, headers=headers
)

predictions = np.array(json.loads(json_response.text)["predictions"])
print(np.argmax(predictions))
