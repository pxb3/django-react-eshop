from django.shortcuts import render
from .models import Item
from rest_framework.views import APIView
from rest_framework.response import Response
from .mySerializer import *
from django.http import Http404
from rest_framework import status
from rest_framework import viewsets
from rest_framework import pagination
from rest_framework import filters


class ExamplePagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50

class ItemViewSet(viewsets.ModelViewSet):

    serializer_class = ItemSerializer
    pagination_class = ExamplePagination
    queryset = Item.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['description']
    ordering_fields = ['description', 'price']


    def get_queryset(self):
        queryset = Item.objects.all()
        brand = self.request.query_params.get('brand')
        if brand is not None and brand != "":
            queryset = queryset.filter(brand=brand)

        return queryset

