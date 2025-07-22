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
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

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
      element: (
        <ProtectedRoute>
          <><Navbar /><New /><Footer /></>
        </ProtectedRoute>
      )
    },
    {
      path: "/listings/:id",
      element: (
        <ProtectedRoute>
          <><Navbar/><Show/><Footer/></>
        </ProtectedRoute>
      )
    },
    {
      path: "/listings/:id/edit",
      element: <><Navbar/><Edit/><Footer/></>
    },
    {
      path: "/listings/:id/image",
      element: <><Navbar/><Image/><Footer/></>
    },
    {
      path: "/listings/signup",
      element: <><Navbar/><Signup/><Footer/></>
    },
    {
      path: "/listings/login",
      element: <><Navbar/><Login/><Footer/></>
    },
  ])
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App