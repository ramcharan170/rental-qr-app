import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { ref, set } from 'firebase/database';
import { signOut } from 'firebase/auth';
import Login from './Login';
import './AdminPanel.css';

function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [details, setDetails] = useState({
    whatsapp:'',
    rent: '',
    advance: '',
    water: '',
    parking: '',
    nearby: '',
    available: true,
    contact: '',
    location: ''
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    set(ref(db, 'rental/'), details);
    alert('Details saved successfully!');
  };

  const handleLogout = () => {
    signOut(auth);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="admin-container">
      <h2>⚙️ Admin Panel</h2>
      <input name="rent" placeholder="Monthly Rent" onChange={handleChange} />
      <input name="advance" placeholder="Advance Amount" onChange={handleChange} />
      <input name="water" placeholder="Water Details" onChange={handleChange} />
      <input name="parking" placeholder="Parking Details" onChange={handleChange} />
      <input name="nearby" placeholder="Nearby Schools/Shops" onChange={handleChange} />
      <input name="contact" placeholder="Contact Number" onChange={handleChange} />
      <input name="location" placeholder="Google Maps Link" onChange={handleChange} />
      <button className="btn-save" onClick={handleSave}>Save Details</button>
      <button className="btn-logout" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminPanel;