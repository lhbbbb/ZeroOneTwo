from django import forms

from .models import Receipts

class ReceiptsFormModel(forms.ModelForm):
    class Meta:
        model = Receipts
        fields = ['date', 'place', 'address', 'telephone', 'register', 'regdate', 'board', 'country', 'currency']
