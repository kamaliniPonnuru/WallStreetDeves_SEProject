import React, { useEffect, useState } from "react";
import "./Header.css";
import { Container, Nav, Navbar, NavDropdown, Modal, Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import Signup from "../Signup";
import Login from "../Login";
import Contactus from "../Contactus";
import UserProfile from "../userprofile/UserProfile";
import { useSelector } from "react-redux";
import { clearLoginStatus } from "../../slices/userSlice";
import { adminClearLoginStatus } from "../../slices/adminSlice"
import { useDispatch } from "react-redux";
import Userdashboard from "../userdashboard/Userdashboard";
import { useNavigate, Navigate } from "react-router-dom";
import Posts from "../Posts/Posts";
import NewPost from "../NewPost/NewPost";
import homeImg from "../../images/main_pic.png";
import Admindashboard from '../admin/admindashboard/Admindashboard'
import Messages from "../messages/Messages";
import Events from "../events/Events";
import Reportedposts from "../admin/reportedposts/Reportedposts";
import Inquiry from "../admin/inquiries/Inquiry";

function Header() {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, userObj } = useSelector((state) => state.user);
  const { isError: adminIsError, isLoading: adminIsLoading, isSuccess: adminIsSuccess, errMsg: adminErrMsg, adminObj } = useSelector(
    (state) => state.admin
  );


  // Function to handle password change
  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match")
      return;
    }

    try {
      const response = await fetch("/user-api/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userObj.username, newPassword }),
      });

      if (response.ok) {
        setNewPassword("");
        setConfirmNewPassword("");
        setSuccessMessage("Password updated successfully");
        setError("");
        alert("Password updated successfully");
      } else {
        const data = await response.json();
        setError(data.message);
        setSuccessMessage("");
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setError("Failed to update password");
      setSuccessMessage("");
      alert("Failed to update password");
    }
  };

  // Function to handle user logout
  const userLogout = () => {
    localStorage.clear();
    dispatch(clearLoginStatus());
    navigate("/login");
  };

  const adminLogout = () => {
    localStorage.clear();
    dispatch(adminClearLoginStatus());
    navigate("/login");
  };

  const userType = localStorage.getItem('userType');


  return (
    <div>
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img src={homeImg} alt="" className="shadow-lg rounded" style={{ height: 60, width: 150 }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              {isSuccess !== true && adminIsSuccess !== true ? (
                <>
                  {/* These links can be visible when no user logged in */}
                  <Nav.Item>
                    <Nav.Link eventKey="1" as={NavLink} to="/">
                      Home
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="2" as={NavLink} to="/signup">
                      Signup
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="3" as={NavLink} to="/login">
                      Login
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="4" as={NavLink} to="/contactus">
                      ContactUs
                    </Nav.Link>
                  </Nav.Item>
                </>
              ) : isSuccess === true && adminIsSuccess !== true ? (
                <>
                  {/* This dropdown is visible only when a user is logged in */}
                  <Nav.Item>
                    <Nav.Link eventKey="1" as={NavLink} to="/userdashboard">
                      User Dashboard
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="2" as={NavLink} to="/new-post">
                      Add new Post
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="3" as={NavLink} to="/posts">
                      View Posts
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="4" as={NavLink} to="/events">
                      Events
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="5" as={NavLink} to="/messages">
                      Messages
                    </Nav.Link>
                  </Nav.Item>

                  <NavDropdown
                    title={userObj.username}
                    //id="collasible-nav-dropdown"
                    id="drop-down"
                  >
                    <NavDropdown.Item onClick={() => setShowChangePasswordModal(true)}>
                      Change password
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={userLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : adminIsSuccess === true && isSuccess !== true ? (
                <>
                  <Nav.Item>
                    <Nav.Link eventKey="1" as={NavLink} to="/admindashboard">
                      Dashboard
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="2" as={NavLink} to="/reportedposts">
                      Reported posts
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="3" as={NavLink} to="/inquiries">
                      Inquiries
                    </Nav.Link>
                  </Nav.Item>
                  <NavDropdown
                    title={adminObj.username}
                    id="drop-down"
                  >
                    <NavDropdown.Item onClick={adminLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (<> </>)
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/events" element={<Events />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/userdashboard" element={<Userdashboard />} />
        <Route path="/admindashboard" element={<Admindashboard />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/reportedposts" element={<Reportedposts />} />
        <Route path="/inquiries" element={<Inquiry />} />
      </Routes>

      {/* Change Password Modal */}
      <Modal show={showChangePasswordModal} onHide={() => setShowChangePasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formConfirmNewPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowChangePasswordModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleChangePassword}>
            Change Password
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Header;
