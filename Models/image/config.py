import argparse

# Config.py 파일 생성
parser = argparse.ArgumentParser(description="create config file")

# 실제 이미지 파일들이 저장된 경로
parser.add_argument("-image_file_path", type=str, default=".\\datasets\\images\\")

# HyperParameter
parser.add_argument("-batch_size", type=int, default=32)

args = parser.parse_args()
