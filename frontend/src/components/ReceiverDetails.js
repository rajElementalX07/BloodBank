import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import api from '../utils/axios';

const ReceiverDetails = () => {
  const { id } = useParams();
  const [receiver, setReceiver] = useState(null);

  useEffect(() => {
    const fetchReceiver = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get(`/api/receiver/${id}`, {
          headers: { 'x-auth-token': token }
        });
        setReceiver(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchReceiver();
  }, [id]);

  if (!receiver) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {receiver.firstName || receiver.fullName} {receiver.lastName || ''}
      </h2>
      <p><strong>Required Blood Group:</strong> {receiver.requiredBloodGroup}</p>
      <p><strong>Urgency:</strong> {receiver.urgency}</p>
      <p><strong>Units Required:</strong> {receiver.units}</p>
      <p><strong>Location:</strong> {receiver.location}</p>
      <p><strong>Request Details:</strong> {receiver.requestDetails}</p>
      <p><strong>Mobile:</strong> {receiver.mobile}</p>
      <p><strong>Email:</strong> {receiver.email}</p>
    </div>
  );
};

export default ReceiverDetails;
