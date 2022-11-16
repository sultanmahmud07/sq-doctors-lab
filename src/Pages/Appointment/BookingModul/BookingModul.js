import { format } from 'date-fns';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BookingModul = ({treatment, setTreatment, refetch, selectedDate}) => {
  const {name, slots} =treatment;
  const {user} =useContext(AuthContext);
  const date =format(selectedDate, 'PP')


  const handleBooking = event => {
    event.preventDefault();
    const form =event.target;
    const slot =form.slot.value;
    const patientName =form.name.value;
    const email =form.email.value;
    const phone =form.phone.value;

    const booking = {
      appointmentDate: date,
      treatment: name,
      patient: patientName,
      slot,
      email,
      phone,
    }
    console.log(booking);
    // add appointment success msg
    fetch('http://localhost:5000/bookings', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(booking)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
     if(data.acknowledged){
      setTreatment(null);
      Swal.fire(
        'Congratulation!',
        'You Booking Successfully!',
        'success'
      )
      refetch();
     }
     else{
      Swal.fire(
        'Alarted!',
        `${data.message}`,
        'error'
      )
     }

    })


  }
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold">{name}</h3>
          <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" disabled value={date} className="input w-full input-bordered " />
                        <select name="slot" className="select select-bordered w-full">
                            {
                                slots.map((slot, i) => <option
                                    value={slot}
                                    key={i}
                                >{slot}</option>)
                            }
                        </select>
                        <input name="name" defaultValue={user?.displayName} readOnly type="text" placeholder="Your Name" className="input w-full input-bordered" required />
                        <input name="email" defaultValue={user?.email} readOnly type="email" placeholder="Email Address" className="input w-full input-bordered" required />
                        <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered" required />
                        <br />
                        <input className='btn btn-accent w-full' type="submit" value="Submit" />
                    </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default BookingModul;