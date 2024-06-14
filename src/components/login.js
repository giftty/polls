
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getCookie, sendData, setCookie } from "./models";
import { dataSTore } from "./dataobject";
import { useEffect } from "react";

export function Login(){
const  { register, watch, formState: { errors }, handleSubmit } = useForm();
 const navigate = useNavigate()

 function passwordObscureChange(passwordelement){
   var obscureIcon = document.createElement('i')
   obscureIcon.classList = "ri-eye-line"
   obscureIcon.style.float ="left"
   obscureIcon.style.position = "relative"
   obscureIcon.style.marginTop = "-40px"
   obscureIcon.style.left = (parseInt(passwordelement.offsetWidth)-30).toString()+"px"
   var unObscureIcon = document.createElement('i')
   unObscureIcon.classList = "ri-eye-off-line"
   unObscureIcon.style.float ="left"
   unObscureIcon.style.position = "relative"
   unObscureIcon.style.marginTop = "-40px"
   unObscureIcon.style.left = (parseInt(passwordelement.offsetWidth)-30).toString()+"px"
   obscureIcon.onclick = function(event){event.target.replaceWith(unObscureIcon);passwordelement.type = 'password'}

   unObscureIcon.onclick = function(event){
     event.target.replaceWith(obscureIcon);passwordelement.type = 'text'
   }
   passwordelement.after(obscureIcon)
 }
 
 useEffect(()=>{
  var passwordInputs = document.querySelectorAll("input[type='password']")
  console.log(passwordInputs)
  passwordInputs.forEach((tm)=>{
     passwordObscureChange(tm)
  })
  if(getCookie ('user-id'))
   window.location = '/polls-admin'
 },[])
 const onSubmit = (data) => {
//  var user = dataSTore['users'].filter(u=>u['email']==email);
   sendData('lg',data,(result)=>{
    console.log(result)
    if(!result['error'] && result[0]['firstname']){
     var div = document.createElement("div")
     div.className = "alert alert-success"
     div.append("successfully registered")
     document.querySelector('.form').prepend(div)
     setCookie('user-id',JSON.stringify(result[0]))
     window.location ='/polls-admin'
   }else{
     var div = document.createElement("div")
     div.className = "alert alert-danger"
     div.append(result['error'])
     document.querySelector('.form').prepend(div)
   }
   })
}
   var email= watch('email')
   var device_size=  window.innerWidth
  return(
    <div className="col-12 m-0 p-0" style={{overflow:'hidden',height:"120vh"}}>
      <div className="row" style={{height:"100vh"}}>
    <div className="col-12 col-lg-5 text-dark d-flex justify-content-center flex-column px-5 m-md-4">
        <div className="text-center text-primary-color">
           <h1 style={{fontWeight:"700",fontSize:"35px",marginTop:device_size<550?"95px":''}}>Join in as a participant</h1><br></br>
            <span className="p-2">No account needed</span>
            <div className="d-flex justify-content-center bg-white  px-3 pt-1 mt-3 mx-auto" style={{width:device_size>550?"50%":"90%",height:"60px",borderRadius:"40px",border:"solid 1px #5e87f8"}}>
            <h1 className="text-primary-color">#</h1><input className="border-0 w-75"></input>
            <img style={{width:"45px",height:"45px",paddingTop:"4.5px",paddingLeft:"5px"}} src="/images/arrow_button.png"/>
            </div>
     </div>
     </div>
     {/* end of col-lg-5 */}
     <div className="col d-flex justify-content-center flex-column mt-5  "  >
        <div className="btn p-2 rounded my-4 w-50 text-primary-color mx-auto mx-md-1" style={{border:"solid 1px #5e87f8"}} > Sign up with kingschat</div>
        <h1 className="pl-4 pl-md-1" style={{fontWeight:"700",fontSize:"35px"}}>Sign Into polls</h1>
        
         
         <div className="card mt-md-4 col-lg-8 col-md-10 col-11">
           <div className="card-body col-11">
             <form className="form p-md-4" onSubmit={handleSubmit(onSubmit)}>
               <input type='text' className="poll-input m-3" name="email" {...register("email",{required:true,minLength:4,pattern:'/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'})}  placeholder="Enter email( kingschat email is prefered)"/>
                  {errors.email && <span style={{color:'red',fontSize:'10px'}}>You have not entered a correct email</span>}
                <input type='password' className="poll-input m-3" placeholder="Password" {...register("password",{required:true,minLength:6})}/>
                {errors.password && <span style={{color:'red',fontSize:'10px'}}>Password must be more than 5 characters</span>}

                  <button className="btn p-2 m-3 w-50 primary-background text-white"> Submit</button>
                  <a href="/signup"><p>If you don't have an account? sign up </p></a>
            </form>
           </div>
         </div>
     </div>
     {/* End of col */}
   </div>
   {/* End of row */}
   {/* Design div */}
   <div className="primary-background background-styling">
   </div>
    </div>
  )
}


