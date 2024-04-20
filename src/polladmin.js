import { Outlet } from 'react-router-dom'
import './polladmin.css'

export function PollDashboard(){

 return(
    <div class="container-fluid px-0" >
    <div class="container-fluid top-bar shadow-sm bg-white" style={{position: "fixed", zIndex: 200}}>
        <div class="row justify-content-center pt-2 px-3" style={{height: '55px'}}>
            <div class="col">

            </div>
              
            
            <div class="col row justify-content-end">
                <a href="#"> <i class="ri-upload-2-line"></i></a>
                <a href="#"><i class="ri-add-fill"></i></a>
               
                
                <span style={{display: "flex",alignSelf: "baseline"}} class="dropdown-toggle " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <span class="notificatio_count font-weight-bold badge badge-danger" style={{position:"absolute",top:"-1px"}}>0</span>
                 <i class="ri-notification-2-line"></i>
               </span>
                <div class="dropdown-menu notification_toggle" aria-labelledby="dropdownMenuButton" style={{ height: "300px !important",overflowY: "auto"}}>
                   <a href="#" class="dropdown-item text-secondary-light p-0">
                                <div class="d-flex flex-row border-bottom">
                                    <div class="notification-icon bg-secondary-c pt-3 px-3"><i class="far fa-envelope text-primary fa-lg"></i></div>
                                    <div class="flex-grow-1 px-3 py-3">
                                        <p class="mb-0">New admin registered <span class="badge badge-pill badge-primary">New</span></p>
                                         <small>James : Hey! Are you busy?</small> 
                                    </div>
                                </div>
                            </a>
                           
                </div>
                 <div class="dropdown">
                <a href="#" class="dropdown-toggle text-muted" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="/images/Capture.PNG" alt="profile" id="profile-image" style={{height:"40px",width:"40px",borderRadius: "100%"}}/></a>
                                       
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a class="dropdown-item text-dark logout-btn" href="#">Log Out</a>
                                        </div>
                                    </div>
            </div>
        </div>
       </div>
     {/* The side bar */}
     <div class="side-bar side-bar-lg-active"  >
        {/* <!-- Brand details --> */}
        <div class="side-menu-brand mt-5">
              <div class="close-btn-div text-right text-white pr-3"><i class="ri-close-line font-weight-bold close-btn" style={{fontSize:"2rem"}}></i></div>
            <div class="col-sm-8 mx-auto">
             
            </div>
           
        </div>
        {/* <!-- Side bar menu --> */}
        <div class="the_menu mt-5">

            {/* <!-- Menu item --> */}
            <div >
                <ul class="side-menu p-0 m-0">
                    <li class="side-menu-item px-lg-2 px-xl-4 mb-1 "><a href="/polls-admin/dashboard" class="pt-2 pl-4 active"><i class="ri-dashboard-line pr-2"></i>Dashboard</a></li>
                    {/* <!-- Sub menu parent --> */}
                    <li class="side-menu-item px-lg-2 px-xl-4 "><a href="/polls" class="pt-2 pl-4" ><i class="ri-exchange-funds-fill pr-2" ></i>Polls</a></li>
                    <li class="side-menu-item px-4">
                        <hr style={{backgroundColor: "#f0e8e8"}}/>
                    </li>
                    
                   
                    <li class="side-menu-item px-lg-2 px-xl-4 mb-1"><a href="/users" class="pt-2 pl-4"  aria-expanded="false" ><i class="ri-pie-chart-2-line pr-2"></i>Users</a></li>

                    {/* <!-- Sub menu parent --> */}
                    <li class="side-menu-item px-lg-2 px-xl-4 mb-1"><a href="/analytics" class="pt-2 pl-4" ><i class="ri-file-chart-line pr-2"></i>Analytics</a></li>
                  
                    {/* <!-- <li class="side-menu-item px-4"><a href="#" class="pt-2 pl-4"><i class="ri-message-3-line pr-2"></i>Messages</a></li> -->
                    <!-- spacer====== --> */}
                    <li style={{height:"calc(100vh/4);"}}>

                    </li>
                    <li class="side-menu-item px-lg-2 px-xl-4 mb-1"><a  id="logout-btn"  class="pt-2 pl-4"   aria-expanded="true" aria-controls="sub_menu_2"><i class="ri-logout-circle-r-line pr-2"></i>Log Out</a></li>
                  
                </ul>
            </div>
        </div>
    </div>
      {/* <!-- Main body --> */}
   <div class="main_body_div" style={{position: "relative", marginLeft:"20rem" ,width:" 75%",paddingTop:"3.5%",transition: "all ease 0.5s "}}>
    
       <Outlet>
       
       </Outlet>
       
      </div>
   </div>
 )
}