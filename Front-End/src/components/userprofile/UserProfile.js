import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  let { userObj } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };


  useEffect(() => {
    // Fetch user data from the backend using Axios
    axios.get('http://localhost:4000/user-api/getusers')
      .then(response => {
        setUserData(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setUsername(response.data.username);
      })
      .catch(error => console.log(error));
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    
    const updatedUserData = { name, email, username };
    axios.put('http://localhost:4000/user-api/editprofile', updatedUserData)
      .then(response => {
        setUserData(response.data);
        setEditing(false);
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      {userData ? (
        <div>
          <h2>Your Profile</h2>
          <div>
            <label>Name:</label>
            {editing ? (
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
            ) : (
              <span>{userData.name}</span>
            )}
          </div>
          <div>
            <label>Email:</label>
            {editing ? (
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            ) : (
              <span>{userData.email}</span>
            )}
          </div>
          <div>
            <label>Username:</label>
            {editing ? (
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            ) : (
              <span>{userData.username}</span>
            )}
          </div>
          {editing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserProfile;
