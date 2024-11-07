import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TimeDisplay = () => {
  const [time, setTime] = useState('');

  // Fetch time from backend
  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/time');
        setTime(response.data.time);
      } catch (error) {
        console.error('Error fetching time:', error);
      }
    };

    fetchTime();

    // Set an interval to fetch time every second
    const intervalId = setInterval(fetchTime, 1000);
    
    // Cleanup interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h3>This is a proof-of-concept for transferring data from the backend to the frontend. time:</h3>
      <p>{time ? time : 'Loading...'}</p>
    </div>
  );
};

export default TimeDisplay;