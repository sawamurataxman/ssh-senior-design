import React, { useState } from 'react';
import axios from 'axios';

const StringSender = () => {
  const [userString, setUserString] = useState('');
  const [response, setResponse] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to the backend
      const res = await axios.post('http://localhost:5000/api/echo', {
        user_string: userString,
      });
      // Set the response from the backend
      setResponse(res.data.received);
    } catch (error) {
      console.error('Error sending string:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          This is a proof-of-concept for sending data from frontend to backend. enter echo string:
          <input
            type="text"
            value={userString}
            onChange={(e) => setUserString(e.target.value)}
          />
        </label>
        <button type="submit">Send</button>
      </form>

      {response && (
        <div>
          <h3>Response from Backend:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default StringSender;