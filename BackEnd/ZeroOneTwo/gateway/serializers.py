from rest_framework import serializers
from .models import User, Boards, Receipts, Items, Rate

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class BoardsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Boards
        fields = '__all__'

class ReceiptsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Receipts
        fields = '__all__'


class ItemsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Items
        fields = '__all__'
        
class RateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Rate
        fields = '__all__'
        


