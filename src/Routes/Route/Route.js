import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import AddDoctor from "../../Pages/Dashboard/AddDoctor/AddDoctor";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import ManegeDoctors from "../../Pages/Dashboard/ManageDoctors/ManegeDoctors";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import ConnectUs from "../../Pages/Home/Home/ConnectUs/ConnectUs";
import Home from "../../Pages/Home/Home/Home";
import Testimonials from "../../Pages/Home/Testimonials/Testimonials";
import Login from "../../Pages/Login/Login";
import MyAppointment from "../../Pages/MyAppointment/MyAppointment";
import About from "../../Pages/Shared/About/About";
import Error from "../../Pages/Shared/Error/Error";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router =createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/home',
        element: <Home></Home>
      },
      {
        path: '/connect',
        element: <ConnectUs></ConnectUs>
      },
      {
        path: '/about',
        element: <About></About>
      },
      {
        path: '/appointment',
        element: <Appointment></Appointment>
      },
     
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/reviews',
        element: <Testimonials></Testimonials>
      },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: '/dashboard',
        element: <MyAppointment></MyAppointment>
      },
      {
        path: '/dashboard/allusers',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: '/dashboard/adddoctor',
        element: <AdminRoute><AddDoctor></AddDoctor></AdminRoute>
      },
      {
        path: '/dashboard/manegedoctors',
        element: <AdminRoute><ManegeDoctors></ManegeDoctors></AdminRoute>
      },
      {
        path: '/dashboard/payment/:id',
        element: <PrivateRoute><Payment></Payment></PrivateRoute> ,
        loader: ({params}) => fetch(`https://sq-doctors-lab-server.vercel.app/bookings/${params.id}`)
      },
    ]
  }
]);


export default router;