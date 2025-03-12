import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import api from '../utils/axios';

const DonorDetails = () => {
  const { id } = useParams();
  const [donor, setDonor] = useState(null);
  
  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get(`/api/donor/${id}`, {
          headers: { 'Authorization': token }
        });
        setDonor(res.data);
      } catch(err) {
        console.error(err.response.data);
      }
    };
    fetchDonor();
  }, [id]);
  
  if(!donor) return <div>Loading...</div>;
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{donor.fullName}</h2>
      <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
      <p><strong>Age:</strong> {donor.age}</p>
      <p><strong>Gender:</strong> {donor.gender}</p>
      <p><strong>Last Donation:</strong> {donor.lastDonation ? new Date(donor.lastDonation).toLocaleDateString() : 'N/A'}</p>
      <p><strong>Medical History:</strong> {donor.medicalHistory}</p>
      <p><strong>Contact:</strong> {donor.contactNumber}</p>
      <p><strong>Address:</strong> {donor.address}</p>
    </div>
  );
};

export default DonorDetails;
