import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { ref, set, onValue } from 'firebase/database';
import { signOut } from 'firebase/auth';
import Login from './Login';
import './AdminPanel.css';

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

  useEffect(() => {
    const dbRef = ref(db, 'rental/');
    onValue(dbRef, (snapshot) => {
      if (snapshot.val()) {
        setDetails(snapshot.val());
      }
    });
  }, []);

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
      <label>Monthly Rent (₹)</label>
      <input name="rent" placeholder="e.g. 8000" value={details.rent} onChange={handleChange} />
      <label>Advance Amount (₹)</label>
      <input name="advance" placeholder="e.g. 50000" value={details.advance} onChange={handleChange} />
      <label>Parking</label>
      <input name="parking" placeholder="e.g. 2 wheeler available" value={details.parking} onChange={handleChange} />
      <label>Contact Number</label>
      <input name="contact" placeholder="91XXXXXXXXXX" value={details.contact} onChange={handleChange} />
      <label>Google Maps Link</label>
      <input name="location" placeholder="Paste Google Maps link" value={details.location} onChange={handleChange} />
      <button className="btn-save" onClick={handleSave}>💾 Save Details</button>
      <button className="btn-logout" onClick={handleLogout}>🚪 Logout</button>
    </div>
  );
}

export default AdminPanel;