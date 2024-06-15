import { useState,useEffect} from "react"
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { dataSTore } from "./dataobject";
import { useForm } from "react-hook-form";
import { getCookie, sendData, setCookie } from "./models";
import dateFormat, { masks } from "dateformat";

export function Dashboard(){
 let  [bodySwitch,setbodySwitch] =useState('line')
 const  { register, watch, formState: { errors }, handleSubmit } = useForm();
 let [startdate,setStartdate] = useState("2024-05-30 12:00")
 let [enddate,setEnddate] = useState("2024-05-30 17:00")
 let [polls,setpolls] = useState([])
function  createPoll(data,event){
  event.target.disabled = "disabled"
  var userID =  getCookie('user-id')
  userID = JSON.parse(userID)
  console.log(userID)
  data["pollsID"] = "#"+ Math.floor(1000000 + Math.random() * 900000)
  data["duration_from"] = startdate
  data["duration_to"] = enddate
  data["userID"] = userID['userID']
  data["type"] = "multi-polls" 
  data["status"] = "active"
  data["created"] =  Date.now()
  console.log(data)
  event.target.innerHTML = '<div class="loader"></div>'
  dataSTore['polls'].push(data)

  sendData('creat-poll',data,(result)=>{
   console.log(result)
   event.target.innerHTML = 'Creat Poll'
   event.target.removeAttribute('disabled')
   console.log(typeof result['data'])
   if(typeof result['data'] != 'undefined' && result['data'].indexOf('success')!=-1){
     setCookie('poll',JSON.stringify(data),1)
     window.location = '/polls-events'
   } else{
     var div = document.createElement("div")
     div.className = "alert alert-danger"
     div.append(result['error'])
     document.querySelector('.form').prepend(div)
   }
   
  })
 
 }
 
 


useEffect(()=>{
var user =  JSON.parse(getCookie('user-id'))
  sendData('get-polls',{'userID':user['userID']},(result)=>{
  //console.log(result['data'])
  if(typeof result['data']!=undefined)
  setpolls([...result['data'].slice(0,5)])
  else document.querySelector('.container').appendChild(result['error'])
 })
},[]) 
 return(
    <div className="w-100" style={{minHeight:"80vh",overflow:"auto"}}>
     <div className="container p-md-5 pt-5 mt-5 mt-md-1">
      <div className="d-flex justify-content-between mx-auto">
       <div className="d-flex justify-content-center">
          {window.innerWidth<550?
            <h5 className="px-1 px-md-3 ">My Polls</h5>
          :
           <h2 className="medium-text px-1 px-md-3 ">My Polls</h2>
          }
           <div className="px-3 mt-1 small" >
                 <span class="notificatio_count font-weight-bold badge badge-success px-2 py-2 small" > {polls.filter(e=>e['status']=='active').length}</span>
                &nbsp; Active 
               </div>
               <div className="mt-1 small">
                 <span class="notificatio_count font-weight-bold badge badge-danger px-2 py-2 small" > 1</span>
                 &nbsp;Past 
               </div>
       </div>
       {/* row ends here */}

       <button className="btn p-2 primary-background text-white" data-toggle="modal" data-target="#pollsModal" style={{height:"40px"}}><i class="ri-add-line"></i> Create poll</button>
      </div>
      {/* flex-div ends */}

      <div className="d-flex justify-content-between mt-5">
      <div class="d-flex  col-md-5 border bg-white" style={{borderRadius:"9px"}}>
                <input id="search_box" class="form-control border-0" type="text" name="search" placeholder="search" style={{backgroundColor: "#fff"}}/>
                <i class="ri-search-line mt-2" style={{marginLeft:"-25px"}}></i>
            </div>
            <div className="d-flex">
               <select className="form-control">
                <option disabled>Filter polls</option>
               </select>

               <div className="d-md-flex d-none justify-content-center bg-white ml-1 p-1 mody-switch" style={{borderRadius:"9px"}}>
                 <button onClick={()=>{setbodySwitch('line')}} className={bodySwitch=='line'?"btn primary-background-light ":"btn bg-white "}><i class="ri-file-list-line ml-1"></i> </button>
                  <button onClick={()=>{setbodySwitch('grid')}} className={bodySwitch=='grid'?"btn primary-background-light ml-1":"btn bg-white "}><i class="ri-dashboard-line"></i> </button>
               </div>
            </div>
      </div>
      {/* flex-div ends */}
      <div className="text-right mt-4 small"><span>See all</span></div>
      {
      polls.length>0?
        bodySwitch=='line'?
         <div className="main-body-row">
       <div className="row border p-4" style={{borderRadius:"10px 10px 0px 0px"}}>
       <div className="col-auto">
        <label class="check-container">
         <input type="checkbox"/>
         <span class="checkmark"></span>
         </label>
       </div>
         <div className="col ">
          <div className="small"><b>Details</b></div>
         </div>
          <div className="col-2">
             <div className="small"><b>Status</b></div>
          </div>
          <div className="col-2">
             <div className="small"><b>Action</b></div>
          </div>
       </div>
       {/* end of row */}
       {
       
       polls.map((e,i)=>
       
       <div onClick={()=>{setCookie('poll',JSON.stringify(e));window.location = '/polls-analytics'}} className="row border bg-white p-4" style={{borderRadius:i>=polls.length-1?"0px 0px 10px 10px":" "}}>
         <div className="col-auto">
         <label class="check-container">
         <input type="checkbox" />
         <span class="checkmark"></span>
         </label>
         </div>
         <div className="col ">
          <span className="medium"><b>{e['name']}</b>&nbsp;&nbsp;({e['pollsID']})</span><br/>
          <span className="small text-mute">{dateFormat(e['duration_to'], "mmmm dS, yyyy, h:MM:ss TT") }</span>
         </div>
          <div className="col-2">
             <div className="tag text-success small"><b>{e['status']}</b></div>
          </div>
          <div className="col-2">
             <div className="row">
              <i class="ri-sticky-note-add-line mx-3" data-toggle="tooltip" data-placement="top" title="Duplicate poll"></i>
              <i class="ri-more-fill"></i>
             </div>
          </div>
       </div>)}
       {/* end of row */}
      
      </div>
      //* main-body-row end */}
      :
       <div className="row card-grids mt-4"> 
        {/* card begins */}
            {polls.map((e,i)=><div className=" col-6 col-lg-4 mb-4" >
                <div className="border bg-white col-12 p-0" style={{minHeight:"250px",borderRadius:"15px"}} >
                    <div className="row mx-0 border-bottom">
               <div className="col pt-3 px-3">
               <span className="medium"><b>{e['name']}</b>
                  </span>&nbsp;<span className="text-mute">({e['pollsID']})</span><br/>
                  <span className="small text-mute"> {dateFormat(e['duration_to'], "mmmm dS, yyyy, h:MM:ss TT")}</span><br/>
                  <span className="text-mute small"><i class="ri-medal-line"></i> winner: samuel jogn</span><br/>
               </div>
               {/* div end */}
               <div className="col-auto pt-3 px-3">
                  <label class="check-container">
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                  </label>
               </div>
            </div>
            <div className="row mx-0">
               <div className="col pt-3 px-3">
                  <span className="text-mute small"><i class="ri-user-line"></i> chiamake jogn</span><br/>
                  <span className="text-mute small mb-2"><i class="ri-user-line"></i> 60 people</span>
               </div>
               {/* div end */}

            </div>
               <div className="py-3 px-3 alert-success w-100" style={{borderRadius:'0px 0px 15px 15px',position:"absolute",bottom:'0px'}}> {e['status']} </div>
                </div>
            </div>)}
              {/* card ends */}
        
        </div>
        //* Card grid ends  */
      :
      <div className="d-flex flex-column justify-content-center " style={{height:'60vh'}}>
       <div className="col-md-4 col-8 mx-auto text-mute"> You have no polls yet click create poll button to create a poll</div>
      </div>  
      }

      
      
     </div>
     

<div class="modal fade" id="pollsModal" tabindex="-1" aria-labelledby="pollsModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style={{maxWidth:'600px',}}>
    <div class="modal-content" style={{fontSize:'13px',}}>
      
      <div class="modal-body p-4">
       <form className="form">
        <div className="font-weight-medium my-3">When do you want to use your poll?</div>
        <div className="row mt-2">
         <div className="col-md-6">
            <div>Start date</div>
            <Datetime  initialValue={startdate} onChange={(value)=>setStartdate(value['_d'])} dateFormat="YYYY MM DD"/>
         </div>
         <div className="col-md-6">
            <div>End date</div>
            <Datetime   initialValue={enddate} onChange={(value)=>setEnddate(value['_d']) } dateFormat="YYYY MM DD" />
         </div>
        </div>
        <div className="pt-4 pb-2">Give your poll a name</div>
        <input type="text" className="form-control" name="poll_name"  {...register("poll_name",{required:true,minLength:4})}/>
        {errors.poll_name && <span style={{color:'red',fontSize:'10px'}}>Please enter a proper name .</span>}
       <div className="row py-2 m-0 justify-content-between">
       <div className="col-auto alert alert-primary border-primary primary-background text-white rounded small"><i class="ri-information-fill"></i>&nbsp;&nbsp; Anyone with the code or link can participate</div>
       <div className="btn">Cancel</div>  <button onClick={handleSubmit((data,event)=>{createPoll(data,event)})} className="btn primary-background text-white" style={{height:'40px'}}>Create poll</button>
       </div>
      </form> 
      </div>
     
    </div>
  </div>
</div>


    </div>
 )

}