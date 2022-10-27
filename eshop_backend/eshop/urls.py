from django.urls import path, re_path
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from .views import ItemViewSet, MyTokenObtainPairView, RegisterView
from rest_framework import routers
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'items', ItemViewSet, 'item')

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('', views.getRoutes),
    path('cart/create', views.CartCreate.as_view(), name='cart_create'),
    re_path('^comments/list/(?P<item_id>.+)/$', views.CommentList.as_view(), name='comments_list'),
    path('comments/create', views.CommentCreate.as_view(), name='comments_create')
]

urlpatterns += router.urls
urlpatterns += staticfiles_urlpatterns()