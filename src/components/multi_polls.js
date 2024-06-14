import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import './polls_types.css'
import DragNdrop from "./draganddrop";
import { getCookie, sendData } from "./models";
import { useSearchParams } from "react-router-dom";


var multichioceObj = []
var postObj = {'id':'', 'image':' ','totalscore':0,'data':multichioceObj} 

function Question({questionString='',options=[],answer=0,score,grading}){
 const  { register, watch, formState: { errors }, handleSubmit } = useForm();
 var [_options,setOptions] = useState(options)
 var [answerSelect,setanswerSelect] = useState([])
 var ranNum = Math.random()*2000
 var questionName = "question"+ranNum
 var obj= {'questionString':'', 'option':[],'answer':0,'score':0,'grading':"wrong"}
 var objIndex = 0
 
  return (
   <div className="mt-3" >
    <input type='text' name={questionName}  onChange = {
    function(event){
    obj['questionString'] = event.target.value
    }} 
    onBlur={()=>{ 
    multichioceObj[multichioceObj.length] = obj;}} 
    className="poll-input py-2"  placeholder="Enter the question you would like to ask"/>
    <div className="col-7 col-lg-6 m-0 my-2 p-0">
      <label>Select answer </label>
       <select name={"answer-"+questionName} onChange={(event)=>{
       
        objIndex = multichioceObj.length;
        multichioceObj[objIndex-1]['answer'] = event.target.value;
        }} className="form-control ">
         {
           answerSelect.map((op,idx)=><option value={idx} >{op["optionString"]}</option>)
         }
        </select>
    </div>
    <div className="col-7 col-lg-6 m-0 p-0">
       <input type='number' name={"choices-"+questionName} onBlur={(event)=>{
       
        objIndex = multichioceObj.length;
        multichioceObj[objIndex-1]['score'] = event.target.value;
        postObj['totalscore'] = postObj['totalscore'] + parseInt(event.target.value)
        }} className="poll-input "  placeholder="Enter score"/>
    </div>
    {
    _options.map((op,idx)=> <div key={'p'+idx} className="d-flex my-2 justify-content-start">
    <div className="col-auto m-0 p-0 mt-3">
    <label class="check-container">
    <input type="checkbox" />
    <span class="checkmark"></span>
    </label> 
    </div>
    
    <div className="col-7 col-lg-6 m-0 p-0">
        <input type='text' name={"choices-"+questionName} onBlur={(event)=>{
        var optObj = {}
        optObj["optionString"] = event.target.value
        optObj['stat'] = 0
        objIndex = multichioceObj.length;
        multichioceObj[objIndex-1]['option'].push(optObj);
        if(answerSelect==null)
         answer = multichioceObj[objIndex-1]['option'][0]
        setanswerSelect([...multichioceObj[objIndex-1]['option']])
        }} className="poll-input "  placeholder="Enter and option"/>
    </div>
    <div className="btn btn-sm p-2 ml-4" style={{fontSize:'17px',}} onClick={function(){
     _options.push('')
      setOptions([..._options])
    }}>+</div>
    </div>)
   }
                   
  </div>
  )
}
export function PreviewComp({questionstyle,questionString,option= [],answer=0,score,participates=0,callbackfunc,disable}){

  var [selectedOption,setselectedOption]= useState(null)
  var [preview,setpreview]=useState('main')
  var grading="wrong"
  function setOptionCounts(index){
    option.forEach((opt,i)=>{
      i===index?
      opt['stat']=opt['stat']+1
      :
     opt['stat']!=0 ?
      opt['stat']=opt['stat']-1:  opt['stat']=0
    })
    
  }
  return(
   <div className="preview ">
     <div className="d-flex">
        <span  onClick={()=>setpreview('main')} className="pointer-cursor d-flex">
          <i class="ri-list-check-3 text-primary" style={{fontSize:'22px'}}></i> &nbsp;&nbsp;&nbsp; <span style={questionstyle??{width:'300px',whiteSpace:'break-spaces'}}> {questionString}</span>
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span onClick={()=>setpreview('live')} className="pointer-cursor">
          <i class="ri-bar-chart-line text-primary" style={{fontSize:'17px'}}></i> &nbsp; <small>Live result</small>
      </span>
     </div>
     <br/>
      {preview=='live'&& <small className="text-mute" ><i class="ri-group-line text-mute"></i> {participates} people participated </small>}
      <br/>
              

                {
                
                preview == 'main'&&
               
               <div className="mb-3">
               {
                 option.map((opt,i)=>
                 <div key={i} className="card shadow-sm mx-4 my-2" style={{borderRadius:'15px',minHeight:'40px',backgroundColor:selectedOption==i?"#a9e3fc":"white"}} >
                <div className="d-flex m-0 p-3" disaled="disabled" onClick={()=>{
                     if(disable==null){
                      setselectedOption(i)
                      console.log(i)
                      if(selectedOption!=i)
                      setOptionCounts(i)

                      if(i==answer)
                        grading="right"
                     }
                     if(callbackfunc!=null)
                       callbackfunc(option,answer,score,grading)
                    }
                }>
                
                 <div className="col-2 p-0 m-0">
                   <input type="radio" value="options" name="options" checked={selectedOption==i?"checked":null} style={{height:'30px',width:'50px'}}/>
                 </div>
                 <div className="pl-3 text-left" >{opt['optionString']}</div>
                </div>
              </div>
                )
               
               }
              </div>
                      
             }
             {preview=='live'&& option.map((opt,i)=>

             <div className="container">
                
                <div class="progress mb-3">
                {opt['stat']!=0?
                 <div class="progress-bar progress-bar-striped progress-bar-animated small pl-3" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style={{width: opt['stat']+"%"}}> {opt['optionString']} &nbsp;&nbsp;{opt['stat']+" people"}</div>
                 :<div style={{fontSize:'8px',marginLeft:'10px'}}>{opt['optionString']}</div>
                }
                
                </div>

             </div>
             )
             }
         </div>
  )
}
export function MultichiocePolls (){
   const  { register, watch, formState: { errors }, handleSubmit } = useForm();
    var quesObj = {questionString:'','options':[0,1],'answer':'' }
    var [questions,setQuestions] = useState([quesObj])
    const [files, setFiles] = useState([]);
    var optionBoxes = [1,2,3]
    var [objMulti,setMultiobj] = useState(multichioceObj)
    var pollFromUrlID=''
    var pollFromUrl = {}
    useEffect( function(){
    pollFromUrlID = new URLSearchParams(window.location.search).get('poll')
    if(pollFromUrlID){
     sendData('pollanddata',{'id':'#'+pollFromUrlID},(result)=>{
      console.log(result)
      
     })
    }
     var poll = getCookie('poll')
     poll = JSON.parse(poll)
    //  var randnum= Math.floor(1000000 + Math.random() * 900000)
      postObj['id'] = poll['pollsID']
      postObj['type'] = poll['type']
    },[pollFromUrlID])
   return(
     <>
    
     <div className="row">
       <div className="col-lg-7 mx-auto">
         <div className="card my-5"> 
           <div className="card-body p-3">
            <div className="d-flex justify-content-between px-4 pb-4">
              <span>
                 <i class="ri-list-check-3 text-primary" style={{fontSize:'22px'}}></i> &nbsp;&nbsp;&nbsp; Multiple chioce questions 
              </span>
              <button className="btn btn-sm btn-primary" onClick={function(){
               questions.push(quesObj)
               setQuestions([...questions])
               console.log(questions)
              }}> <i class="ri-add-line text-white"></i>&nbsp; Add</button>
            </div>
             <div className="col-lg-9 mx-auto mt-3" style={{overflowY:'auto',maxHeight:'550px'}}>
              
               <form id="multi-chioce" className="col-lg-10">
                  <DragNdrop onFilesSelected={(files)=>{postObj['image']= files[0]; setFiles(files)}}  ></DragNdrop>
               {  
               questions.map((ques)=>
               <Question questionString={ques['questionString']} options={ques['options']} answer={ques['answer']}> 
               </Question> )
                
                 
                 
                 }
               </form>
               <button  data-toggle="modal" data-target="#messageModal" className="btn" style={{opacity:0}} id="openModal"> </button>
             </div>
             <div className="text-right container">
              <button className="btn bg-primary text-white mx-3" onClick={function(){
                setMultiobj([...multichioceObj])
                if(postObj['image']==undefined)
                 postObj['image']=''
                 console.log(postObj)
              }}>Preview</button>
               <button className="btn bg-primary text-white" style={{fontSize:'18px'}} onClick={function(event){
                  setMultiobj([...multichioceObj])
                  console.log(postObj)
                  event.target.innerHTML = '<div class="loader"></div>'
                  if(postObj['image']==undefined)
                   postObj['image']=''
                  sendData('postpoll',postObj,(result)=>{
                  console.log(result)
                    var div = document.createElement("div")
                   
                    if('data' in result){
                      div.classList = 'alert alert-success small'
                       var textnode = document.createTextNode("Successful")
                       div.appendChild(textnode)
                       document.getElementById('messageBox').prepend(div)
                       document.getElementById('openModal').click()
                    } else{
                      div.classList = 'alert alert-danger small'
                       var textnode = document.createTextNode(result['error'])
                       div.appendChild(textnode)
                       document.getElementById('messageBox').prepend(div)
                       document.getElementById('openModal').click()
                    }
                    event.target.innerHTML = 'Post anaother'
                  }) 
              }}>Post</button>
             </div>
           </div>
         </div>
       </div>
       <div className="col-lg-4 mt-5" style={{maxHeight:'650px',overflow:'auto'}}>
         <h5 className="text-mute">Preview</h5>
         {files.length>0?
          files.toString().split('/')[0].indexOf('data:image')!= -1?
          <img src={files} style={{height:'250px',width:'auto',borderRadius:'15px'}} />
          : <video controls={true} autoPlay={true} muted={true} src={files} style={{width:'100%',position: 'relative',
               marginTop: '20px',marginLeft: '-27.6px',}}>
              </video>
          :''    
         }
         <br/> <br/>
         {
         objMulti.map((queEl)=><PreviewComp {...queEl} callbackfunc={(value)=>{console.log(value)}}></PreviewComp>)
        } 
       </div>
    </div>
    
<div class="modal fade" id="messageModal" tabindex="-1" aria-labelledby="pollsModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style={{maxWidth:'600px',}}>
    <div class="modal-content" style={{fontSize:'13px',}}>
      
      <div class="modal-body p-4">
        <div className="d-flex flex-column px-auto" id="messageBox">
        
        </div> 
      </div>
     
    </div>
  </div>
</div>
    </>
   )

}