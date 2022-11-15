import React, { useState } from 'react';
import '../../../commonStyles/style.css';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvailableAppoint from '../AvailableAppoint/AvailableAppoint';

const Appointment = () => {
  const [selectedDate, setSelectedDate] =useState(new Date());

  
  return (
    <div className='common-w'>
      <AppointmentBanner
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      ></AppointmentBanner>

      <AvailableAppoint
       selectedDate={selectedDate}
       setSelectedDate={setSelectedDate}
      ></AvailableAppoint>
    </div>
  );
};

export default Appointment;