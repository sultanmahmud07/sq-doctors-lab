import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllUsers = () => {
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/users');
      const data = await res.json();
      return data;
    }
  })


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
                <td><button className="btn btn-xs text-white btn-primary">Make Admin</button></td>
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