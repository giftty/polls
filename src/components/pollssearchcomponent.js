import { useEffect, useState } from "react"
import "./pollsearchcomponent.css"
import { sendData } from "./models"

export function Pollsearchcomponent({length,className,pollsearchstr,allpoll}){
 console.log(pollsearchstr)
const [allpolls,setallpolls]= useState(null)
var [innersearpollstring,setinnersearchpollstring] = useState(pollsearchstr)

useEffect(()=>{
   if(pollsearchstr.length>3&& allpolls==null)
   sendData('get-polls',{"pollsearchstring":pollsearchstr},(result)=>{
   console.log(result['data'])
   setallpolls([...result['data'].slice(0,10)])
 })
 else if(allpoll == 'all')
   sendData('get-polls',{},(result)=>{
   console.log(result['data'])
   setallpolls([...result['data'].slice(0,10)])
 })
},[pollsearchstr])

return(
 <div className={"w-100 popup"+className} style={{height:'350px',overflowY:'auto'}}>
{
  allpolls == null?
    <div className="card py-3" style={{borderRadius:'15px'}}>
   <div className="d-flex flex-column justify-content-center" >
           <div className="col-auto mx-auto">
            <img src="/images/POLLs.png" style={{height:'20px',width:'auto'}}/>
              <div className="py-3">Searching polls ...</div>
           </div>
        </div>
       </div> 
     :
     allpolls.length == []?
     <div className="card py-3" style={{borderRadius:'15px'}}>
        <div className="d-flex flex-column justify-content-center" >
           <div className="col-auto mx-auto">
            <img src="/images/POLLs.png" style={{height:'20px',width:'auto'}}/>
              <div className="py-3">No available polls</div>
           </div>
        </div>
     </div>
     :
     <div className="w-100 card text-black" style={{borderRadius:'15px'}}>
      <div className="card-body">
        {
         allpolls.map((e,i)=>
          <div onClick={()=>{window.location = '/polls-display?poll='+e['pollsID'].substring(1)}} className="row justify-content-between p-3" style={{cursor:'pointer'}}>
           <div className="col-auto">{e['name']}</div>
           <div className="col-auto">{e['pollsID']}</div>
           <div className="mx-auto mt-1" style={{height:'1.5px',backgroundColor:'grey',width:'90%'}}></div>
          </div>
         )
        }
      </div>
     </div>}
     </div>    
 )
}