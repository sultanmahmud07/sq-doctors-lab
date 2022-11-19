import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import Swal from 'sweetalert2';

const AddDoctor = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const imgHostKey = process.env.REACT_APP_imgbb_key;
  const navigate = useNavigate()
  // console.log(imgHostKey);

  const { data: specialties, isLoading } =useQuery({
    queryKey: ['specialty'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/appointmentSpecialty');
      const data = await res.json();
      return data;
    }
  })

  if(isLoading){
    return <Loading></Loading>
  }



  //image hosting hendle>>>>>
  const handleAddDoctor = data => {
    const image =data.image[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(imgData => {
      if(imgData.success){
        // console.log(imgData.data.url);
        const doctor = {
          name: data.name,
          email: data.email,
          specialty: data.specialty,
          image: imgData.data.url
        }
        // save doctor information to the database
        fetch('http://localhost:5000/doctors', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            authorization:  `bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify(doctor)
        })
        .then(res => res.json())
        .then(result => {
          console.log(result);
          Swal.fire(
            `Your ${data.name} added successfully`,
            'You clicked the button!',
            'success'
          )
          navigate('/dashboard/manegedoctors')
        })
      }
    })
  }
  return (
    <div className='bg-gray-100 h-screen'>
      <h2 className='text-2xl'>Add Doctors</h2>
      <div className='flex justify-center items-center'>
        <form onSubmit={handleSubmit(handleAddDoctor)} className='max-w-md rounded-xl shadow-2xl card-body bg-white'>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Name</span>
            </label>
            <input type="text" {...register("name", { required: true })} className="input input-bordered" />
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
              <span className="label-text font-semibold">Specialty</span>
            </label>
            <select className="select select-bordered w-full " {...register("specialty")}>
              
             {
              specialties.map(specialty => <option
              key={specialty._id}
              value={specialty.name}
              >{specialty.name}</option>)
             }
              
            </select>

          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Photo</span>
            </label>
            <input type="file" {...register("image", { required: true })} className="input input-bordered" />
            {errors.image && <span className='text-red-700'>Please provited your photo</span>}
          </div>

          <div className="form-control mt-6">
            <input type="submit" className="btn btn-neutral" value="Add Doctor" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;