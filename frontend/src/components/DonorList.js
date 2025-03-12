import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../utils/axios';

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        // Assuming token is stored in localStorage after login/registration
        const token = localStorage.getItem('token');
        const res = await api.get('/api/donors', {
          headers: { 'Authorization': token }
        });
        setDonors(res.data);
      } catch(err) {
        console.error(err.response.data);
      }
    };
    
    fetchDonors();
  }, []);
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Donors List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {donors.map(donor => (
          <div key={donor._id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{donor.firstname} {donor.lastname}</h3>
            <p>Blood Group: {donor.bloodGroup}</p>
            <p>Location: {donor.address}</p>
            <p>Available: {donor.availability ? 'Yes' : 'No'}</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => window.location.href = `/donor/${donor._id}`}>
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonorList;
