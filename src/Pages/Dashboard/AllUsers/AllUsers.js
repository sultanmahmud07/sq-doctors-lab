import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2'

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://sq-doctors-lab-server.vercel.app/users');
      const data = await res.json();
      return data;
    }
  })



  const handleMakeAdmin = id => {
    fetch(`https://sq-doctors-lab-server.vercel.app/users/admin/${id}`, {
      method: 'PUT',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire(
            'Add admin Successfully!',
            'You clicked the button!',
            'success'
          )
          refetch();
        }
      })

  }

  return (
    <div>
      <h1 className='text-2xl mb-3'>All users here </h1>
      <div className="overflow-x-auto">
        <table className="table w-full">

          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, i) => <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className="btn btn-xs text-white btn-primary">Make Admin</button>}</td>
                <td><button className="btn btn-xs btn-outline btn-error">Delete</button></td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;