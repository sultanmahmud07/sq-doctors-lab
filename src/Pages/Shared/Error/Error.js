import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import './Error.css';


const Error = () => {
  const {logOut} =useContext(AuthContext);
  const error = useRouteError();
  const navigate = useNavigate();


  const handleSignOut = () => {
    logOut()
    .then( () => {
      navigate('/login')
    })
    .catch(error => console.error(error))
    // console.log("clikd");
  }
  // console.log(error);
  return (
    <div className='container text-center'>
      <div className="error-box">
        <h1><span className='ops'>Ops!!</span> An Error Ocurred !</h1>
        {error && (
            <div>
              <span className='not-f'>{error.statusText || error.message}</span>
              <br>
              </br><span className='num '>{error.status}</span>
              <h4 className='text-xl text-primary'>Please <button onClick={handleSignOut} className='btn btn-outline btn-primary '>Sign Out</button> and log back in</h4>
            </div>
          )}
      </div>
    </div>
  );
};

export default Error;