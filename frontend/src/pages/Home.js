import React, { useState } from 'react';
import { ChromePicker } from 'react-color'
import axios from 'axios';

function Home()
{
    const [color, setColor] = useState({hex: '#fff'});
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [brightness, setBrightness] = useState(128);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data ={
            brightness: parseInt(brightness, 10),
            color: color.hex,
            
        };
        try{
            const response = await axios.post("http://localhost:5000/api/smartbulb", data);
            console.log("Response received:", response);
            alert(`Server Response: ${JSON.stringify(response.data)}`);
        }
        catch(error)
        {
            console.log("Error posting to bulb", error);
        };

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
            <button onClick = {handleSubmit}>Submit</button>
        </div>
    );
}

export default Home;