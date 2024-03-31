import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import './UserProfile.css'; // Import CSS file for styling

function UserProfile() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  let { userObj } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    const original_username = userObj.username;
    const updatedUserData = { name, email, username, original_username };
  
    axios.put('http://localhost:4000/user-api/editprofile', updatedUserData)
      .then(response => {
        if (response.status === 200) {
          alert("Profile updated successfully");
          setEditing(false);
  
          // Fetch updated user data and update userObj state
          // Example:
          // axios.get('http://localhost:4000/user-api/userdata')
          //   .then(response => {
          //     setUserObj(response.data);
          //   })
          //   .catch(error => console.error(error));
        } else {
          console.error('Error updating profile:', response.data);
        }
      })
      .catch(error => console.error('Error updating profile:', error));
  };
  

  return (
    <div className="user-profile-container">
      {userObj ? (
        <div className="profile-form">
          <h2>Your Profile</h2>
          <div className="form-group">
            <label>Name:</label>
            {editing ? (
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
            ) : (
              <span>{userObj.name}</span>
            )}
          </div>
          <div className="form-group">
            <label>Email:</label>
            {editing ? (
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            ) : (
              <span>{userObj.email}</span>
            )}
          </div>
          <div className="form-group">
            <label>Username:</label>
            {editing ? (
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            ) : (
              <span>{userObj.username}</span>
            )}
          </div>
          <div className="button-group">
            {editing ? (
              <button className="save-button" onClick={handleSave}>Save</button>
            ) : (
              <button className="edit-button" onClick={handleEdit}>Edit</button>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserProfile;
