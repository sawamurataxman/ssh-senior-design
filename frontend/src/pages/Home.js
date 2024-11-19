import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import axios from 'axios';

function Home() {
    const [color, setColor] = useState({ rgb: { r: 51, g: 51, b: 51, a: 1 } });
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [brightness, setBrightness] = useState(128);

    // Load the bulb state from the backend when the component mounts
    useEffect(() => {
        const fetchBulbState = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/bulb1");
                const { brightness, color } = response.data;
                setBrightness(brightness);
                setColor({ rgb: color });
            } catch (error) {
                console.error("Error fetching bulb state:", error);
            }
        };
        fetchBulbState();
    }, []);

    // Submit the updated color and brightness to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            brightness: parseInt(brightness, 10),
            color: color.rgb,
        };

        try {
            const response = await axios.post("http://localhost:5000/api/bulb1", data);
            alert(`Server Response: ${response.data.message}`);
        } catch (error) {
            console.error("Error posting to bulb:", error);
        }
    };

    return (
        <div>
            <h1>Bulb Page</h1>
            <p>Welcome to the Bulb Page!</p>
            <div>
                <button onClick={() => setShowColorPicker(showColorPicker => !showColorPicker)}>
                    {showColorPicker ? 'Close color' : 'Click to pick a color'}
                </button>
                {showColorPicker && (
                    <ChromePicker
                        color={color.rgb}
                        onChange={updatedColor => setColor(updatedColor)}
                    />
                )}

            </div>
            <div>
                <label>Brightness Settings </label>
                <input
                    type="range"
                    min="0"
                    max="255"
                    value={brightness}
                    onChange={(e) => setBrightness(e.target.value)}
                />
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default Home;
