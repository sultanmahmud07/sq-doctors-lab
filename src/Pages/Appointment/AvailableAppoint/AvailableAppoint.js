import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import BookingModul from '../BookingModul/BookingModul';
import AppointmentOptions from './AppointmentOptions';

const AvailableAppoint = ({ selectedDate }) => {
  // const [appointmentOptions, setAppointmentOptions] = useState([]);
  const [treatment, setTreatment] =useState(null);
  const date = format(selectedDate, 'PP');

//3 number option >>>>>>
const {data: appointmentOptions = [], refetch, isLoading } = useQuery({
  queryKey: ['appointmentOptions', date],
  queryFn: async() => {
    const res = await fetch(`http://localhost:5000/appointmentOptions?date=${date}`);
    const data = await res.json();
    return data
  }
});

if(isLoading){
  return <Loading></Loading>
}


// 2 number option >>>>>>>>
// const {data:appointmentOptions = []} = useQuery({
//   queryKey: () => fetch('http://localhost:5000/appointmentOptions')
//   .then(res => res.json())
// })



// 1 number option >>>>>>
  // useEffect(() => {
  //   fetch('http://localhost:5000/appointmentOptions')
  //   .then(res => res.json())
  //   .then (data => setAppointmentOptions(data))
  // },[])

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
        refetch={refetch}
      ></BookingModul>
      }
    </section>
  );
};

export default AvailableAppoint;