import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { QRCodeCanvas as QRCode } from 'qrcode.react';
import './ListingPage.css';

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
    <div className="container">
      <div className="header">
        <h1>🏠 House for Rent</h1>
        <p>2BHK Independent House — Khammam</p>
        <span className="badge">✅ Available Now</span>
      </div>

      <div className="details-card">
        <div className="detail-row">
          <span className="detail-label">💰 Monthly Rent</span>
          <span className="detail-value">₹{details.rent}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">🏦 Advance</span>
          <span className="detail-value">₹{details.advance}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">🚰 Water</span>
          <span className="detail-value">{details.water}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">🚗 Parking</span>
          <span className="detail-value">{details.parking}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">🏫 Nearby</span>
          <span className="detail-value">{details.nearby}</span>
        </div>
      </div>

      <div className="buttons">
        <a href={`tel:${details.contact}`} className="btn-call">
          📞 Call Now
        </a>
        <a href={`https://wa.me/${details.contact}`} className="btn-whatsapp">
            💬 WhatsApp
        </a>
        <a href={details.location} className="btn-maps">
          📍 View on Google Maps
        </a>
      </div>

      <div className="qr-section">
        <QRCode value={window.location.href} size={160} />
        <p>Scan to share this listing</p>
      </div>
    </div>
  );
}

export default ListingPage;