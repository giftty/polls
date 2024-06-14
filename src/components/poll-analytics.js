
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { dataSTore } from './dataobject';
import { useOutletContext } from "react-router-dom";
import { getCookie, sendData, zonelist } from './models';

        
export function Polls_analytics(){
   var [currentPoll,setcurrentPoll] = useOutletContext()
   var [votingUsers,setvotingusers] = useState([])
   var [particpationArray,setparticipationArray] = useState([])
  let  percentage = 0
  if(currentPoll['child-poll']['number_of_engagement']!= 0 && currentPoll['child-poll']['number_of_participation']!=0){
    percentage = (currentPoll['child-poll']['number_of_participation']/currentPoll['child-poll']['number_of_engagement'])*100
    percentage =percentage.toFixed(1)
  }
  var [graphdata,setgraphdata] = useState(currentPoll['child-poll']['data'][0]['option'])
  var totalValue = 0 
   var [searchdata,setsearch] = useState([])
  useEffect(()=>{
   
   sendData('getAllvoters',{"pollid":currentPoll['parent-poll']['pollsID']},(result)=>{
    var cnt
    var par=[]
    new Promise((resolve,reject)=>{
     var cnt = 0
     result['data'].map(re=>{
      cnt++
     re['userdetails']= re['userdetails'].replaceAll("'",'"')
     re['userdetails'] = JSON.parse(re['userdetails']) 
     if(cnt>=result['data'].length) 
      resolve()
     })
    }).then(()=>{
       setvotingusers([...result['data'].sort((a,b)=>b['userdetails']['score']-a['userdetails']['score'])])
       setsearch([...result['data']])
      console.log(result['data'])
      console.log(zonelist)
      zonelist.forEach((zn)=>{
       var arr= result['data'].filter(res=>res['userdetails']['voter_zone']==zn)
       console.log(arr)
       par.push(arr)
      }
      )
    }).then(()=>{
    console.log(par)
    setparticipationArray([...par.sort((a,b)=>b.length-a.length)])
    })
     
   })
  },[])
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
       <div>
        <h2 className="medium-text px-3 mt-5 mb-4">Top participants</h2>
        <div className='col-lg-8 col-9'>
          {
            particpationArray.slice(0,3).map((opt,i)=>{
                return<div> 
                  <div>
                    &nbsp;&nbsp;{opt[0]['userdetails']['voter_zone']} &nbsp;&nbsp;participants {opt.length}
                   </div>
                <div class="progress my-3" style={{height:"1.3rem"}}>
                {opt[0]['userdetails']['score']!=0?
                 <div class="progress-bar progress-bar-striped progress-bar-animated pl-3 small" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style={{width: ((opt[0]['userdetails']['score']/totalValue)*100) + "%"}}> {opt[0]['userdetails']['voter_name']}&nbsp;&nbsp;{opt[0]['userdetails']['voter_zone']} &nbsp;&nbsp;Top Score {opt[0]['userdetails']['score']}</div>
                 :<div className="py-3 pl-2" style={{marginLeft:'10px'}}>{opt[0]['optionString']}&nbsp;&nbsp;0%</div>}
                 </div></div>}
                )
          }
        </div>
          
      </div>
      <div className='card bg-white my-4 p-4' style={{minHeight:'350px',borderRadius:'15px',overflow:'auto'}}>
          <div className='row justify-content-between'>
           <h2 className="medium-text px-3">SCORE TABLE</h2>
           <div className="d-flex w-50 justify-content-center bg-light px-1 pt-1 my-3 mr-4" style={{height:"50px",borderRadius:"40px"}}>
           <input placeholder='Search' name="pollID" style={{backgroundColor:'transparent'}}  id="searchvoters" className="border-0 w-75"/>
            <i className=''></i>
            </div>
          </div>
          {
          votingUsers.length<=0?
          <div>
            <table class="table">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Designation</th>
            <th scope="col">Zone</th>
            <th scope="col">Answer</th>
            <th scope="col">Score</th>
          </tr>
          </thead>
          <tbody>
          
          </tbody></table>
           <div className="d-flex flex-column justify-content-center" style={{height:'90vh'}}>
           <div className="col-auto mx-auto">
            <img src="/images/POLLs.png" style={{height:'20px',width:'auto'}}/>
            <div className='text-dark'>Loading ...</div>
           </div>
        </div>
          </div>


          
        :
         <div>
          
          <table class="table">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Designation</th>
            <th scope="col">Zone</th>
            <th scope="col">Answer</th>
            <th scope="col">Score</th>
          </tr>
          </thead>
          <tbody>
          {
          votingUsers.map((votersrows,i)=>
          <tr>
            <th scope="row">{i+1}</th>
            <td className={i==0?"font-weight-bold bg-success text-white ":""}>{votersrows['userdetails']['voter_name']}</td>
            <td className={i==0?"font-weight-bold bg-success text-white ":""}>{votersrows['userdetails']['voter_designation']}</td>
            <td className={i==0?"font-weight-bold bg-success text-white ":""}>{votersrows['userdetails']['voter_zone']}</td>
            <td className={i==0?"font-weight-bold bg-success text-white ":""}>{votersrows['userdetails']['rightanswers']}</td>
            <td className={i==0?"font-weight-bold bg-success text-white ":""}>{votersrows['userdetails']['score']}</td>
          </tr>
          )}
          </tbody>
          </table>
          </div>
          }
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