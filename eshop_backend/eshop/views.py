from rest_framework.response import Response
from .serializers import *
from rest_framework import viewsets
from rest_framework import pagination
from rest_framework import filters
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from accounts.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .models import Order
import logging
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page


class ExamplePagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50


class ItemViewSet(viewsets.ModelViewSet):

    serializer_class = ItemSerializer
    pagination_class = ExamplePagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['description']
    ordering_fields = ['description', 'price']

    def get_queryset(self):
        brand = self.request.query_params.get('brand')
        if brand is not None and brand != "":
            queryset = Item.objects.filter(brand=brand)
        else:
            queryset = Item.objects.all()

        return queryset

    @method_decorator(cache_page(60 * 60 * 2))
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)


class CartCreate(generics.CreateAPIView):

    serializer_class = CartSerializer
    queryset = Cart.objects.all()

    def create(self, request, *args, **kwargs):
        user = get_object_or_404(User, username=self.request.data.get('user'))
        order = Order(user=user)
        order.save()

        #logger = logging.getLogger("django")

        orders2 = [int(item['item']) for item in request.data.get('cartItems')]

        #orders = [{'order': order.id, 'item': Item(id=int(item['item']))} for item in request.data.get('cartItems')]
        orders = [{'order': order.id, 'item': orders2}]

        #logger.info(orders)

        serializer = self.get_serializer(data=orders, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, headers=headers)


class CommentList(generics.ListAPIView):
    serializer_class = CommentSerializer


    def get_queryset(self):
        item = self.kwargs['item_id']
        return Comment.objects.filter(item=item).select_related("user")


class CommentCreate(generics.CreateAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

