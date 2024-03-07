import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './Components/NavBar/NavBar';
import ContactUs from './Components/ContactUs';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <Router>
     <NavBar />
     <main className="main-content">
       <Routes>
         <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
         <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
         <Route path="/contactus" element={<ContactUs />} />
       </Routes>
     </main>
   </Router>
  );
}

export default App;
