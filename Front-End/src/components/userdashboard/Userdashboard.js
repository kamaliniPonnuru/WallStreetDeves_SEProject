import React from "react";
import './Userdashboard.css'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Nav } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";
import { Link, Routes, Route } from 'react-router-dom';
import UserProfile from "../userprofile/Userprofile";
import NewPost from "../NewPost/NewPost";


function Userdashboard() {
  let { userObj } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <>
        <div style={{ display: 'flex', alignItems: 'center', marginTop:'40px', marginLeft:'30px' }}>
          <h3 style={{ marginRight: '10px' }}>Hello, {userObj.username}!</h3>
          <h5>Connect with your alumni network.</h5>
        </div>
        <div className="userdashboard-container">
          <div className="user-dashboard-card">
            <Link to="/profile" className="user-dashboard-card-link">
              <div className="user-dashboard-card-content">
                <h3>Profile</h3>
              </div>
            </Link>
          </div>
          <div className="user-dashboard-card">
            <Link to="/new-post" className="user-dashboard-card-link">
              <div className="user-dashboard-card-content">
                <h3>Create New Post</h3>
              </div>
            </Link>
          </div>
          <div className="user-dashboard-card">
            <Link to="/edit-profile" className="user-dashboard-card-link">
              <div className="user-dashboard-card-content">
                <h3>Edit Profile</h3>
              </div>
            </Link>
          </div>
        </div>

        <div className="user-dashboard">
          <div className="user-dashboard-sidebar">
          </div>

          <div>
            <Routes>
              <Route path="/new-post" element={<NewPost />} />
              <Route path="/profile" element={<Userprofile />} />
            </Routes>
          </div>
        </div>
      </>
    </>
  );
}

export default Userdashboard;