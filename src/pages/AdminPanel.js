import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { ref, set } from 'firebase/database';
import { signOut } from 'firebase/auth';
import Login from './Login';

function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [details, setDetails] = useState({
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
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Admin Panel</h2>
      <input name="rent" placeholder="Monthly Rent" onChange={handleChange} /><br/><br/>
      <input name="advance" placeholder="Advance Amount" onChange={handleChange} /><br/><br/>
      <input name="water" placeholder="Water Details" onChange={handleChange} /><br/><br/>
      <input name="parking" placeholder="Parking Details" onChange={handleChange} /><br/><br/>
      <input name="nearby" placeholder="Nearby Schools/Shops" onChange={handleChange} /><br/><br/>
      <input name="contact" placeholder="Contact Number" onChange={handleChange} /><br/><br/>
      <input name="location" placeholder="Google Maps Link" onChange={handleChange} /><br/><br/>
      <button onClick={handleSave}>Save Details</button>
      <br/><br/>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminPanel;