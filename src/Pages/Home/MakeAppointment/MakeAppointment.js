import React from 'react';
import doctor from '../../../assets/images/doctor.png';
import appointment from '../../../assets/images/appointment.png';
import PraimaryButton from '../../../components/PraimaryButtton/PraimaryButton';
import '../../../commonStyles/style.css';

const MakeAppointment = () => {
  return (
    <section className='my-32'
      style={{
        background: `url(${appointment})`
      }}
    >
      <div className="common-w">
        <div className="flex items-center flex-col lg:flex-row">
          <img src={doctor} className="hidden md:block rounded-lg lg:w-1/2 -mt-36" alt='' />
          <div>
            <div>
              <h4 className='text-primary my-3 font-bold text-xl'>Appointment</h4>
            </div>
            <h1 className="text-5xl text-white font-semibold">Make an appointment Today</h1>
            <p className="py-6 text-base-200">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
            <PraimaryButton>GetStart</PraimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MakeAppointment;