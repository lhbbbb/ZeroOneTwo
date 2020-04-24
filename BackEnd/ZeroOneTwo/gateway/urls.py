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
    path('test/<int:mx>/', views.exchange),
    # path('user/', views.)
]