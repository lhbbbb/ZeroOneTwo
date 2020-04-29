from django.contrib import admin
from .models import User, Boards, Receipts, Items, Rate

class UserAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'username', 'active', 'regdate', 'sleepdate', 'withdrawdate', )
    
class BoardsAdmin(admin.ModelAdmin):
    list_display = ('board_id', 'title', 'startdate', 'enddate', 'description', 'register', 'regdate', )
    
class ReceiptsAdmin(admin.ModelAdmin):
    list_display = ('receipt_id', 'date', 'place', 'address', 'telephone', 'register', 'regdate', 'board', 'country', 'currency', 'image', )
    
class ItemsAdmin(admin.ModelAdmin):
    list_display = ('item_id', 'receipt', 'origin_name', 'trans_name', 'price', 'units', )
    
class RateAdmin(admin.ModelAdmin):
    list_display = ('rate_id', 'date', 'usa', 'jpa', 'cha', 'way', 'register', 'regdate', )

admin.site.register(User, UserAdmin)
admin.site.register(Boards, BoardsAdmin)
admin.site.register(Receipts, ReceiptsAdmin)
admin.site.register(Items, ItemsAdmin)
admin.site.register(Rate, RateAdmin)