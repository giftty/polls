import { useEffect, useState } from "react"
import { dataSTore } from "./dataobject"
import { PreviewComp } from "./multi_polls"
import { getCookie, sendData, setCookie, zonelist } from "./models";
import { useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
const zones =zonelist

export function PollsDisplay(){
var [currentPoll,setcurrentPoll] = useOutletContext()
 //var poll = dataSTore['polls'].filter(e=>e['pollsID']=='#6758490')
  const  { register, watch, formState: { errors }, handleSubmit } = useForm();
  const [voter,setvoter] = useState({})
  var questionsLength = 0
  var numberOfrightansweredquestions=0
  var questionairScore = 0
  var poll = new URLSearchParams(window.location.search).get('poll') 
  var pollDuration
  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

 useEffect(
  function(){
    var checkedvoted = getCookie('vtu')
   
      pollDuration = new Date(currentPoll['parent-poll']["duration_to"]).getTime(); 
      var nw = new Date(currentPoll['parent-poll']["duration-from"]).getTime();
      pollDuration = pollDuration - nw
      console.log(pollDuration)
      const hoursLeft = Math.floor((pollDuration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutesLeft = Math.floor((pollDuration % (1000 * 60 * 60)) / (1000 * 60));
      const secondsLeft = Math.floor((pollDuration % (1000 * 60)) / 1000);
      const daysLeft = Math.floor(pollDuration/ (1000 * 60 * 60 * 24)); 
      pollDuration = `${daysLeft!=0?daysLeft+' days':''}`+' '+ hoursLeft+' hours '+minutesLeft+' minutes left. ' 
       
   if(!checkedvoted){
        document.querySelector(".pollinfomodaltrigger").click()
      
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
    }else{
      sendData('getuservote',{"voteUser":checkedvoted,"id":poll},(result)=>{
       console.log(result)
       setvoter(JSON.parse(result.replace(/'/gi,'"')))
      })
    }
      
  },[])
 return(
    currentPoll['child-poll']==undefined?
    <div className="d-flex flex-column justify-content-center" style={{height:'90vh'}}>
           <div className="col-auto mx-auto">
            <img src="/images/POLLs.png" style={{height:'40px',width:'auto'}}/>
            <div>Loading ... </div>
           </div>
        </div>
    :
   <div className="col-12 col-md-8 col-lg-6 text-center mx-auto py-4" style={{height:"100vh",overflow:'auto'}}>
   <div className="card p-md-5 p-3" style={{borderRadius:'15px !importatnt'}}>
     <div>
        {
        currentPoll['child-poll']["media_content"].length>5?
        /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(currentPoll['child-poll']["media_content"])?
          <img src={"http://127.0.0.1:8000/servefile?poll="+poll} style={{height:'250px',width:'auto',borderRadius:'15px'}} />
          :
           /(mp4||avi|webm)$/.test(currentPoll['child-poll']["media_content"])?
           <video controls={true} autoPlay={true} muted={true} src={"http://127.0.0.1:8000/servefile?poll="+poll} style={{width:'100%',position: 'relative',
               marginTop: '20px',marginLeft: window.innerWidth >550?'-27.6px':'0px',}}>
              </video>
             : <h3> {currentPoll['parent-poll']['name'].toUpperCase()}</h3>:<h3> {currentPoll['parent-poll']['name'].toUpperCase()}</h3>
         }
         <br/>
         <div className="text-mute text-center mt-2"> {pollDuration} </div>
     </div>
    
         <br/> <br/>
         {
         currentPoll['child-poll']['data'].map((queEl,i)=>
         <div className="mt-3">
          <PreviewComp key={i.toString()} questionstyle={{fontSize:window.innerWidth<550?'1.3rem':'25px',fontWeight:'bold',width:window.innerWidth<550?"calc(100vw/2)":'400px',whiteSpace:'break-spaces',textAlign:'left'}} {...queEl} participates={ currentPoll['child-poll']['number_of_engagement']} callbackfunc={(option,answer,score,grading)=>{
            currentPoll['child-poll']['data'][i]['option'] = option
            console.log(answer+" and "+grading)
            if(grading=="right"){
              numberOfrightansweredquestions=numberOfrightansweredquestions+1
              questionairScore = parseInt(questionairScore)+ parseInt(score)
            }
          }}>
          </PreviewComp>
         </div>
         )
        }
        
        <button onClick={(event)=>{
          var votingObj 
          var checkedvoted = getCookie('vtu')
          if(document.querySelector(".alert"))
           document.querySelector(".alert").remove()
            questionsLength = currentPoll['child-poll']['data'].length

          if(!checkedvoted){
            var rString = randomString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
            var vtu = "vtu"+ rString
             setCookie("vtu",vtu)
              votingObj = {"votingUser":vtu,"voter-details":{...voter,"rightanswers":numberOfrightansweredquestions+" out of "+questionsLength,"score":questionairScore}}
              console.log(votingObj)
               currentPoll['child-poll']['number_of_engagement'] = parseInt(currentPoll['child-poll']['number_of_engagement'])+1
             sendData('updatevote',{...currentPoll['child-poll'],...votingObj},(result)=>{
            //  event.target.disabled = "disabled"
             event.target.innerHTML = "Done"
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
          }else{
            var vtu = getCookie("vtu",vtu)
              votingObj = {"votingUser":vtu}
          }
           
        }} 
        className="btn primary-background text-white col-5 col-md-3 ml-auto mr-1 mt-4" style={{height:'40px',fontSize:'11px'}}>Send</button>

  <div class="modal fade" id="pollsModal2" tabindex="-1" aria-labelledby="pollsModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style={{maxWidth:'600px',}}>
    <div class="modal-content" style={{fontSize:'13px',}}>
      
      <div class="modal-body p-4 text-left">
       <form className="form">
        <div className="font-weight-medium my-3">Please fill in some information</div>
        
        <div className="pt-4 pb-2">Your name</div>
        <input type="text" className="form-control" name="poll_name" {...register("voter_name",{required:true,minLength:4})} />
        {errors.voter_name && <span style={{color:'red',fontSize:'10px'}}>Please enter a proper name .</span>}
        <div className="pt-4 pb-2" >Designation : </div>
         <select className="form-control" name ="voter_designation" {...register("voter_designation",{required:true,minLength:4})}>
            <option value="Reverend">Reverend</option>
            <option value="Regional Pastor">Regional Pastor</option>
            <option value="Zonal Pastor">Zonal Pastor</option>
            <option value="Pastor">Pastor</option>         
            <option value="Deacon">Deacon</option>
            <option value="Deaconess">Deaconess</option>
            <option value="Brother">Brother</option>
            <option value="Sister">Sister</option>
           </select>
           {errors.voter_designation && <span style={{color:'red',fontSize:'10px'}}>Please your designation.</span>}
        <div className="pt-4 pb-2">Select your zone : </div>
         <select className="form-control" name="voter_zone" {...register("voter_zone",{required:true,minLength:4})}>
            <option>Select zone</option>
            { 
            zones.map(zone=><option value={zone}>{zone}</option>)
            }
           </select>
           {errors.voter_zone && <span style={{color:'red',fontSize:'10px'}}>Please select a zone.</span>}
       <div className="row py-2 m-0 justify-content-between">
       <div className="btn">Cancel</div>  <button onClick={handleSubmit((data,event)=>{
       console.log(data);
       setvoter(data);
        document.querySelector('.modal-backdrop').style.display="none"
        document.querySelector('.modal').style.display="none"


       })}  className="btn primary-background text-white" style={{height:'40px'}}>Join poll</button>
       </div>
      </form> 
      </div>
     
    </div>
  </div>
</div>
   </div>
     <button className="btn pollinfomodaltrigger" data-toggle="modal" data-target="#pollsModal2"></button>

   </div>
 )
}