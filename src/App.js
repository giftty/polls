
import './App.css';
import Layout from './components/layout.js';
import Home from './components/home.js';
import {SignUp} from './components/signup.js'
import {Login} from './components/login.js'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { PollDashboard } from './components/polladminlayout.js';
import { Dashboard } from './components/dashboard.js';
import { PollEventLayout } from './components/polls_eventlayout.js';
import { PollsEvent } from './components/polls_event.js';
import {MultichiocePolls} from './components/polls_types.js'
import { CardGenerator } from './components/cardgenerator.js';
import { PollsDisplay } from './components/polls-display.js';
import { Polls_analytics } from './components/poll-analytics.js';
import { Allpolls } from './components/allpolls.js';
import { Allusers } from './components/allusers.js';
import { ErrorComponent } from './components/errorcomponet.js';
import { Pollsearch } from './components/pollssearch.js';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement:<ErrorComponent errmessage="An error has occurred please try again"/>,
    children:[
     {
      index:true,
      element : <Home/>,
      errorElement:<ErrorComponent errmessage="An error has occurred please try again"/>,
     },
     {
    path: "/signup",
    element:<SignUp/>,
    errorElement:<ErrorComponent errmessage="An error has occurred please try again"/>,
   },
  {
    path: "/login",
    element:<Login/>,
    errorElement:<ErrorComponent errmessage="An error has occurred please try again"/>,
  }, {
  path: '/polls-search',
   element:<Pollsearch/>,
   errorElement: <ErrorComponent errmessage="An error has occurred please try again"/>

  }
    ]
  },
  {
  path:'/polls-admin',
  element:<PollDashboard/>,
  errorElement:<ErrorComponent errmessage="An error has occurred please try again"/>,
  children:[
   {
     index:true,
     element:<Dashboard/>,
      errorElement:<ErrorComponent errmessage="An error has occurred please try again"/>
   },
   {
     path:'polls',
     element:<Allpolls></Allpolls>,
      errorElement:<ErrorComponent errmessage="An error has occurred please try again"/>
   },
   {
     path:'users',
     element:<Allusers/>,
      errorElement:<ErrorComponent errmessage="An error has occurred please try again"/>,
   }
  ]
  },
  {
     path:'polls-analytics',
     element:<PollEventLayout/>,
      errorElement:<ErrorComponent/>,
       errorElement:<ErrorComponent errmessage="An error has occurred please try again"/>,
     children : [
      {
         index:true,
        element:<Polls_analytics></Polls_analytics>,
         errorElement:<ErrorComponent errmessage="An error has occurred please try again"/>,
      }
    ]
   },
  {
    path:'/polls-events',
    element:<PollEventLayout/>,
    errorElement:<ErrorComponent errmessage="An error has occured"/>,
     errorElement:<ErrorComponent errmessage="An error has occurred please try again"/>,
    children:[
        {
          index:true,
          element: <PollsEvent/>,
           errorElement:<ErrorComponent errmessage="An error has occurred please try again"/>,
        },
        {
          path:'/polls-events/multichioce',
          element:<MultichiocePolls/>,
           errorElement:<ErrorComponent errmessage="An error has occurred please try again"/>,
        }
    ]
  },{
    path: '/polls-display',
    element:<PollEventLayout/>,
     errorElement:<ErrorComponent errmessage="An error has occurred please try again"/>,
   children:[
    {
      index:true ,
     element:<PollsDisplay></PollsDisplay>,
      errorElement:<ErrorComponent errmessage="An error has occurred please try again"/>
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


