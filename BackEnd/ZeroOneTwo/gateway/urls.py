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
    
    # path(r'^test/', views.test), # 이미지 생성
    path('boards/', views.BoardsDataView.as_view()),
    
    ### 등록
    # 로그인 및 회원가입. 
    # 보드 등록
    # 영수증 등록
    # 항목들 등록
    
    ### 조회
    # 보드 조회
    # 영수증 조회
    # 항목들 조회
]
