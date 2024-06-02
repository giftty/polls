import { useEffect } from "react"
import { getCookie } from "./models"
import { useOutletContext } from "react-router-dom"


export function PollsEvent(){
var poll
poll= JSON.parse(getCookie('poll'))

return (
   <div className="container pt-5">
         <div className="row">
            <div className="col-lg-6">
                <div className="card p-3 border" style={{borderRadius:'15px',height:'400px'}}>
                    <div className="card-body p-3">
                     <div className="d-flex mb-3"><i class="ri-bar-chart-line"></i>  <h5>&nbsp;&nbsp;Select a poll type</h5></div>
                     <div className="row">
                      <div onClick={()=>{ window.location='/polls-events/multichioce'}} className="p-3 text-center border col-5 m-2" style={{borderRadius:'15px'}}>
                      <i class="ri-list-check-3 text-primary" style={{fontSize:'40px'}}></i>
                         <h6>Multi chioce</h6>
                      </div>
                     
                      <div className="p-3 text-center border col-5 m-2" style={{borderRadius:'15px'}}>
                         <img className="mt-2 mb-1" src="images\trophy_977441.png" style={{width:'50px',height:'auto'}}/>
                         <h6>Quiz</h6>
                      </div>

                      <div className="p-3 text-center border col-5 m-2" style={{borderRadius:'15px'}}>
                      <img className="mt-2 mb-1" src="images\comment_9784114.png" style={{width:'50px',height:'auto'}}/>
                         <h6>Large text responds</h6>
                      </div>
                     </div>
                    </div>
                </div>
            </div>
            {/* end of col-lg-6 */}
            <div className="col-lg-6" >
               <div className="card p-5 border" style={{borderRadius:'15px',height:'400px'}}>
                  <div className="card-body justify-content-center ">
                    <div className="text-center ">
                    <h5 className="mb-4"> Create your engagement </h5>
                     <p>Create and launch polls to collect responses.<br/>
                        Your participants can interact with your polls
                        event by joining at polls.org with the code&nbsp;&nbsp;
                        <a href={"/polls-events/multichioce?poll="+poll['pollsID'].substring(1)}>{poll['pollsID']}</a></p>
                         <div className="row justify-content-center mt-5">
                         <button className="btn p-2 mt-1 bg-white text-primary col-4" ><i class="ri-link"></i> Share</button>
                         <button className="btn p-2 mt-1 bg-primary text-white col-4" ><img src="images\present.svg"/> Present</button>
                         </div>

                    </div>
                  </div>
               </div>
            </div>
            {/* col-lg-6 */}
          </div>
         </div>
)
}