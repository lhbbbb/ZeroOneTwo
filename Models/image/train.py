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

# Load data
from data import preprocess
train, test = preprocess.load_data()

feature_extractor_url = "https://tfhub.dev/google/tf2-preview/mobilenet_v2/feature_vector/2"  # @param {type:"string"}

feature_extractor_layer = hub.KerasLayer(
    feature_extractor_url, input_shape=(224, 224, 3)
)

feature_extractor_layer.trainable = False

model = tf.keras.Sequential(
    [feature_extractor_layer, layers.Dense(2, activation="softmax")]
)

print(model.summary())

model.compile(
    optimizer=tf.keras.optimizers.Adam(),
    loss="categorical_crossentropy",
    metrics=["acc"],
)


batch_stats_callback = CollectBatchStats()

history = model.fit_generator(
    train,
    epochs=2,
    steps_per_epoch=STEPS_PER_EPOCH,
    callbacks=[batch_stats_callback],
)

# Loss plot
# plt.figure()
# plt.ylabel("Loss")
# plt.xlabel("Training Steps")
# plt.ylim([0, 2])
# plt.plot(batch_stats_callback.batch_losses)
# plt.show()

class_names = sorted(train_data_gen.class_indices.items(), key=lambda pair: pair[1])
class_names = np.array([key.title() for key, value in class_names])

for image_batch, label_batch in test:
    print("Image batch shape: ", image_batch.shape)
    print("Label batch shape: ", label_batch.shape)
    break

predicted_batch = model.predict(image_batch)
predicted_id = np.argmax(predicted_batch, axis=-1)
predicted_label_batch = class_names[predicted_id]

label_id = np.argmax(label_batch, axis=-1)

plt.figure(figsize=(10, 9))
plt.subplots_adjust(hspace=0.5)
for n in range(30):
    plt.subplot(6, 5, n + 1)
    plt.imshow(image_batch[n])
    color = "green" if predicted_id[n] == label_id[n] else "red"
    plt.title(predicted_label_batch[n].title(), color=color)
    plt.axis("off")
_ = plt.suptitle("Model predictions (green: correct, red: incorrect)")
plt.show()
