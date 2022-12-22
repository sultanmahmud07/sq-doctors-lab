import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useToken from '../../../hooks/UseToken';

const GoogleLogin = () => {
  const {googleSignIn} =useContext(AuthContext);
  const [googlUserEmail, setGoogleUserEmail] = useState('');
  const [token] =useToken(googlUserEmail);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  if(token){
    navigate(from, {replace: true});
  }
  const handleGoogle = () => {
    googleSignIn()
    .then(result => {
      const user = result.user;
      console.log(user);
      // setGoogleUserEmail(user?.email)
      const name =user.displayName
      const email =user.email
      const role = 'buyer'
      saveUser(name, email, role)
      
      toast('Google Login Successfully')
    })
    .catch(error => {
      console.log(error)
    })
  }



  // Post user information in database >>>>>>>
  const  saveUser = (name, email, role) => {
    const  user = {name, email, role};
    fetch('https://final-project-server-zeta.vercel.app/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log('save user', data);
      setGoogleUserEmail(email)
      // getUserToken(email)
      
  
    })
  }


  return (
    <div>
      <button onClick={handleGoogle} className="btn btn-outline btn-primary w-full">CONTINUE WITH GOOGLE</button>
    </div>
  );
};

export default GoogleLogin;