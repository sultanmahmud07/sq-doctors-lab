import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51M6Tg0KoUnV4do3chUFyrqxVX3DgYxI1CcBgRfRNvtaqkbMDGNuKVxIpFxSpLKCWx9gBy7YW5Q3lgOsHuHkC00r100YSEgv0OX');
  

const Payment = () => {
  const booking = useLoaderData();
  const navigation = useNavigation();
  const { appointmentDate, price, treatment, slot } = booking;
  // console.log(booking);

  if(navigation.state === "loading"){
    return <Loading></Loading>
  }

  return (
    <div className='w-full md:w-1/2 border rounded-md p-10 mx-auto shadow-lg md:mt-8'>
      <h1 className='text-3xl text-green-600 mb-4 font-bold'>Payment of {treatment}</h1>
      <h2 className='text-xl'>Please pay <strong>${price}</strong> for your appointment on {appointmentDate} at {slot}</h2>
      <div className='lg:w-11/12 mx-autho border mx-auto my-12'>
        <div className='card-body'>
          <Elements stripe={stripePromise}>
            <CheckoutForm
            booking={booking}
             />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;