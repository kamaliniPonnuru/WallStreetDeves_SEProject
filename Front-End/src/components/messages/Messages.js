import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import './Messages.css';

function Messages() {
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [recipient, setRecipient] = useState('');
    const [content, setContent] = useState('');
    const [allMessages, setAllMessages] = useState([]);
    const pageSize = 10;
    const { userObj } = useSelector((state) => state.user);

    useEffect(() => {
        fetchReceivedMessages();
        fetchMessagesFromBackend();
    }, [currentPage]);

    const fetchReceivedMessages = async () => {
        try {
            const user = userObj.username;
            const response = await axios.get(`http://localhost:4000/message-api/messages/${user}?page=${currentPage}&pageSize=${pageSize}`);
            console.log(response);
            setReceivedMessages(response.data.messages);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching received messages:', error);
        }
    };

    const fetchMessagesFromBackend = async () => {
        try {
            const response = await axios.get('http://localhost:4000/broadcast-api/all-messages');
            console.log(response);
            // Store the response data in an array
            setAllMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages from backend:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/message-api/send-message', {
                sender: userObj.username,
                recipient,
                content
            });
            if (response.data.message === "Message sent successfully") {
                alert("Message sent successfully");
            }
            fetchReceivedMessages();
            setRecipient('');
            setContent('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 mb-4">
                <h2 className="mb-4">Compose Message</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="recipient">
                        <Form.Label>Recipient</Form.Label>
                        <Form.Control type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="content">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">Send Message</Button>
                </Form>
            </div>

            {/* Received Messages */}
            <div className="row">
                <div className='col-6'>
                    <div className="card p-4">
                        <h2 className="mb-4">Received Messages from users</h2>
                        <ul className="list-group received-messages">
                            {receivedMessages.map((message, index) => (
                                <li key={message.id} className={`list-group-item mb-3 ${index !== 0 ? 'border-top' : ''}`}>
                                    <strong>From:</strong> {message.sender} <br />
                                    <strong>Message:</strong> {message.content}
                                </li>
                            ))}
                        </ul>
                        <Pagination className="mt-4">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Pagination.Item key={page} active={page === currentPage} onClick={() => handlePageChange(page)}>
                                    {page}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </div>
                </div>
                <div className='col-6'>
                    <div className="card p-4">
                        <h2 className="mb-4">Message from Admin</h2>
                        <ul className="list-group received-messages">
                            {allMessages.map((message, index) => (
                                <li key={message.id} className={`list-group-item mb-3 ${index !== 0 ? 'border-top' : ''}`}>
                                    <strong>Message:</strong> {message.message}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messages;
