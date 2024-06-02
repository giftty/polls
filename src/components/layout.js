
import { Outlet } from "react-router-dom"
import {Navbar} from "./navbar"
import "./layout.css"
export default function Layout(){
  
 return(
  <div className="main-body" >
   <div>
   <Navbar> </Navbar>
   </div>
   <Outlet>
   
   </Outlet>
  </div>
 )

}