import { useEffect, useLayoutEffect,useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { dataSTore } from "./dataobject";
import dateFormat, { masks } from "dateformat";
import { getCookie, sendData } from "./models";

export function PollEventLayout(){
 const location = useLocation()
 const navigate = useNavigate()
 var title = " ", subtitle = " ", middleTitle = " ", middleSubTItle = " "
 var [errmessage,seterrormessage]=useState(null)
 var [poll,setpoll] = useState({})
 var [currentPoll,setcurrentPoll] =useState({})
 var count = 0

 function getAnalysisContent(){
       sendData('pollanddata',{'id':'#'+pollstr},(result)=>{
        console.log(result)
        if(result['parent-poll']){
        currentPoll['parent-poll'] = result['parent-poll']
        currentPoll['child-poll'] = result['child-poll'] 
        setpoll({...currentPoll['parent-poll']})   
         currentPoll['child-poll']['data'] = currentPoll['child-poll']['data'].toString().trim('"')
        currentPoll['child-poll']['data'] = currentPoll['child-poll']['data'].toString().replaceAll("'",'"')
        currentPoll['child-poll']['data'] = JSON.parse(currentPoll['child-poll']['data'])
        console.log(currentPoll['child-poll']['data'])
        setpoll({...currentPoll['parent-poll']})
        setcurrentPoll({...currentPoll})   
        }else{
         if(result['error'] && location.pathname.indexOf('/polls-analytics')!=-1){
           window.location='/polls-events'
         }else{
           seterrormessage("No such poll.")
         }
         
          
        }
        
     })
 }
 var pollstr
 function getAnalytics(){
       sendData('pollanddata',{'id':'#'+pollstr},(result)=>{
        console.log(result)
        if(result['parent-poll']){
        currentPoll['parent-poll'] = result['parent-poll']
        currentPoll['child-poll'] = result['child-poll'] 
        setpoll({...currentPoll['parent-poll']})   
        currentPoll['child-poll']['data'] = currentPoll['child-poll']['data'].toString().trim('"')
        currentPoll['child-poll']['data'] = currentPoll['child-poll']['data'].toString().replaceAll("'",'"')
        currentPoll['child-poll']['data'] = JSON.parse(currentPoll['child-poll']['data'])
        console.log(currentPoll['child-poll']['data'])
        setpoll({...currentPoll['parent-poll']})
        setcurrentPoll({...currentPoll})   
        }else{
        if(result['error'] && location.pathname.indexOf('/polls-analytics')!=-1){
        window.location='/polls-events'
        }else{
        seterrormessage("No such poll.")
        }


        }

        })
 }
 useEffect(function(){
     pollstr = new URLSearchParams(window.location.search).get('poll') 
     console.log(pollstr)
     if(location.pathname.indexOf('polls-events')!= -1){
         pollstr = JSON.parse(getCookie('poll'))
        setpoll({...pollstr})
     }else{
       if(!pollstr){
        pollstr = JSON.parse(getCookie('poll'))
        console.log(pollstr)
        pollstr = pollstr["pollsID"].substring(1)
      }
       console.log(pollstr)
      if(typeof poll["name"]== 'undefined' && pollstr){
       getAnalytics()
       setInterval(function(){
        getAnalytics()
       },60000)
  
 }

     }
      
 },[])
   
  
  if(poll["duration_from"] != undefined){
  title = poll["name"]??poll['poll_name']
  subtitle = dateFormat(new Date(poll["duration_from"].split('+')[0]), "mmm dS  h:MM")+" - "+ dateFormat(new Date(poll["duration_to"].split('+')[0]), "mmm dS  h:MM")
  middleTitle = <span>{poll["pollsID"]}&nbsp;&nbsp;<i className="badge badge-success small">{poll['status']}</i></span>
  middleSubTItle = poll["type"]
  }
    
    return(
           
        poll["duration_from"] != undefined?
        <div className="w-100 bg-light" style={{height:'100vh'}}>
          <header className="bg-primary w-100 py-2 text-white" style={{height: window.innerWidth<550?'120px':'70px'}}>
           <div className="container-fluid px-md-5">
           <div className="row justify-content-between p-0 m-0">

               <div className="col-auto mb-2 mb-md-1"> 
                 <div className="row justify-content-end">
                  <div className="col-1 pr-4" onClick={()=>{window.location =location.pathname.indexOf('/polls-display')!=-1?'/': '/polls-admin'}}>
                  <i className="ri-arrow-left-s-line" style={{fontWeight:'bolder',fontSize:'25px'}}></i>
                </div>
                <div className="col">
                    <div className="">{title}</div>
                    <span className="small">{subtitle} </span>
                     <div className="d-block d-md-none">{middleTitle}</div>
                </div>
                 </div>
               
               </div>
               <div className="col-auto text-center d-none d-md-block"> 
                <div className="">{middleTitle}</div>
                <span className="small"><i class="ri-shield-flash-line"></i> {middleSubTItle} </span><br/>
                
               </div>
               {
                location.pathname.indexOf('/polls-events')!=-1?
                  <div className="col-auto text-center"> 
                  <button className="btn p-2 mt-1 bg-white text-primary" ><i class="ri-slideshow-4-line"></i> Present mode</button> &nbsp;&nbsp;&nbsp;
                  <img src="/images/profilevector.jpg" alt="profile" id="profile-image" style={{height:"40px",width:"40px",borderRadius: "100%",marginTop:'5px'}}/>
                  </div>
                :
                 <div class="col-auto row justify-content-md-end d-none d-md-flex">
               
                 <div> 
                 <a className="mx-1" href="/"> <i class="ri-home-4-line text-white"></i></a>
                <a className="mx-1" href="#"><i class="ri-add-fill text-white"></i></a>
                </div>
                <span style={{display: "flex",alignSelf: "baseline"}} class="dropdown-toggle mx-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <span class="notificatio_count font-weight-bold badge badge-danger" style={{position:"absolute",top:"-3px"}}>0</span>
                 <i class="ri-notification-2-line text-white"></i>
               </span>
                <div class="dropdown-menu notification_toggle" aria-labelledby="dropdownMenuButton" style={{ height: "300px !important",overflowY: "auto"}}>
                   <a href="#" class="dropdown-item text-secondary-light p-0">
                                <div class="d-flex flex-row border-bottom">
                                    <div class="notification-icon bg-secondary-c pt-3 px-3"><i class="far fa-envelope text-primary fa-lg"></i></div>
                                    <div class="flex-grow-1 px-3 py-3">
                                        <p class="mb-0">New admin registered <span class="badge badge-pill badge-primary">New</span></p>
                                         <small>James : Hey! Are you busy?</small> 
                                    </div>
                                </div>
                            </a>
                           
                </div>
                 <div class="dropdown">
                <a href="#" class="dropdown-toggle text-muted" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="/images/profilevector.jpg" alt="profile" id="profile-image" style={{height:"40px",width:"40px",borderRadius: "100%"}}/></a>
                                       
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item text-dark logout-btn" href="logout">Log Out</a>
                    </div>
                </div>
            </div>
               }
               
            </div>
           </div>
          </header>
          <Outlet context={[currentPoll,setcurrentPoll]}></Outlet>
        </div>
        :
        // location.pathname.indexOf('polls-events')!= -1?
        //   <Outlet context={[currentPoll,setcurrentPoll,poll,setpoll]}></Outlet>
        //   :
        <div className="d-flex flex-column justify-content-center" style={{height:'90vh'}}>
           <div className="col-auto mx-auto">
            <img src="/images/POLLs.png" style={{height:'40px',width:'auto'}}/>
            {errmessage?<div className="py-3">{errmessage}<a href="/">  return to home</a></div>:<div> Loading .... </div>}
           </div>
        </div>
    )
}