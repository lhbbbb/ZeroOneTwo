from rest_framework import serializers
from .models import User, Boards, Receipts, Items, Rate


# ModelSerializer

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class BoardsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boards
        fields = '__all__'

class ReceiptsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipts
        fields = '__all__'

class ItemsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Items
        fields = '__all__'
        
class RateModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rate
        fields = '__all__'