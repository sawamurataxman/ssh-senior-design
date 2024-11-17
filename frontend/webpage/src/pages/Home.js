import React, { useState } from 'react';
import { ChromePicker } from 'react-color'

function Home()
{
    const [color, setColor] = useState('#fff')
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [brightness, setBrightness] = useState("ON")

    const handleSubmit = (e) => {
        e.preventDefault();

        const data ={
            brightness,
            color: color.hex,
            
        };
        fetch("http://localhost:3000/api/smartbulb",)(
        {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(data),

        })
        .then(response => response.json())
        .then(result => console.log("Data sent:", result))
        .catch(error => console.error("Error:", error));
    };

    return(
        <div>
            <h1>Bulb Page</h1>
            <p>Welcome to the Bulb Page!</p>
            <div>
                <button onClick = {()=> setShowColorPicker(showColorPicker => !showColorPicker)}>
                {showColorPicker ? ' Close color' : 'Click to pick a color'}
                </button>
                {showColorPicker && (
                    <ChromePicker
                    color={color}
                    onChange={updatedColor => setColor(updatedColor)}
                />
                )}
                <div style = {{background: color, height: '100px', width: '100px', marginTop: '10px'}}>
                </div>
            </div>
            <div>
                <label>Brightness Settings </label>
                <input
                    type="range"
                    min="0"
                    max="255"
                    value={brightness}
                    onChange ={(e) => setBrightness(e.target.value)}
                />
            </div>
        </div>
    );
}

export default Home;