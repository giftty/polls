import React from "react";
import { useForm } from "react-hook-form";
import { dataSTore } from "./components/dataobject";

export function SignUp (){
const  { register, watch, formState: { errors }, handleSubmit } = useForm();

 const onSubmit = (data) => {
  dataSTore['users'].push(data);
   dataSTore['activeUser']=watch('email');
  dataSTore['activeUserPass']=watch('password')
  console.log(dataSTore)
  window.location='/polls-admin'
  }
  var passw= watch('password')
  return(
    <>
      <div className="row" style={{height:"100vh"}}>
     <div className="col-lg-5 text-dark d-flex justify-content-center flex-column px-5 m-4">
        <div className="text-center text-primary-color">
           <h1 style={{fontWeight:"700",fontSize:"35px",lineHeight:"2.5px"}}>Join in as a participant</h1><br></br>
            <span className="p-2">No account needed</span>
            <div className="d-flex justify-content-center bg-white  px-3 pt-1 mt-3 mx-auto" style={{width:"50%",height:"60px",borderRadius:"40px",border:"solid 1px #5e87f8"}}>
            <h1 className="text-primary-color">#</h1><input className="border-0 w-75"></input>
            <img style={{width:"45px",height:"45px",paddingTop:"4.5px",paddingLeft:"5px"}} src="/images/arrow_button.png"/>
            </div>
     </div>
     </div>
     {/* end of col-lg-5 */}
     <div className="col d-flex justify-content-center flex-column"  >
        <div className="btn p-2 rounded my-4 w-25 text-primary-color" style={{border:"solid 1px #5e87f8"}} > Sign up with kingschat</div>
        <h1 style={{fontWeight:"700",fontSize:"35px"}}>Sign up to create polls</h1>
        
         
         <div className="card mt-4 col-lg-7 col-md-10" style={{paddingBottom:"150px",position:'relative',zIndex:2}}>
           <div className="card-body col-11">
             <form className="form p-4" onSubmit={handleSubmit(onSubmit)}>
               <input type='text' name="firstname" {...register("firstname",{required:true,minLength:4})} className="poll-input py-2" placeholder="Enter first name"/>
                {errors.firstname && <span style={{color:'red',fontSize:'10px'}}>Check if this box have been filled correctly</span>}
                <input type='text' name="lastname" {...register("lastname",{required:true,minLength:4})} className="poll-input py-2" placeholder="Enter last name"/>
                 {errors.lastname && <span style={{color:'red',fontSize:'10px'}}>Check if this box have been filled correctly</span>}
                 <input type='email' name="email" {...register("email",{required:true,minLength:4,pattern:'/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'})} className="poll-input py-2" placeholder="Enter email( kingschat email is prefered)"/>
                  {errors.email && <span style={{color:'red',fontSize:'10px'}}>Check if this box have been filled correctly</span>}
                  <input type='tel' name="phone"  {...register("phone",{required:true,minLength:9,valueAsNumber:true})} className="poll-input py-2" placeholder="Enter phone number (Kingshat No prefered)"/>
                  {errors.phone && <span style={{color:'red',fontSize:'10px'}}>Check if this box have been filled correctly</span>}
                   <input type="password" name="password"  {...register("password",{required:true,minLength:6})}  className="poll-input py-2" placeholder="Enter password"/>
                              
                 {errors.password && <span style={{color:'red',fontSize:'10px'}}>Password must be more than 5 characters</span>}

                    <input type="password" name="cpassword"  {...register("cpassword",{required:true,minLength:6,
                  validate:(value,formv)=>passw==value})}  className="poll-input py-2" placeholder="Confirm password"/>
                    {errors.cpassword && <><span style={{color:'red',fontSize:'10px'}}>Password did not match</span><br/></>}
                  <button className="btn p-2 m-3 w-50 primary-background text-white"> Submit</button><br/>
                  <a href="/login"><p> Have an account? Login </p></a>
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
    </>
  )
}