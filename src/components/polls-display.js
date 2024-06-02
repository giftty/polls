import { useEffect, useState } from "react"
import { dataSTore } from "./dataobject"
import { PreviewComp } from "./polls_types"
import { getCookie, sendData, setCookie } from "./models";
import { useOutletContext } from "react-router-dom";


export function PollsDisplay(){
var [currentPoll,setcurrentPoll] = useOutletContext()
 //var poll = dataSTore['polls'].filter(e=>e['pollsID']=='#6758490')
  var poll = new URLSearchParams(window.location.search).get('poll') 
  var pollDuration
  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

 useEffect(
  function(){

      pollDuration = new Date(currentPoll['parent-poll']["duration_to"]).getTime(); 
      var nw = new Date(currentPoll['parent-poll']["duration-from"]).getTime();
      pollDuration = pollDuration - nw
      console.log(pollDuration)
      const hoursLeft = Math.floor((pollDuration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutesLeft = Math.floor((pollDuration % (1000 * 60 * 60)) / (1000 * 60));
      const secondsLeft = Math.floor((pollDuration % (1000 * 60)) / 1000);
      const daysLeft = Math.floor(pollDuration/ (1000 * 60 * 60 * 24)); 
      pollDuration = `${daysLeft!=0?daysLeft+' days':''}`+' '+ hoursLeft+' hours '+minutesLeft+' minutes left. ' 

      currentPoll['child-poll']['number_of_participation']= parseInt(currentPoll['child-poll']['number_of_participation'])+1
      sendData('updatevote',currentPoll['child-poll'],(result)=>{
        console.log(result)
        if(result['data']){
        var div = document.createElement("div")
        div.className = "alert alert-success my-3 "
        div.append("successfull")
        document.querySelector('.btn.primary-background').parentElement.insertBefore(div,null)
        }else{
          var div = document.createElement("div")
        div.className = "alert alert-danger"
        div.append(result['error'])
        document.querySelector('.btn.primary-background').parentElement.insertBefore(div,null)
        }
        setTimeout(()=>document.querySelector(".alert").remove(),2000)
      })
      console.log(currentPoll['child-poll'])
  },[])
 return(
    currentPoll['child-poll']==undefined?
    <div className="d-flex flex-column justify-content-center" style={{height:'90vh'}}>
           <div className="col-auto mx-auto">
            <img src="/images/POLLs.png" style={{height:'40px',width:'auto'}}/>
           </div>
        </div>
    :
   <div className="col-12 col-md-8 col-lg-6 text-center mx-auto py-4" style={{height:"100vh",overflow:'auto'}}>
   <div className="card p-md-5 p-3" style={{borderRadius:'15px !importatnt'}}>
     <div>
        {
        /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(currentPoll['child-poll']["media_content"])?
          <img src={"http://127.0.0.1:8000/servefile?poll="+poll} style={{height:'250px',width:'auto',borderRadius:'15px'}} />
          :
           /(mp4||avi|webm)$/.test(currentPoll['child-poll']["media_content"])?
           <video controls={true} autoPlay={true} muted={true} src={"http://127.0.0.1:8000/servefile?poll="+poll} style={{width:'100%',position: 'relative',
               marginTop: '20px',marginLeft: window.innerWidth >550?'-27.6px':'0px',}}>
              </video>
             : <></>
         }
         <br/>
         <div className="text-mute text-center mt-2"> {pollDuration} </div>
     </div>
    
         <br/> <br/>
         {
         currentPoll['child-poll']['data'].map((queEl,i)=>
         <div className="mt-3">
          <PreviewComp key={i.toString()} questionstyle={{fontSize:window.innerWidth<550?'1.3rem':'25px',fontWeight:'bold',width:window.innerWidth<550?"calc(100vw/2)":'400px',whiteSpace:'break-spaces',textAlign:'left'}} {...queEl} participates={ currentPoll['child-poll']['number_of_engagement']} callbackfunc={(value)=>{
            currentPoll['child-poll']['data'][i]['option'] = value
            console.log(currentPoll['child-poll'])
            var votingObj 
            var checkedvoted = setCookie('vtu')
            if(!checkedvoted){
              var rString = randomString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
              var vtu = "vtu"+ rString
                setCookie("vtu",vtu)
              votingObj = {"votingUser":vtu}
               currentPoll['child-poll']['number_of_engagement'] = parseInt(currentPoll['child-poll']['number_of_engagement'])+1
            }else{
              var vtu = getCookie("vtu",vtu)
               votingObj = {"votingUser":vtu}
            }
            
            
            sendData('updatevote',{...currentPoll['child-poll'],...votingObj},(result)=>{
             console.log(result)
             if(result['data']){
              var div = document.createElement("div")
              div.className = "alert alert-success my-3"
              div.append("successfull")
              document.querySelector('.btn.primary-background').parentElement.insertBefore(div,null)
             
             }else{
               var div = document.createElement("div")
              div.className = "alert alert-danger"
              div.append(result['error'])
              document.querySelector('.btn.primary-background').parentElement.insertBefore(div,null)
             }
              
            })
          }}>
          </PreviewComp>
         </div>
         )
        }
        <button onClick={()=>window.location='/polls-search'} className="btn primary-background text-white col-5 col-md-3 ml-auto mr-1 mt-4" style={{height:'40px',fontSize:'11px'}}>Search another poll</button>
   </div>
   </div>
 )
}