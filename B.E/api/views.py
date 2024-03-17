from django.shortcuts import render
from .models import User,Profile
from .serializer import UserSerializer,MyTokenObtainPairSerializer,RegisterSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics,status,response
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    permission_classes = ([AllowAny])
    serializer_class = RegisterSerializer

@api_view(['GET','POST'])
@permission_classes([AllowAny])
def dashboard(request):
    if request.method == 'GET':
        response = f"Hey, {request.user},You are logged in " 
        return Response({"response": response}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        response = f"Hey, {request.user}, you are just doing good"
        return Response({"response":response}, status=status.HTTP_200_OK)
    
    return Response ({},status=status.HTTP_400_BAD_REQUEST)
