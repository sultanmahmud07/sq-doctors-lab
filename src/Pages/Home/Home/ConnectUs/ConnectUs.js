import React from 'react';
import appointment from '../../../../assets/images/appointment.png';

const ConnectUs = () => {
  return (
    <section className='my-32'
      style={{
        background: `url(${appointment})`
      }}
    >
      <div className="common-w">
        <div className='w-full md:max-w-sm lg:w-1/3 mx-auto text-center py-14'>
          <div className='text-center'>
            <h3 className='text-xl font-bold text-primary'>Contact Us</h3>
            <h2 className='text-white font-semibold text-3xl'>Stay connected with us</h2>
          </div>
          <div className="card flex-shrink-0  shadow-2xl">

            <div className="card-body gap-5">
              <div className="form-control">
               
                <input type="email" placeholder="Email adress" className="input input-bordered" />
              </div>
              <div className="form-control">
                
                <input type="text" placeholder="Subject" className="input input-bordered" />
               
              </div>
              <div className="form-control">
                
              <textarea className="textarea" placeholder="Your Text"></textarea>
               
              </div>
              <div className="form-control mt-6">
                
                <input type="submit" value="Submit" className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectUs;