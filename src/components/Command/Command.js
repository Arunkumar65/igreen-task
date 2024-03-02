import React from 'react'

const Command = (props) => {
    const { handleToyCommand } = props;

    return (
        <>
            <button className='command-btn' onClick={() => handleToyCommand('PLACE 0,0,NORTH')}>Place Robot</button>
            <button className='command-btn' onClick={() => handleToyCommand('MOVE')}>Move</button>
            <button className='command-btn' onClick={() => handleToyCommand('LEFT')}>Rotate Left</button>
            <button className='command-btn' onClick={() => handleToyCommand('RIGHT')}>Rotate Right</button>
            <button className='command-btn' onClick={() => handleToyCommand('REPORT')}>Report Position</button>
        </>
    )
}

export default Command;