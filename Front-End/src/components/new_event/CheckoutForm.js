import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CheckoutForm = ({ onSuccess, event}) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { userObj } = useSelector((state) => state.user); // Access userObj from Redux
  const bookingCost = 10;
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [totalAmount, setTotalAmount] = useState(100);

  useEffect( () => {
     console.log("event is ", event);
     console.log("user is ", userObj);
     setTotalAmount(bookingCost);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      setLoading(false);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      // Send the payment method ID to your server to complete the payment
      try {
        const response = await axios.post('YOUR_SERVER_ENDPOINT', {
          payment_method_id: paymentMethod.id,
          amount: totalAmount, // Example amount in cents
          event: event,
          currency: 'usd', // Example currency
        });
        console.log(response.data);
        setLoading(false);
        onSuccess(); // Call onSuccess callback to close the dialog
      } catch (error) {
        console.error('Error processing payment:', error);
        setLoading(false);
      }
    }
  };

  const handleTicketChange = (e) => {
    const newNumberOfTickets = parseInt(e.target.value);
    if (!isNaN(newNumberOfTickets) && newNumberOfTickets > 0 && newNumberOfTickets <= 5) {
      setNumberOfTickets(newNumberOfTickets);
      setTotalAmount(bookingCost * newNumberOfTickets);
    }
  };

  return (
    // <>
    // <h3>Hello, {userObj.name}</h3>
    // <p>Booking Amount: ${bookingCost}</p>
    //   <label htmlFor="numberOfTickets">Number of Tickets:</label>
    //   <input
    //     type="number"
    //     id="numberOfTickets"
    //     min="1"
    //     max="5"
    //     value={numberOfTickets}
    //     onChange={handleTicketChange}
    //   />
    //   <p>Enter your payment details:</p>
    // <form onSubmit={handleSubmit}>
    //   <CardElement
    //     options={{
    //       style: {
    //         base: {
    //           fontSize: '16px',
    //           color: '#424770',
    //           '::placeholder': {
    //             color: '#aab7c4',
    //           },
    //         },
    //         invalid: {
    //           color: '#9e2146',
    //         },
    //       },
    //     }}
    //   />
    //   <p>Total Amount: ${totalAmount}</p> {/* Display total amount */}
    //   <button type="submit" disabled={!stripe || loading}>
    //     {loading ? 'Processing...' : 'Pay'}
    //   </button>
    // </form>
    // </>


    <div className="container mt-4">
      <h3>Hello, {userObj.name}</h3>
      <p>Booking Amount: ${bookingCost}</p>
      <div className="mb-3">
        <label htmlFor="numberOfTickets" className="form-label">Number of Tickets:</label>
        <input
          type="number"
          id="numberOfTickets"
          min="1"
          max="5"
          value={numberOfTickets}
          onChange={handleTicketChange}
          className="form-control"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <p>Enter your payment details:</p>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#192059',
                '::placeholder': {
                  color: '#000000',
                },
                border: '1px solid #000000',
              },
              invalid: {
                color: '#b01946',
              },
            },
          }}
          className="form-control"
        />
        <p>Total Amount: ${totalAmount}</p>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="btn btn-primary"
        >
          {loading ? 'Processing...' : 'Pay'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
