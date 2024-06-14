
from django.db import models


class Users(models.Model):
   userID = models.CharField(max_length=50, primary_key=True)
   profile_image = models.CharField(max_length=2000)
   firstname = models.CharField(max_length=300)
   lastname = models.CharField(max_length=300)
   email= models.CharField(max_length=300)
   phone = models.CharField(max_length=20)
   password = models.CharField(max_length=100)
   created = models.DateTimeField(max_length=100,auto_now=True)

class Polls(models.Model) :
       pollsID = models.CharField(max_length=100,primary_key=True)
       userID = models.CharField(max_length=50)
       name = models.CharField(max_length=300)
       type = models.CharField(max_length=300) 
       status = models.CharField(max_length=300)
       created = models.DateTimeField(auto_now=True)
       edited_at = models.DateTimeField(auto_now_add=True)
       duration_from = models.DateTimeField(max_length=20)
       duration_to = models.DateTimeField(max_length=50)
      
class MultiPolls(models.Model) :
  id = models.CharField(max_length=100,primary_key=True)
  media_content = models.CharField(max_length=2000)
  number_of_participation = models.CharField(max_length=50)
  number_of_engagement =  models.CharField(max_length=50)
  total_score = models.CharField(max_length = 50,default=0)
  data = models.CharField(max_length=2000) 

class VotingUsers(models.Model) :
      sn = models.AutoField(primary_key=True)
      voterID =  models.CharField(max_length=50)
      pollID =  models.CharField(max_length=50)
      userdetails = models.CharField(max_length=500)

   
    