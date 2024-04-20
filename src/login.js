

export function Login(){

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
        <div className="btn p-2 rounded my-4 w-25 text-primary-color" style={{border:"solid 1px #5e87f8"}} > Login with kingschat</div>
        <h1 style={{fontWeight:"700",fontSize:"35px"}}>Sign Into polls</h1>
        
         
         <div className="card mt-4 col-lg-7 col-md-10">
           <div className="card-body col-11">
             <form className="form p-4">
               <input type='text' className="poll-input m-3" placeholder="Email"/>
                <input type='password' className="poll-input m-3" placeholder="Password"/>
                  <button className="btn p-2 m-3 w-50 primary-background text-white"> Submit</button>
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