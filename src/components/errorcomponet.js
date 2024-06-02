
export function ErrorComponent({errmessage}){
 
 return(
  <div className="d-flex flex-column justify-content-center" style={{height:'90vh'}}>
           <div className="col-auto mx-auto">
            <img src="/images/POLLs.png" style={{height:'40px',width:'auto'}}/>
            {errmessage&&<div className="py-3">{errmessage}</div>}
           </div>
        </div>
 )

}