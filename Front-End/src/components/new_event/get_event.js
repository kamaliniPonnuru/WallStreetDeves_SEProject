import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './new_event.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';


const stripePromise = loadStripe('');

const Events = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { userObj } = useSelector((state) => state.user); // Access userObj from Redux

  const openPaymentDialog = (event) => {
    setSelectedEvent(event);
    console.log(event);
    setShowPaymentDialog(true);
  };

  const closePaymentDialog = () => {
    setShowPaymentDialog(false);
  };

  const buttonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/event-api/events?visibility=public&page=${currentPage}`);
        console.log(response)
        setEvents(response.data.payload.events);
        setTotalPages(response.data.payload.totalPages);
        console.log(response)
        console.log("user_id is " + userObj._id);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleEditEvent = (event) => {
    // Logic to handle editing the event
    console.log("Editing event:", event);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:4000/event-api/events/${eventId}`);
      // Update the events list after deletion
      const updatedEvents = events.filter(event => event._id !== eventId);
      setEvents(updatedEvents);
      alert("Event is deleted")
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (

    <>

      <div className="container mt-5">
        <h1 className="mb-4">Events</h1>
        <div className='container mt-3' style={{ textDecoration: 'none', marginBottom: 20 }}>
          <div className='col-12'>
            {/* <div className='col-10'></div> */}
            <div >
              <Link to="/new-event" style={{ textDecoration: 'none', marginLeft: 'auto' }}>
                <button style={buttonStyle}>
                  <span>Add new Event</span>
                  <span style={{ marginLeft: '5px' }}>+</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <ul className="list-group">
          {events.map(event => (
            <li key={event._id} className="list-group-item mb-3 mt-3">
              <div className="event-details">
                <h3>{event.event_name}</h3>
                <p>Location:{event.location}</p>
                <p>Time: {event.dateTime}</p>

              </div>
              <div className="event-image">
                <img src={event.image_url} alt="Event" style={{height:150, width:200}} />
              </div>
              <div className="buttons" style={{ marginTop: '10px' }}>
                <button className="btn btn-primary mr-6" onClick={() => openPaymentDialog(event)}>
                  <span>Book Tickets</span>
                </button>
                <Modal show={showPaymentDialog} onHide={closePaymentDialog}>
                  <Modal.Header closeButton>
                    <Modal.Title>Booking Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Elements stripe={stripePromise}>
                      <CheckoutForm onSuccess={closePaymentDialog} event={selectedEvent} />
                    </Elements>
                  </Modal.Body>
                </Modal>

                {userObj._id === event.userId && (
                  <>
                    <button className="btn btn-primary mr-6" onClick={() => handleEditEvent(event)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                  </>
                )}
              </div>
            </li>

          ))}
        </ul>
        {/* Pagination */}
        <nav className="mt-4">
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
              <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Events;
