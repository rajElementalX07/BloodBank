import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import api from '../utils/axios';

const ReceiverList = () => {
  const [receivers, setReceivers] = useState([]);

  useEffect(() => {
    const fetchReceivers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/api/receivers', {
          headers: { 'x-auth-token': token }
        });
        setReceivers(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchReceivers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Receivers List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {receivers.map((receiver) => (
          <Card key={receiver._id} className="p-3 shadow-sm">
            <Card.Body>
              <Card.Title>
                {receiver.firstName || receiver.fullName || 'Receiver'}
              </Card.Title>
              <Card.Text>
                <strong>Required Blood Group:</strong> {receiver.requiredBloodGroup}<br />
                <strong>Urgency:</strong> {receiver.urgency}<br />
                <strong>Location:</strong> {receiver.location}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => window.location.href = `/receiver/${receiver._id}`}
              >
                View
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReceiverList;
