import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleSigiUp = (data) => {
    console.log(data);
    console.log(errors);

  }
  return (
    <div className='common-w'>
      <div className='h-screen flex justify-center items-center'>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl ">
          <div className="card-body">
            <div>
              <h3 className='text-2xl font-semibold text-center pb-5'>Sign Up</h3>
            </div>

            <form onSubmit={handleSubmit(handleSigiUp)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Name</span>
                </label>
                <input type="text"{...register("name", { required: true })} className="input input-bordered" />
                {errors.name && <span className='text-red-700'>Please provited your name</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input type="email" {...register("email", { required: true })} className="input input-bordered" />
                {errors.email && <span className='text-red-700'>Please provited your email</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <input type="password" {...register("password", { required: "passwrod in required", minLength: {value: 8, message: "password must be 8 cherecters long"},  pattern:{value:  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/, message: 'password must be strong' }})} className="input input-bordered" />
                {errors.password && <span className='text-red-700'>{errors.password.message}</span>}
              </div>

              <div className="form-control mt-6">
                <input type="submit" className="btn btn-neutral" value="SignUp" />
              </div>
            </form>


            <div>
              <div className='text-center p-1 text-sm'>
                <span>Already have an account?</span><span><Link to='/login' className='text-secondary font-semibold'>Please login</Link></span>
              </div>
              <div className="divider">OR</div>
              <button className="btn btn-outline btn-accent w-full">CONTINUE WITH GOOGLE</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUp;