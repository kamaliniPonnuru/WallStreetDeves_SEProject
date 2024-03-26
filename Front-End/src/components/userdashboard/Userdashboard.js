import React from "react";
import './Userdashboard.css'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Nav } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";
import { Link, Routes, Route } from 'react-router-dom';
import UserProfile from "../userprofile/UserProfile";
import NewPost from "../NewPost/NewPost";
import Posts from "../Posts/Posts";

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
          <div class="user-dashboard-cards">
            <Link to="/profile">
              <figure class="user-dashboard-card">
                <figcaption class="user-dashboard-card_title">
                  View Profile
                </figcaption>
              </figure>
            </Link>
          </div>
          <div class="user-dashboard-cards">
            <Link to="/posts">
              <figure class="user-dashboard-card">
                <figcaption class="user-dashboard-card_title">
                 Posts
                </figcaption>
              </figure>
            </Link>
          </div>
          <div class="user-dashboard-cards">
            <Link to="/events">
              <figure class="user-dashboard-card">
                <figcaption class="user-dashboard-card_title">
                  Events
                </figcaption>
              </figure>
            </Link>
          </div>
          <div class="user-dashboard-cards">
            <Link to="#">
              <figure class="user-dashboard-card">
                <figcaption class="user-dashboard-card_title">
                  Notification
                </figcaption>
              </figure>
            </Link>
          </div>
          <div class="user-dashboard-cards">
            <Link to="#">
              <figure class="user-dashboard-card">
                <figcaption class="user-dashboard-card_title">
                  Messages
                </figcaption>
              </figure>
            </Link>
          </div>
        </div>


        <div className="user-dashboard">
          <div className="user-dashboard-sidebar">
          </div>

          <div>
            <Routes>
              <Route path="/new-post" element={<NewPost />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/posts" element={<Posts />} />
            </Routes>
          </div>
        </div>
      </>
    </>
  );
}

export default Userdashboard;