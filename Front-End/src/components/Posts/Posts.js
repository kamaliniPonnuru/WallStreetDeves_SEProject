import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewType, setViewType] = useState('all'); // Default view type is 'all'
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPost, setEditPost] = useState({});
  const { userObj } = useSelector((state) => state.user); // Access userObj from Redux

  useEffect(() => {
    fetchPosts();
  }, [currentPage, viewType]);

  const fetchPosts = async () => {
    try {
      let url = 'http://localhost:4000/post-api/posts';
      let createdByParam = '';
      if (viewType === 'my') {
        createdByParam = `?createdBy=${userObj.name}`;
      } else if (viewType === 'all') {
        createdByParam = `?excludeCreatedBy=${userObj.name}`;
      }
      url += `${createdByParam}&page=${currentPage}`;
      const response = await axios.get(url);
      setPosts(response.data.payload.posts);
      setTotalPages(response.data.payload.totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDeletePost = async (postId) => {
    try {
      console.log(postId);
      await axios.delete(`http://localhost:4000/post-api/delete-post/${postId}`);
      // Assuming the delete operation was successful, update the UI by refetching the posts
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleReportPost = async (postId) => {
    // Implement report post functionality here
    try {
      const response = await axios.post(`http://localhost:4000/post-api/reportpost/${postId}`);
      if (response.data.message === "Post reported successfully") {
        alert("Post reported successfully");
      }

    } catch (error) {
      console.error("Unsuccessful report");
    }
  };

  const handleEditPost = (post) => {
    setEditPost(post);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSaveEdit = async () => {
    try {
      // Send the updated post details to the backend
      await axios.put(`http://localhost:4000/post-api/edit-post/${editPost._id}`, editPost);
      // Assuming the update operation was successful, close the modal and refresh the posts
      setShowEditModal(false);
      fetchPosts();
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Posts</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              onClick={() => setViewType('all')}
              style={{ color: viewType === 'all' ? 'white' : 'black', backgroundColor: viewType === 'all' ? 'blue' : 'transparent' }}
            >
              All Posts
            </Nav.Link>
            <Nav.Link
              onClick={() => setViewType('my')}
              style={{ color: viewType === 'my' ? 'white' : 'black', backgroundColor: viewType === 'my' ? 'blue' : 'transparent' }}
            >
              My Posts
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Edit Post Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={editPost.title} onChange={(e) => setEditPost({ ...editPost, title: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formBasicContent">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={3} value={editPost.content} onChange={(e) => setEditPost({ ...editPost, content: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formBasicCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" value={editPost.category} onChange={(e) => setEditPost({ ...editPost, category: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Post List */}
      <div className="container mt-3">
        {posts.length > 0 ? (
          <ul className="list-group">
            {posts.map((post, index) => (
              <li key={post._id} className="list-group-item" style={{ marginBottom: index < posts.length - 1 ? '20px' : '0' }}>
                {viewType === 'my' && post.createdBy === userObj.username ? (
                  <div className="d-flex justify-content-between align-items-center">
                    {/* <div>
                      <h3>{post.title}</h3>
                      <p>{post.content}</p>
                      <p>Category: {post.category}</p>
                    </div> */}
                  <Link to="/posts/{post.id}">
                  <div class="card">
                    <div class="content">
                      <p class="heading">{post.title}</p>
                      <p class="para">
                      {post.content}
                      </p>
                    </div>
                  </div>
                  </Link>
                    <DropdownButton
                      align="end"
                      title={<span style={{ color: 'inherit' }}>&#8942;</span>}
                      id={`dropdown-menu-align-end-${post._id}`}
                      style={{ background: 'none', border: 'none', boxShadow: 'none' }}
                    >
                      <Dropdown.Item eventKey="1" onClick={() => handleEditPost(post)}>Edit</Dropdown.Item>
                      <Dropdown.Item eventKey="2" onClick={() => handleDeletePost(post._id)}>Delete</Dropdown.Item>
                    </DropdownButton>
                  </div>
                ) : null}

                {viewType === 'all' && post.createdBy !== userObj.username ? (
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3>{post.title}</h3>
                      <p>{post.content}</p>
                      <p>Category: {post.category}</p>
                    </div>
                    <DropdownButton
                      align="end"
                      title={<span style={{ color: 'inherit' }}>&#8942;</span>}
                      id={`dropdown-menu-align-end-${post._id}`}
                      style={{ background: 'none', border: 'none', boxShadow: 'none' }}
                    >
                      <Dropdown.Item eventKey="3" onClick={() => handleReportPost(post._id)}>Report</Dropdown.Item>
                    </DropdownButton>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts available.</p>
        )}

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
    </div>
  );
};

export default Posts;
