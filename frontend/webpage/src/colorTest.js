import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ColorTest = () => {
  const [color, setColor] = useState({ r: "", g: "", b: "" });
  const [message, setMessage] = useState("");

  // Fetch the previously submitted color information when the component mounts
  useEffect(() => {
    const fetchColorData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/bulb1");
        const { r, g, b } = response.data.color || {}; // Assuming the response contains color data
        setColor({ r, g, b });
      } catch (error) {
        console.log("Error fetching color data", error);
        setMessage("Failed to load color data");
      }
    };

    fetchColorData();
  }, []); // Empty array ensures this effect runs only once when the component mounts

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setColor({
      ...color,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const outputJson = { color: { r: parseInt(color.r, 10), g: parseInt(color.g, 10), b: parseInt(color.b, 10) } };
    try {
      const response = await axios.post("http://localhost:5000/api/bulb1", outputJson);
      setMessage("Posted successfully");
    } catch (error) {
      console.log("Error posting to bulb", error);
      setMessage("Post failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          R:
          <input
            type="number"
            name="r"
            value={color.r}
            onChange={handleChange}
            min="0"
            max="255"
          />
        </label>
        <br />
        <label>
          G:
          <input
            type="number"
            name="g"
            value={color.g}
            onChange={handleChange}
            min="0"
            max="255"
          />
        </label>
        <br />
        <label>
          B:
          <input
            type="number"
            name="b"
            value={color.b}
            onChange={handleChange}
            min="0"
            max="255"
          />
        </label>
        <br />
        <button type="submit">Submit Bulb Config</button>
      </form>

      {message && (
        <div>
          <h3>Response from Backend:</h3>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default ColorTest;
