import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingModul from '../BookingModul/BookingModul';
import AppointmentOptions from './AppointmentOptions';

const AvailableAppoint = ({ selectedDate }) => {
  const [appointmentOptions, setAppointmentOptions] = useState([]);
  const [treatment, setTreatment] =useState(null);


  useEffect(() => {
    fetch('appointOptions.json')
    .then(res => res.json())
    .then (data => setAppointmentOptions(data))
  },[])

  return (
    <section className='my-10'>
      <div>
        <p className='text-secondary font-bold text-center md:py-10'>Available Appointments on {format(selectedDate, 'PP')}</p>
      </div>
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
        {
          appointmentOptions.map(option => <AppointmentOptions
            key={option._id}
            appointmentOption={option}
            setTreatment={setTreatment}
          ></AppointmentOptions>)
        }
      </div>
      {
        treatment && 
        <BookingModul
        selectedDate={selectedDate}
        treatment={treatment}
        setTreatment={setTreatment}
      ></BookingModul>
      }
    </section>
  );
};

export default AvailableAppoint;