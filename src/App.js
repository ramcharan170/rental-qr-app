import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import ListingPage from './pages/ListingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/listing" element={<ListingPage />} />
      </Routes>
    </Router>
  );
}

export default App;