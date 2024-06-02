import base64
import json
import os
import random
from django.http import JsonResponse, StreamingHttpResponse
from django.shortcuts import redirect, render,HttpResponse
from django.views.decorators.csrf import csrf_exempt
import requests
from polls_app_backend.models import MultiPolls, Polls, Users,VotingUsers
import re
import mimetypes
from wsgiref.util import FileWrapper



csrf_exempt
def login(request) :
   try :
     body = request.body.decode('utf-8')
     body_data = json.loads(body)
     usa = Users.objects.filter(email = body_data['email'] ).values()
     usa = list(usa)
     if len(usa) > 0 :
      print(usa[0]['userID'])
      request.session['user'] = usa[0]['userID']
      usa[0]['created'] = str(usa[0]['created'])
      return HttpResponse(json.dumps(usa))
     else :
        return HttpResponse(json.dumps({'error':'Email and password combination is not correct'}))     
   except Exception as e :
     print(e)
     return HttpResponse(json.dumps({'error':'Email and password combination is not correct'}))     
   
 
csrf_exempt
def register(request) :
   body = {}
   try :
      body = request.body.decode('utf-8')
      body_data = json.loads(body)
      try :
       usa = Users.objects.filter(email = body_data['email'] )
       print(list(usa))
       if len(usa)>0 :
        print('User already exist')
        return HttpResponse(json.dumps({'error':'User already exist'}))
       else :
         usa =  Users(userID=body_data['userID'] ,profile_image = body_data['profile_image'],firstname = body_data['firstname'],lastname = body_data['lastname'],email= body_data['email'],
                  phone = body_data['phone'],password=body_data['password'] )
         usa.save()
         return HttpResponse(json.dumps(body_data))  
      except Exception as e : 
        print(e)
        return HttpResponse(json.dumps({'error':'An error occurred please try again'})) 
   except Exception as e :
      print(e)
      return HttpResponse(json.dumps({'error':'An error occurred please try again'})) 
   
def createPoll(request) : 
  try :
    body = request.body.decode('utf-8')
    body_data = json.loads(body)
    print(body_data)
    poll = Polls(pollsID = body_data["pollsID"],userID = body_data["userID"],
                 name = body_data["poll_name"], 
                 type= body_data["type"], status = body_data["status"],duration_from = body_data["duration_from"],
                 duration_to = body_data["duration_to"] )
    poll.save()
    request.session['poll-type'] = body_data["type"]
    request.session['poll-id'] = body_data["pollsID"]
    return HttpResponse(json.dumps({"data":"success"})) 
  except Exception as e :
     print(e)
     return HttpResponse(json.dumps({'error':'An error occurred please try again'})) 

def getallPolls(request):
    body = request.body.decode('utf-8')
    print(body)
    body_data = json.loads(body)
    polls=[]
    print(body_data)
    if "userID" in body_data :
       polls = list(Polls.objects.filter(userID = body_data['userID']).values())
    else : 
     if "pollsearchstring" in body_data :
          polls = list(Polls.objects.filter(pollsID__contains = body_data['pollsearchstring']).values())
     else  :  
       polls =list (Polls.objects.all().values())
    # print(polls)   
    pollstr = []
    for poll in polls :
      # print(poll)
      poll['created'] = str(poll['created'])
      poll['edited_at'] = str(poll['edited_at'])
      poll['duration_from'] = str(poll['duration_from'])
      poll['duration_to'] = str(poll['duration_to'])
      pollstr.append(poll)
      # print(pollstr)  
    return HttpResponse(json.dumps({"data":pollstr}))

def logout(request) :
  request.session.delete()
  return  HttpResponse(json.dumps({'data':'logout'}))

def postPoll(request) : 
  try :
     body = request.body.decode('utf-8')
     body_data = json.loads(body)
     poll = MultiPolls.objects.filter(id=body_data['id']).values()
     if len(poll) <1 :
      mediastr= body_data['image'].split(',')[1]
      mediatype = body_data['image'][0:70].split(';')
      mediatype = mediatype[0].split('/')[1]
      mediaFile = open('./static/poll_media/media'+body_data['id'][1:]+'.'+mediatype,"wb")
      mediaFile.write(base64.b64decode(mediastr))
      body_data['image'] = './static/poll_media/media'+body_data['id'][1:]+'.'+mediatype
      
      if body_data['type'] == 'multi-polls':
        print(body_data['image'])
        poll = MultiPolls(id=body_data['id'],
              media_content=body_data['image'], number_of_participation= 0, number_of_engagement = 0,data = body_data['data'])
        poll.save()
        return HttpResponse(json.dumps({"data":"success"}))
      else :
        return HttpResponse(json.dumps({"error":"No poll type"}))
     else :
        return HttpResponse(json.dumps({"error":"Sorry poll already exist try again later."})) 
  except Exception as e :
    print(e)
    return HttpResponse(json.dumps({"error":"An error occurred please try again"}))

def getPoll(request) :
  try :
    body = request.body.decode('utf-8')
    body_data = json.loads(body)
    print(body_data['id'])
    if body_data['type'] == 'multi-polls' :
      multipoll=  MultiPolls.objects.filter( id = body_data['id']).values()
      multipoll = list(multipoll)
      if len(multipoll)>0:
       return HttpResponse(json.dumps({"data":list(multipoll)[0]}))
      else :
       return HttpResponse(json.dumps({"data":list(multipoll)}))
    else :
      return HttpResponse(json.dumps({"error":"Not a poll type"}))  
  except Exception as e :
     print(e)
     return HttpResponse(json.dumps({"error":"An error occurred please try again"}))   

def pollanddata(request) :
   try :
    mainpoll={}
    body = request.body.decode('utf-8')
    body_data = json.loads(body)
    print(body_data['id'])
    poll = Polls.objects.filter(pollsID= body_data['id']).values()
    poll = list(poll)[0]
    poll['created'] = str(poll['created'])
    poll['edited_at'] = str(poll['edited_at'])
    poll['duration_from'] = str(poll['duration_from'])
    poll['duration_to'] = str(poll['duration_to'])
    mainpoll['parent-poll']= poll
    
    if poll['type']=='multi-polls' :
      childpoll = MultiPolls.objects.filter(id = poll['pollsID']).values()
      childpoll = list(childpoll)[0]
      mainpoll['child-poll'] = childpoll
      return HttpResponse(json.dumps(mainpoll))
    else :
      return HttpResponse(json.dumps({"error":"Not a poll type"}))
   except Exception as e :
     print(e)      
     return HttpResponse(json.dumps({"error":"An error occurred please try again"})) 

def updatevote(request) : 
    try :
      body = request.body.decode('utf-8')
      body_data = json.loads(body)
      print(body_data) 
      check = VotingUsers.objects.filter(tagname = body_data["votingUser"],pollID = body_data['id'] ).values()
      if len(list(check)) < 0:
         votinguser = VotingUsers(pollID = body_data['id'],tagname = body_data["votingUser"] )
         votinguser.save()

      childpoll = MultiPolls.objects.get(id = body_data['id'])
      childpoll.data= body_data['data']
      childpoll.number_of_engagement = body_data['number_of_engagement']
      childpoll.number_of_participation = body_data['number_of_participation']
      childpoll.save()
      return HttpResponse(json.dumps({"data":"success"}))
    except Exception as e :
       print(e)
       return HttpResponse(json.dumps({"error":"An error occurred please try again"})) 
def serveFiles(request):
   return render(request,'mediaplay.html')


range_re = re.compile(r'bytes\s*=\s*(\d+)\s*-\s*(\d*)', re.I)


class RangeFileWrapper(object):
    def __init__(self, filelike, blksize=8192, offset=0, length=None):
        self.filelike = filelike
        self.filelike.seek(offset, os.SEEK_SET)
        self.remaining = length
        self.blksize = blksize

    def close(self):
        if hasattr(self.filelike, 'close'):
            self.filelike.close()

    def __iter__(self):
        return self

    def __next__(self):
        if self.remaining is None:
            # If remaining is None, we're reading the entire file.
            data = self.filelike.read(self.blksize)
            if data:
                return data
            raise StopIteration()
        else:
            if self.remaining <= 0:
                raise StopIteration()
            data = self.filelike.read(min(self.remaining, self.blksize))
            if not data:
                raise StopIteration()
            self.remaining -= len(data)
            return data
    


def stream_video(request):
    body = request.GET.get('poll')
    print(body)
    print('***************') 
    body = '#'+body
    multipoll=  MultiPolls.objects.filter( id = body ).values()
    multipoll = list(multipoll)[0] 
    path = multipoll['media_content']  
                           
    # "./static/poll_media/media1312115.mp4"
    range_header = request.META.get('HTTP_RANGE', '').strip()
    range_match = range_re.match(range_header)
    size = os.path.getsize(path)
    content_type, encoding = mimetypes.guess_type(path)
    content_type = content_type or 'application/octet-stream'
    if range_match:
        first_byte, last_byte = range_match.groups()
        first_byte = int(first_byte) if first_byte else 0
        last_byte = int(last_byte) if last_byte else size - 1
        if last_byte >= size:
            last_byte = size - 1
        length = last_byte - first_byte + 1
        resp = StreamingHttpResponse(RangeFileWrapper(open(path, 'rb'), offset=first_byte, length=length), status=206, content_type=content_type)
        resp['Content-Length'] = str(length)
        resp['Content-Range'] = 'bytes %s-%s/%s' % (first_byte, last_byte, size)
    else:
        resp = StreamingHttpResponse(FileWrapper(open(path, 'rb')), content_type=content_type)
        resp['Content-Length'] = str(size)
    resp['Accept-Ranges'] = 'bytes'
    return resp