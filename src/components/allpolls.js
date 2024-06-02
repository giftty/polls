import { useState,useEffect } from "react"
import { getCookie, sendData, setCookie } from "./models";
import dateFormat, { masks } from "dateformat";

export function Allpolls(){
 let  [bodySwitch,setbodySwitch] =useState('line')
 let [polls,setpolls] = useState([])


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
  <div  style={{height:'88vh',overflow:'auto'}}>
    <div className="d-flex justify-content-between mt-5" >
      <div class="d-flex  col-md-5 border bg-white" style={{borderRadius:"9px"}}>
                <input id="search_box" class="form-control border-0" type="text" name="search" placeholder="search" style={{backgroundColor: "#fff"}}/>
                <i class="ri-search-line mt-2" style={{marginLeft:"-25px"}}></i>
            </div>
            <div className="d-flex">
               <select className="form-control">
                <option disabled>Filter polls</option>
               </select>

               <div className="d-flex justify-content-center bg-white ml-1 p-1 mody-switch" style={{borderRadius:"9px"}}>
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
 )
}