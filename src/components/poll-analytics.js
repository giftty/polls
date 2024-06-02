
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React, { useState } from 'react';
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { dataSTore } from './dataobject';
import { useOutletContext } from "react-router-dom";

export function Polls_analytics(){
   var [currentPoll,setcurrentPoll] = useOutletContext()
   
  console.log(currentPoll['parent-poll'])
  const  percentage = (currentPoll['child-poll']['number_of_engagement']
  /currentPoll['child-poll']['number_of_participation'])*100
  var [graphdata,setgraphdata] = useState(currentPoll['child-poll']['data'][0]['option'])
  var totalValue = 0 

 return(
  <div className="w-100 bg-light" style={{minHeight:"90vh"}}>
  <div className="container pt-5" style={{height:"90vh",overflow:"auto"}}>
    <div className="d-flex justify-content-between mx-auto">
       <div className="d-flex justify-content-center">
          <h2 className="medium-text px-3">Overview</h2>
       </div>
       {/* row ends here */}

      <div className='col-auto d-flex'>
      <button onClick={()=>window.location="/polls-events/multichioce?poll="+"#1178160".substring(1)} className="btn btn-sm mx-2 p-2 primary-background text-white"><i class="ri-edit-2-line"></i>Edit</button> 
      <button className="btn  btn-sm p-2 primary-background text-white"><i class="ri-upload-line"></i> Export</button>
      </div>
      </div>
      <div className="card bg-white my-4 p-4" style={{minHeight:'250px',borderRadius:'15px'}}>
        <div className="row">
         <div className="col-lg-4 border-right" >
          <div className="border-bottom p-3">
          <h6>Engaged participants</h6>
          <span className="small"> {currentPoll['child-poll']['number_of_engagement']} out of {currentPoll['child-poll']['number_of_participation']} {currentPoll['parent-poll']['name']} poll participants engaged with polls </span>
          </div>
            <div className="mx-auto p-3" style={{width:"150px",height:"150px"}}>
              <CircularProgressbar strokeWidth="14" value={percentage} text={`${percentage}%`} />
            </div>
           
         </div>
         <div className="col-7 mx-auto">
           <div className='mb-3'>
             <select className="form-control">
             {
               currentPoll['child-poll']['data'].map((e)=>
                <option onClick={()=>setgraphdata(e['option'])}>{e["questionString"]}</option>
               ) 
             }
           </select>
           </div>
           <div style={{height:'300px'}}>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart width={50} height={100} data={graphdata}>
            <Bar dataKey="stat" fill="#8884d8" />
            <Tooltip />
            <XAxis dataKey="optionString"/>
            </BarChart>
           </ResponsiveContainer>
           </div>
         </div>
        </div>
      </div>
       <div>
         {
           currentPoll['child-poll']['data'].map((ques,i)=>{
               {
               ques["option"].map((opt,i)=>{ totalValue = totalValue + opt['stat']})
               }
              return <div className="container">
                <div className="h3">
                 {ques["questionString"]}
                </div>

                
                {
               ques["option"].map((opt,i)=>{
                return <div class="progress my-3" style={{height:"2.5rem"}}>
                {opt['stat']!=0?
                 <div class="progress-bar progress-bar-striped progress-bar-animated pl-3" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style={{width: ((opt['stat']/totalValue)*100) + "%"}}> {opt['optionString']} &nbsp;&nbsp;{(Math.round((opt['stat']/totalValue)*100)) + "%"}</div>
                 :<div className="py-3 pl-2" style={{marginLeft:'10px'}}>{opt['optionString']}&nbsp;&nbsp;0%</div>}
                 </div>}
                )}
                
                

             </div>})
         }
       </div>
  </div>
  </div>
 )
}