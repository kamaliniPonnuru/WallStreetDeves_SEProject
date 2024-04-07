import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
    <div className="container mt-5">
      <h1 className="mb-4">Events</h1>
      <div className='container mt-3' style={{ textDecoration: 'none' }}>
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
          <li key={event._id} className="list-group-item">
            <h3>{event.event_name}</h3>
            <p>Location:{event.location}</p>
            <p>Time: {event.dateTime}</p>
            <button className="btn btn-primary mr-2" onClick={() => handleEditEvent(event)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDeleteEvent(event._id)}>Delete</button>
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
  );
};

export default Events;
