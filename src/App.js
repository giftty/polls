
import './App.css';
import Layout from './components/layout.js';
import Home from './home.js';
import {SignUp} from './signup.js'
import {Login} from './login.js'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { PollDashboard } from './polladmin.js';
import { Dashboard } from './dashboard.js';



const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout/>,
    children:[
     {
      path: "/home",
      element : <Home/>
     },
     {
    path: "/signup",
    element:<SignUp/>,
   },
  {
    path: "/login",
    element:<Login/>,
  }
    ]
  },
  {
  path:'/polls-admin',
  element:<PollDashboard/>,
  children:[
   {
     path:'dashboard',
     element:<Dashboard/>
   },
   {
     path:'polls',
     element:<></>
   }
  ]
  }
  
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
  return <RouterProvider router={router} fallbackElement={<Fallback />} />;
}


export function Fallback() {
  return <div style={{display:"inline-flex"}}><img className='blinking' src="public/images/POLLs.png"/></div>;
}


