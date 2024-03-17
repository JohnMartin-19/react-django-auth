from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
# Create your models here.


class User(AbstractUser):
    username = models.CharField(max_length=50)
    email = models.EmailField(unique =True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username
    

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete = models.CASCADE)
    full_name = models.CharField(max_length = 50)
    phone_number = models.IntegerField(null = True)
    verified = models.BooleanField(default=False)

    def __str__(self):
        return self.full_name
    
def create_user(sender,instance,created, **kwargs):
    if created:
        Profile.objects.create(user = instance)
def save_user(sender, instance ,**kwargs):
    instance.profile.save()

post_save.connect(create_user, sender=User)
post_save.connect(save_user, sender=User)