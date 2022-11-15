import { format } from 'date-fns';
import React from 'react';

const BookingModul = ({treatment, setTreatment, selectedDate}) => {
  const {name, slots} =treatment;
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
    setTreatment(null);
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
                        <input name="name" type="text" placeholder="Your Name" className="input w-full input-bordered" required />
                        <input name="email" type="email" placeholder="Email Address" className="input w-full input-bordered" required />
                        <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered" required />
                        <br />
                        <input className='btn btn-accent w-full' type="submit" value="Submit" />
                    </form>
        </div>
      </div>
    </>
  );
};

export default BookingModul;