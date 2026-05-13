import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { QRCodeCanvas as QRCode } from 'qrcode.react';

function ListingPage() {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const dbRef = ref(db, 'rental/');
    onValue(dbRef, (snapshot) => {
      setDetails(snapshot.val());
    });
  }, []);

  if (!details) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>House for Rent</h2>
      <p>Monthly Rent: {details.rent}</p>
      <p>Advance: {details.advance}</p>
      <p>Water: {details.water}</p>
      <p>Parking: {details.parking}</p>
      <p>Nearby: {details.nearby}</p>
      <p>Status: {details.available ? 'Available' : 'Not Available'}</p>
      <br/>
      <a href={`tel:${details.contact}`}>📞 Call Now</a>
      <br/><br/>
      <a href={`https://wa.me/${details.contact}`}>💬 WhatsApp</a>
      <br/><br/>
      <a href={details.location}>📍 Google Maps</a>
      <br/><br/>
      <QRCode value={window.location.href} />
    </div>
  );
}

export default ListingPage;