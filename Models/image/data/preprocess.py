# Setup
import tensorflow as tf
import tensorflow_hub as hub

from tensorflow.keras import layers

## 병렬처리
AUTOTUNE = tf.data.experimental.AUTOTUNE
## Import library
import IPython.display as display
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt
import os
import pathlib


def load_data():
    data_dir = "datasets/images/train"
    data_dir = pathlib.Path(data_dir)
    image_count = len(list(data_dir.glob("*/*")))
    CLASS_NAMES = np.array([item.name for item in data_dir.glob("*")])

    BATCH_SIZE = 32
    IMG_HEIGHT = 224
    IMG_WIDTH = 224
    STEPS_PER_EPOCH = np.ceil(image_count / BATCH_SIZE)

    # The 1./255 is to convert from uint8 to float32 in range [0,1].
    image_generator = tf.keras.preprocessing.image.ImageDataGenerator(rescale=1.0 / 255)

    test_dir = "datasets/images/test"
    test_dir = pathlib.Path(test_dir)

    test_data_gen = image_generator.flow_from_directory(
        directory=str(test_dir),
        batch_size=BATCH_SIZE,
        shuffle=True,
        target_size=(IMG_HEIGHT, IMG_WIDTH),
        classes=list(CLASS_NAMES),
    )

    train_data_gen = image_generator.flow_from_directory(
        directory=str(data_dir),
        batch_size=BATCH_SIZE,
        shuffle=True,
        target_size=(IMG_HEIGHT, IMG_WIDTH),
        classes=list(CLASS_NAMES),
    )

    return test_data_gen, train_data_gen


def show_batch(image_batch, label_batch):
    plt.figure(figsize=(10, 10))
    for n in range(25):
        ax = plt.subplot(5, 5, n + 1)
        plt.imshow(image_batch[n])
        plt.title(CLASS_NAMES[label_batch[n] == 1][0].title())
        plt.axis("off")

    plt.show()
