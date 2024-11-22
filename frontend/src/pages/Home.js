import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Home() {
    const [color, setColor] = useState({ rgb: { r: 51, g: 51, b: 51, a: 1 } });
    const [appliedColor, setAppliedColor] = useState({ rgb: { r: 51, g: 51, b: 51, a: 1 } });
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [brightness, setBrightness] = useState(128);
    const [appliedBrightness, setAppliedBrightness] = useState(128);

    // Fetch initial bulb state from the backend
    useEffect(() => {
        const fetchBulbState = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/bulb1");
                const { brightness, color } = response.data;
                setBrightness(brightness);
                setAppliedBrightness(brightness);
                setColor({ rgb: color });
                setAppliedColor({ rgb: color });
            } catch (error) {
                console.error("Error fetching bulb state:", error);
            }
        };
        fetchBulbState();
    }, []);

    // Handle submit: update backend and applied states
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            brightness: parseInt(brightness, 10),
            color: color.rgb,
        };

        try {
            const response = await axios.post("http://localhost:5000/api/bulb1", data);
            alert(`Server Response: ${response.data.message}`);
            setAppliedColor(color);
            setAppliedBrightness(brightness);
        } catch (error) {
            console.error("Error posting to bulb:", error);
        }
    };

    // Generate slider background color based on applied RGB values
    const sliderBackgroundColor = `rgb(${appliedColor.rgb.r}, ${appliedColor.rgb.g}, ${appliedColor.rgb.b})`;

    return (
        <div className="home-container">
            <h1>Bulb Page</h1>
            <p>Welcome to the Bulb Page! Adjust the color and brightness of your bulb below:</p>
            <Navbar />

            <div>
                <button onClick={() => setShowColorPicker(showColorPicker => !showColorPicker)}>
                    {showColorPicker ? 'Close color picker' : 'Click to pick a color'}
                </button>

                {showColorPicker && (
                    <ChromePicker
                        color={color.rgb}
                        onChange={(updatedColor) => setColor(updatedColor)}
                    />
                )}
            </div>

            <div>
                <p>Brightness Settings</p>
                <input
                    type="range"
                    min="0"
                    max="255"
                    value={brightness}
                    onChange={(e) => setBrightness(e.target.value)}
                    style={{
                        background: sliderBackgroundColor,
                        height: '10px', // Optional: Adjust slider height
                        borderRadius: '5px', // Optional: Add rounded corners
                        outline: 'none', // Optional: Remove outline
                        appearance: 'none', // Ensure consistent slider styling
                    }}
                />
            </div>

            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default Home;
