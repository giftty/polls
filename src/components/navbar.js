
import React, { Component } from 'react';
import { Nav,Container, Row, Col  } from 'bootstrap-4-react';

export const Navbar = ()=>{

 return(
  <>
	<div class="navigation-wrap bg-white shadow-sm start-header start-style">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<nav class="navbar navbar-expand-md navbar-light">
					
						<a class="navbar-brand" href="#" target="_blank"><img src="/images/POLLs.png" alt=""/></a>	
						
						<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span class="navbar-toggler-icon"></span>
						</button>
						
						<div class="collapse navbar-collapse" id="navbarSupportedContent">
							<ul class="navbar-nav ml-auto py-4 py-md-0">
								<li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4 active">
									<a class="nav-link"  href="#" role="button" >Home</a>
									
								</li>
								<li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
									<a class="nav-link" href="#">Polls</a>
								</li>
								<li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
									<a class="nav-link" href="#">How is works</a>
								</li>
								<li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
									<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Contact/FAQ</a>
									<div class="dropdown-menu">
										<a class="dropdown-item" href="#">Contact Us</a>
										<a class="dropdown-item" href="#">FAQ</a>
									</div>
								</li>
								<li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
									<a className="nav-link " href="#" > GET STARTED</a>
								</li>
								<li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
									<a class="nav-link " href="#">LOGIN IN</a>
								</li>
							</ul>
						</div>
						
					</nav>		
				</div>
			</div>
		</div>
	</div>
 </>
 )
}