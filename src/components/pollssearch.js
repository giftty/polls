import { Pollsearchcomponent } from "./pollssearchcomponent";
import { useState } from "react";

export function Pollsearch(){

 function handleSubmit(pollID){
  var trimPoll = '/polls-display?poll='+ pollID.substring(1)
    window.location = trimPoll
 }
 const [searchText,setSearchText] = useState('')
 const [allsearch,setallsearch] = useState('all')
return(
    <div className="container bg-light" style={{paddingTop:"100px"}}>
     
       <div className="d-flex flex-column justify-content-center" style={{height:'90vh'}}>
      
           <div className="col-auto mx-auto">
            <h3>Search polls by their unique number.</h3>
             <div className="d-flex justify-content-center bg-white px-3 pt-1 mt-3 shadow" style={{width:"90%",height:"60px",borderRadius:"40px"}}>
            <h1 className="text-primary-color">#</h1><input name="pollID" onChange={(event)=>{setSearchText(event.target.value);setallsearch(null)}} id="pollID" className="border-0 w-75"/>
            <img onClick={()=>{handleSubmit(document.getElementById('pollID').value)}} style={{width:"45px",height:"45px",paddingTop:"4.5px",paddingLeft:"5px"}} src="/images/arrow_button.png"/>
            </div>
            <div className="pt-3">
             <Pollsearchcomponent pollsearchstr={searchText} allpoll={allsearch}></Pollsearchcomponent>
            </div>
           </div>
        </div>
    </div>
)
}