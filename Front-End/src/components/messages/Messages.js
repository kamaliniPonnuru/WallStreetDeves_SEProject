import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';

function Messages() {
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [recipient, setRecipient] = useState('');
    const [content, setContent] = useState('');
    const user = useSelector((state) => state.user);
    const pageSize = 10; 
    const { userObj } = useSelector((state) => state.user);

    useEffect(() => {
        fetchReceivedMessages();
    }, [currentPage]);

    const fetchReceivedMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/messages/${user.id}?page=${currentPage}&pageSize=${pageSize}`);
            setReceivedMessages(response.data.messages);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching received messages:', error);
        }
    };

    const handleSubmit = async (e) => {
        try {
            await axios.post(`http://localhost:4000/send-message`, {
                sender: userObj.username,
                recipient,
                content
            });
            // After sending the message, refresh the list of received messages
            fetchReceivedMessages();
            // Reset form fields
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
            {/* Message Form */}
            <p>HEllO.........</p>
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
                    <Button variant="primary" type="submit">Send</Button>
                </Form>
            </div>

            {/* Received Messages */}
            <div className="card p-4">
                <h2 className="mb-4">Received Messages</h2>
                <ul className="list-group">
                    {receivedMessages.map((message) => (
                        <li key={message.id} className="list-group-item">
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
    );
}

export default Messages;
