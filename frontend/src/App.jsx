import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import Home from './pages/Home';
import Index from './pages/Index';
import New from './pages/New';
import Show from './pages/Show';
import Edit from './pages/Edit';
import Image from './pages/Image';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar/><Home/><Footer/></>
    },
    {
      path: "/listings",
      element: <><Navbar/><Index/><Footer/></>
    },
    {
      path: "/listings/new",
      element: <><Navbar/><New/><Footer/></>
    },
    {
      path: "/listings/:id",
      element: <><Navbar/><Show/><Footer/></>
    },
    {
      path: "/listings/:id/edit",
      element: <><Navbar/><Edit/><Footer/></>
    },
    {
      path: "/listings/:id/image",
      element: <><Navbar/><Image/><Footer/></>
    }
  ])
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App