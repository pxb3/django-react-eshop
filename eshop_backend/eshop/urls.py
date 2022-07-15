from django.urls import path
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from .views import ItemViewSet
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'items', ItemViewSet, 'item')

urlpatterns = [

]

urlpatterns += router.urls
urlpatterns += staticfiles_urlpatterns()