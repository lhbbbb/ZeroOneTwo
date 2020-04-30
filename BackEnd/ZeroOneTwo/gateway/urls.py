from django.urls import path, include
from django.conf.urls import url
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('User', views.UserViewSet)
router.register('Boards', views.BoardsViewSet)
router.register('Receipts', views.ReceiptsViewSet)
router.register('Items', views.ItemsViewSet)
router.register('Rate', views.RateViewSet)

urlpatterns = [
    path('', views.index, name='index'),
    path('api/', include(router.urls)),
    path('rate/<int:mx>/', views.exchange),
    
    path('boards/', views.BoardsDataView.as_view()),
    path('boards/<int:board_id>/', views.get_receipts),
    path('receipts/', views.ReceiptsDataView.as_view()),
    path('receipts/new/', views.save_receipts),
    path('receipts/<int:receipt_id>/', views.get_items),
]
