import React from 'react';
import { useRouteError } from 'react-router-dom';
import './Error.css';


const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div className='container text-center'>
      <div className="error-box">
        <h1><span className='ops'>Ops!!</span> An Error Ocurred !</h1>
        {error && (
            <div>
              <span className='not-f'>{error.statusText || error.message}</span>
              <br>
              </br><span className='num '>{error.status}</span>
            </div>
          )}
      </div>
    </div>
  );
};

export default Error;