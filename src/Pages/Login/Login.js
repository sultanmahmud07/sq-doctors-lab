import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../commonStyles/style.css';
import { AuthContext } from '../../contexts/AuthProvider';
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToken from '../../hooks/UseToken';

const Login = () => {
  const [error, setError] = useState('')
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [loginUserEmail, setLoginUserEmail] = useState('');
  const [googleUserEmail, setGoogleUserEmail] = useState('');
  const [token] = useToken(loginUserEmail);
  const [tokenGoogle] = useToken(googleUserEmail);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  if (token) {
    navigate(from, { replace: true })
  }
  
  if (tokenGoogle) {
    navigate(from, { replace: true })
  }

  const handleLogin = data => {
    data.preventDefault()
    const form = data.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then(result => {
        setLoginUserEmail(email);

        setError('')
        form.reset()


        Swal.fire(
          'Login Successfully!',
          'You clicked the button!',
          'success'
        )

      })
      .catch(error => {
        console.error(error);
        setError(error.message)
      })
    // console.log(email, password);
  }



  const handleGoogleSignIn = () => {
    googleSignIn()
    .then(result => {
      console.log(result.user);
      setGoogleUserEmail(result?.user?.email)

      Swal.fire(
        'Login Successfully!',
        'You clicked the button!',
        'success'
      )
    })
    .then(error =>{
      console.error(error);

    })

  }



  return (
    <div className='common-w'>
      <div className='h-screen flex justify-center items-center'>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl ">
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <div>
                <h3 className='text-2xl font-semibold text-center pb-5'>Login</h3>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input type="email" name='email' required className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <input type="password" name='password' required className="input input-bordered" />
                <label className="label">
                  <span className="label-text font-semibold text-red-700">{error}</span>
                </label>
                <label className="label">
                  <Link to='/' className="label-text-alt link link-hover">Forgot password?</Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <input type="submit" className="btn btn-neutral" value="Login" />
              </div>
            </form>
            <div>
              <div className='text-center p-1 text-sm'>
                <span>New to Doctors Portal?</span><span><Link to='/signup' className='text-secondary font-semibold'>Create new account</Link></span>
              </div>
              <div className="divider">OR</div>
              <button onClick={handleGoogleSignIn} className="btn btn-outline btn-accent w-full">CONTINUE WITH GOOGLE</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;