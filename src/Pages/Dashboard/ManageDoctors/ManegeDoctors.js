import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';
import Swal from 'sweetalert2';

const ManegeDoctors = () => {
  const [deleteingDoctor, setDeleteingDoctor] = useState(null);


  const { data: doctors, isLoading, refetch } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      try {
        const res = await fetch('http://localhost:5000/doctor', {
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        })
        const data = await res.json();
        return data;
      }
      catch (error) {

      }
    }
  })



  const cencelModal = () => {
    setDeleteingDoctor(null)
  };

  const handleDeleteDoctor = doctor =>{
   fetch(`http://localhost:5000/doctors/${doctor._id}`, {
    method: 'DELETE',
    headers: {
      authorization: `bearer ${localStorage.getItem('accessToken')}`
    }
   })
   .then(res => res.json())
   .then(data => {
    if(data.deletedCount > 0){
      refetch();
      Swal.fire(
        `Doctor ${doctor.name} deleted successfully`,
        'You clicked the button!',
        'success'
      )

    }
   })
  // console.log('click');
  }

  if(isLoading){
    return <Loading></Loading>
  };


  return (
    <div>
      <h1 className='text-2xl mb-3'>Manage Doctors</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">

          <thead>
            <tr>
              <th>NO</th>
              <th>AVATAR</th>
              <th>NAME</th>
              <th>SPECIALITY</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {
              doctors.map((doctor, i) => <tr key={doctor._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={doctor.image} alt='' />
                    </div>
                  </div>
                </td>
                <td>{doctor.name}</td>
                <td>{doctor.specialty}</td>
                <td>
                  <label onClick={() => setDeleteingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-secondary bg-red-600 text-white">Delete</label>
                </td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
      {
        deleteingDoctor && <ConfirmationModal
        title={`Are you sure you want to delete?`}
        message={`If you delete ${deleteingDoctor.name}. It cannot be undon`}
        closeModal={cencelModal}
        successAction={handleDeleteDoctor}
        successButton={`Delete`}
        modalData={deleteingDoctor}
        ></ConfirmationModal>
      }
    </div>
  );
};

export default ManegeDoctors;