import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../../commonStyles/style.css';
import { AuthContext } from '../../../contexts/AuthProvider';


const Navber = () => {
  const {user, logOut} =useContext(AuthContext);
 

  const handleSignOut = () => {
    logOut()
    .then( () => {})
    .catch(error => console.error(error))
    // console.log("clikd");
  }

  const manuItems = <React.Fragment>
    <li><Link className='font-semibold' to="/home">Home</Link></li>
    <li><Link className='font-semibold' to="/about">About</Link></li>
    <li><Link className='font-semibold' to="/appointment">Appointment</Link></li>
    <li><Link className='font-semibold' to="/reviews">Reviews</Link></li>
    <li><Link className='font-semibold' to="/connect">Contact Us</Link></li>
    {
      user?.uid &&  <li><Link className='font-semibold' to="/dashboard">My Appoinment</Link></li>
    }
   {
    user?.uid ?  <li><button onClick={handleSignOut} className='btn btn-outline btn-primary '>Sign Out</button></li> :  <li><Link className='btn btn-outline btn-primary ' to="/login">Login</Link></li>
   }
  </React.Fragment>


  return (
    <div className='shadow-lg mb-5'>
      <div className='common-w'>
        <div className="navbar flex justify-between">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </label>
              <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                {
                  manuItems
                }
              </ul>
            </div>
            <Link to="/" className="text-xl flex items-end "><span className='text-6xl text-primary font-bold'>S</span><span className='text-3xl text-secondary font-bold'>Q</span><span className='font-bold text-2xl'>-Doctors-Lab</span></Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0">
              {
                manuItems
              }
            </ul>
          </div>
          <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </label>
        </div>
      </div>
    </div>
  );
};

export default Navber;