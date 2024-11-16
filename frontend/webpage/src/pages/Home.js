import React, { useState } from 'react';
import { ChromePicker } from 'react-color'

function Home()
{
    const [color, setColor] = useState('#fff')
    const [showColorPicker, setShowColorPicker] = useState(false)
    return(
        <div>
            <h1>Home Page</h1>
            <p>Welcome to the home Page!</p>
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
        </div>
    );
}

export default Home;