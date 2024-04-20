
export default function Home(){
 
 return(
  <div className="main-body">
   <div>
   </div>
   <div className="row" style={{marginTop:"80px",padding:"10px 10px",height:"100vh"}}>
     <div className="col-lg-5 text-dark d-flex justify-content-center flex-column px-5 m-4">
       <h1 style={{fontWeight:"700",fontSize:"55px"}}>Live polls/<br></br>Interactions</h1>
       <p className="mt-3">Create engaging live polls and have anyone participate from anywhere easy and fast. Get the quick fedback; </p>
     
      <a href="/signup"><button className="btn p-3 text-white w-75" style={{backgroundColor:"#5e87f8"}}> GET STARTED</button></a>
     </div>
     {/* end of col-lg-5 */}
     <div className="col text-white d-flex justify-content-center flex-column p-5 mb-1"  style={{backgroundColor:"#5e87f8"}}>
     <div className="text-center">
           <h1 style={{fontWeight:"700",fontSize:"35px",lineHeight:"2.5px"}}>Join in as a participant</h1><br></br>
            <span className="p-2">No account needed</span>
            <div className="d-flex justify-content-center bg-white px-3 pt-1 mt-3 mx-auto" style={{width:"50%",height:"60px",borderRadius:"40px"}}>
            <h1 className="text-primary-color">#</h1><input className="border-0 w-75"></input>
            <img style={{width:"45px",height:"45px",paddingTop:"4.5px",paddingLeft:"5px"}} src="/images/arrow_button.png"/>
            </div>
     </div>
     </div>
     {/* End of col */}
   </div>
   {/* End of row */}
  </div>
 )

}