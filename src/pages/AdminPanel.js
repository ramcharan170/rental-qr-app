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
      <input name="rent" placeholder="Monthly Rent" value={details.rent} onChange={handleChange} />
      <input name="advance" placeholder="Advance Amount" value={details.advance} onChange={handleChange} />
      <input name="water" placeholder="Water Details" value={details.water} onChange={handleChange} />
      <input name="parking" placeholder="Parking Details" value={details.parking} onChange={handleChange} />
      <input name="contact" placeholder="Contact Number (91XXXXXXXXXX)" value={details.contact} onChange={handleChange} />
      <input name="location" placeholder="Google Maps Link" value={details.location} onChange={handleChange} />
      <button className="btn-save" onClick={handleSave}>Save Details</button>
      <button className="btn-logout" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminPanel;