import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const MyAppointment = () => {
  const { user } = useContext(AuthContext);
  const url = `https://sq-doctors-lab-server.vercel.app/bookings?email=${user?.email}`

  const { data: bookings = [] } = useQuery({
    queryKey: ['bookings', user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await res.json();
      // console.log(data);
      return data;
    }
  })


  return (
    <div>
      <h2 className='text-2xl mb-3'>My Appointment</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">

          <thead>
            <tr>
              <th>No:</th>
              <th>Name</th>
              <th>Treatment</th>
              <th>Date</th>
              <th>Time</th>
              <th>Prement</th>
            </tr>
          </thead>
          <tbody>
            {
              bookings.map((booking, i) => <tr key={booking._id}>
                <th>{i + 1}</th>
                <td>{booking.patient}</td>
                <td>{booking.treatment}</td>
                <td>{booking.appointmentDate}</td>
                <td>{booking.slot}</td>
                <td>
                  {
                    booking?.price && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}><button className='btn but-green text-white bg-blue-600 btn-sm hover:bg-warning'>Pay</button></Link>
                  }
                  {
                    booking?.price && booking.paid && <button className=' text-white bg-green-600 btn-sm '>Paid</button>
                  }
                </td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointment;