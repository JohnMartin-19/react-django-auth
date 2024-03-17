from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from .views import MyTokenObtainPairView,RegisterView,dashboard

urlpatterns = [
    path('token/',MyTokenObtainPairView.as_view(),name="TokenObtainPair"),
    path('token/refresh',TokenRefreshView.as_view(),name='token_refresh'),
    path('register/', RegisterView.as_view( ), name= 'register' ),  # 
    path('dashboard/',dashboard,name='Protected Route')
]