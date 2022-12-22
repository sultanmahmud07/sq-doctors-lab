import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({booking}) => {
  const navigate =useNavigate()
  const [cardError, setCardError] =useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState("");


  const stripe =useStripe();
  const elements = useElements();
  const {price, email, patient, _id} =booking;
  // console.log(price);


  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://sq-doctors-lab-server.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
         "Content-Type": "application/json" ,
         authorization: `bearer ${localStorage.getItem('accessToken')}`
        },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if(error){
     setCardError(error.message)
    }
    else{
      setCardError('')
    }

    setSuccess('');
    setProcessing(true)
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
          payment_method: {
              card: card,
              billing_details: {
                  name: patient,
                  email: email
              },
          },
      },
  );

  
  if (confirmError) {
    setCardError(confirmError.message);
    return;
}

  if(paymentIntent.status === "succeeded"){
    setSuccess('Congrats! your payment completed');
    setTransactionId(paymentIntent.id);
    console.log('card info', card);
    //store payment info in the database
    const payment = {
      price,
      transactionId: paymentIntent.id,
      email,
      bookingId: _id
    }
    fetch('https://sq-doctors-lab-server.vercel.app/payments', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(payment)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.insertedId){
        setSuccess('Congrats! your payment completed');
        setTransactionId(paymentIntent.id);
      }
    })
    Swal.fire(
      'Payment Successfully!',
      'You clicked the button!',
      'success'
    )
    // navigate('/dashboard')
  }
  setProcessing(false)
// console.log('confrim', confirmError);

  };

  
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button
       type="submit"
        className="btn btn-warning text-white bg-green-600 w-full mt-12"
         disabled={!stripe || !clientSecret || processing}>
        Pay
      </button>
      <div>
        <p className='text-red-600'>{cardError}</p>
        {
          success && <div>
            <p className='text-green-500'>{success}</p>
            <p>Your transactionId: <span className='font-bold'>{transactionId}</span></p>
          </div>
        }
      </div>
    </form>
  );
};

export default CheckoutForm;