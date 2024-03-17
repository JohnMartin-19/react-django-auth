from .models import User,Profile
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=('id','username', 'email',)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['phone_number'] = user.profile.phone_number
        token['verified'] = user.profile.verified

        return token
    
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True,required =True,validators= [validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ['email','username','password','password2']

   #to check password matching
    def validate(self,attrs):
        if attrs['password'] != ['password2']:
            raise serializers.ValidationError({
                    "Password":"Password Field must match"
                })
        return attrs 

    def create(self, validated_data):
        user = User.objects.create(
                username = validated_data['username'],
                email = validated_data['email'],
            )
        user.set_password(validated_data['password'])
        user.save()
        return user