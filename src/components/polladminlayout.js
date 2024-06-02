import { Outlet, useLocation } from 'react-router-dom'
import './polladmin.css'
import { getCookie, sendData, setCookie } from './models'

export function PollDashboard(){
 var usa =  getCookie('user-id')
 usa = JSON.parse(usa)
 const location = useLocation()
 console.log(location.pathname)
 
 function logout(){
  sendData('logout',{},(request)=>{
   setCookie('user-id',' ',-2)
   if(request['data'])
    window.location = '/'
  })
 }
 return(
    <div className="container-fluid px-0 bg-light" >
    	<div className="navigation-wrap bg-primary shadow-sm start-header start-style d-md-none ">
		<div className="container-fluid">
			<div className="row">
				<div className="col-12">
					<nav class="navbar navbar-expand-md navbar-light">
					
						<a className="navbar-brand" href="/home" target="_blank"><img src="/images/POLLs2.png" alt="" /></a>	
						
						<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						
						<div class="collapse navbar-collapse" id="navbarSupportedContent">
							<ul class="navbar-nav ml-auto py-4 py-md-0">
								<li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4 active">
                                    <div className='d-flex'>
                                      <img src={usa['profile_image'].length>3?usa['profile-image']: "/images/profilevector.jpg"} alt="profile" id="profile-image" style={{height:"25px",width:"25px",borderRadius: "100%",marginTop:"10px"}}/>
									  <div className="col-auto"> 
                                    <div className="">{usa['firstname']+' '+ usa['lastname']}</div>
                                    <span className="small">{usa['email']} </span>
                                    </div>
                                    </div>
									
								</li>
								<li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
									<a className="nav-link text-white" href="/polls-search">Polls</a>
								</li>
								<li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
									<a className="nav-link text-white" href="#">How is works</a>
								</li>
								<li  className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                  <a className="nav-link text-white" onClick={()=>{logout()}}  id="logout-btn" >Log Out</a>
                                </li>
							</ul>
						</div>
						
					</nav>		
				</div>
			</div>
		</div>
	</div>

    <div class="container-fluid top-bar shadow-sm d-none d-md-block bg-primary text-white py-2" style={{position: "fixed", zIndex: 200}}>
        <div class="row justify-content-between px-3" style={{height: '55px'}}>
           
               <div className="col-auto"> 
                <div className="">{usa['firstname']+' '+ usa['lastname']}</div>
                <span className="small">{usa['email']} </span>
               </div>
               <div className="col-auto text-center"> 
                <div className=""></div>
                <span className="small"><i class="ri-shield-flash-line text-white"></i> Admin </span>
                
               </div>
               
            
            <div class="col-auto d-none d-md-flex row justify-content-end">
                <a href="#"> <i class="ri-upload-2-line text-white"></i></a>
                <a href="#"><i class="ri-add-fill text-white"></i></a>
               
                
                <span style={{display: "flex",marginTop:"-6px"}} class="dropdown-toggle " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <i class="ri-notification-2-line text-white"></i>
                 <span class="notificatio_count font-weight-bold badge badge-danger" style={{position:"absolute",top:"-1px"}}>0</span>
               </span>
                <div class="dropdown-menu notification_toggle" aria-labelledby="dropdownMenuButton" style={{ height: "300px !important",overflowY: "auto"}}>
                   <a href="#" class="dropdown-item text-secondary-light p-0">
                                <div class="d-flex flex-row border-bottom">
                                    <div class="notification-icon bg-secondary-c pt-3 px-3"><i class="far fa-envelope text-primary fa-lg"></i></div>
                                    <div class="flex-grow-1 px-3 py-3">
                                        <p class="mb-0">New poll create<span class="badge badge-pill badge-primary">New</span></p>
                                         <small>created multi poll #6758490</small> 
                                    </div>
                                </div>
                            </a>
                           
                </div>
                 <div class="dropdown">
                <a href="#" class="dropdown-toggle text-muted" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src={usa['profile_image'].length>3?usa['profile-image']: "/images/profilevector.jpg"} alt="profile" id="profile-image" style={{height:"40px",width:"40px",borderRadius: "100%"}}/></a>
                                       
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" onClick={()=>{logout()}} >
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
                    <li class="side-menu-item px-lg-2 px-xl-4 mb-1 "><a href="/polls-admin" className={location.pathname=='/polls-admin'? "pt-2 pl-4 active":"pt-2 pl-4"}><i class="ri-dashboard-line pr-2"></i>Dashboard</a></li>
                    {/* <!-- Sub menu parent --> */}
                    <li class="side-menu-item px-lg-2 px-xl-4 "><a href="/polls-admin/polls" className={location.pathname =='/polls-admin/polls'? "pt-2 pl-4 active":"pt-2 pl-4"} ><i class="ri-exchange-funds-fill pr-2" ></i>Polls</a></li>
                    <li class="side-menu-item px-4">
                        <hr style={{backgroundColor: "#f0e8e8"}}/>
                    </li>
                    
{/*                    
                    <li class="side-menu-item px-lg-2 px-xl-4 mb-1"><a href="/polls-admin/users" className={location.pathname=='/polls-admin/users'? "pt-2 pl-4 active":"pt-2 pl-4"} aria-expanded="false" ><i class="ri-pie-chart-2-line pr-2"></i>Users</a></li> */}

                    {/* <!-- Sub menu parent --> */}
                    <li class="side-menu-item px-lg-2 px-xl-4 mb-1"><a href="/polls-admin/polls-analytics" className={location.pathname=='/polls-admin/polls-analytics'? "pt-2 pl-4 active":"pt-2 pl-4"} ><i class="ri-file-chart-line pr-2"></i>Analytics</a></li>
                  
                    {/* <!-- <li class="side-menu-item px-4"><a href="#" class="pt-2 pl-4"><i class="ri-message-3-line pr-2"></i>Messages</a></li> -->
                    <!-- spacer====== --> */}
                    <li style={{height:"calc(100vh/4);"}}>

                    </li>
                    <li class="side-menu-item px-lg-2 px-xl-4 mb-1"><a onClick={()=>{logout()}}  id="logout-btn"  class="pt-2 pl-4"   aria-expanded="true" aria-controls="sub_menu_2"><i class="ri-logout-circle-r-line pr-2"></i>Log Out</a></li>
                  
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