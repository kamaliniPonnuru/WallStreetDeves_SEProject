import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });

  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/contactus-api/send-inquiry', formData);
      setAlertMessage('Message sent successfully');
      alert("Message Sent Successfully")
    } catch (error) {
      console.error('Error sending message:', error);
      setAlertMessage('Failed to send message');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ color: '#003366', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Contact Us</h1>
      {alertMessage && (
        <div className="alert alert-success" role="alert">
          {alertMessage}
        </div>
      )}
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
        Welcome to AlmaMingle, the premier blog post website for alumni of the University of North Texas (UNT). We are dedicated to connecting UNT graduates, sharing stories, and fostering a vibrant community. Whether you have questions, feedback, or just want to share your journey since graduation, we're here to listen.
      </p>

      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ color: '#003366', fontSize: '1.8rem', marginBottom: '1rem' }}>Address:</h2>
        <address style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          University of North Texas<br />
          1155 Union Circle #311277<br />
          Denton, Texas 76203-5017
        </address>

        <h2 style={{ color: '#003366', fontSize: '1.8rem', marginTop: '2rem', marginBottom: '1rem' }}>Email:</h2>
        <p style={{ fontSize: '1.1rem' }}>
          <a href="mailto:info@almamingle.com" style={{ color: '#003366', textDecoration: 'none' }}>info@almamingle.com</a>
        </p>

        <h2 style={{ color: '#003366', fontSize: '1.8rem', marginTop: '2rem', marginBottom: '1rem' }}>Phone:</h2>
        <p style={{ fontSize: '1.1rem' }}>(555) 123-4567</p>

        <h2 style={{ color: '#003366', fontSize: '1.8rem', marginTop: '2rem', marginBottom: '1rem' }}>Social Media:</h2>
        <p style={{ fontSize: '1.1rem' }}>
          Follow us on <a href="#" style={{ color: '#003366', textDecoration: 'none' }}>Facebook</a>,{' '}
          <a href="#" style={{ color: '#003366', textDecoration: 'none' }}>Twitter</a>,{' '}
          <a href="#" style={{ color: '#003366', textDecoration: 'none' }}>LinkedIn</a>
        </p>

        <h2 style={{ color: '#003366', fontSize: '1.8rem', marginTop: '2rem', marginBottom: '1rem' }}>Contact Form:</h2>
        <form style={{ textAlign: 'left' }} onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', marginBottom: '1rem' }}
          />
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', marginBottom: '1rem' }}
          />
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Subject:</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', marginBottom: '1rem' }}
          >
            <option value="general">General Inquiry</option>
            <option value="feedback">Feedback</option>
            <option value="submission">Alumni Story Submission</option>
            <option value="other">Other</option>
          </select>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', marginBottom: '1rem', minHeight: '150px' }}
          ></textarea>
          <button
            type="submit"
            style={{
              backgroundColor: '#003366',
              color: '#fff',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1.1rem',
              cursor: 'pointer'
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
