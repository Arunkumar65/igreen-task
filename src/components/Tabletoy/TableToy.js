import React, { useState } from 'react';
import './style.css';
import Command from '../Command/Command';

const TableToy = () => {
    const [position, setPosition] = useState({ x: null, y: null, facing: null });

    const placeToyRobot = (x, y, facing) => {
        // Check if the placement is within the tabletop boundaries
        if (x >= 0 && x < 5 && y >= 0 && y < 5) {
            setPosition({ x, y, facing });
        }
    };

    const moveToyRobot = () => {

        let newX = position.x;
        let newY = position.y;
        console.log(newX, newY)
        // Calculate new position based on current facing direction
        switch (position.facing) {
            case 'NORTH':
                newY = Math.min(newY + 1, 4);
                break;
            case 'EAST':
                newX = Math.min(newX + 1, 4);
                break;
            case 'SOUTH':
                newY = Math.max(newY - 1, 0);
                break;
            case 'WEST':
                newX = Math.max(newX - 1, 0);
                break;
            default:
                break;
        }

        // Update the position
        setPosition({ ...position, x: newX, y: newY });
    };

    const rotateToyLeft = () => {
        // If robot is not placed, do nothing
        if (!position.facing) return;
        console.log(position.facing);
        const directions = ['NORTH', 'WEST', 'SOUTH', 'EAST'];
        const currentIndex = directions.indexOf(position.facing);
        const newFacing = directions[(currentIndex + 1) % 4];
        console.log(newFacing)
        setPosition({ ...position, facing: newFacing });
    };

    const rotateToyRight = () => {
        // If robot is not placed, do nothing
        if (!position.facing) return;

        const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
        const currentIndex = directions.indexOf(position.facing);
        const newFacing = directions[(currentIndex + 1) % 4];
        setPosition({ ...position, facing: newFacing });
    };

    const reportToyPosition = () => {
        if (position.x !== null && position.y !== null && position.facing !== null) {
            alert(`Current position: ${position.x},${position.y},${position.facing}`);
        } else {
            alert('Robot is not placed on the table.');
        }
    };

    const handleToyCommand = (command) => {
        const [action, args] = command.split(' ');
        switch (action) {
            case 'PLACE':
                const [x, y, facing] = args.split(',');
                placeToyRobot(parseInt(x), parseInt(y), facing);
                break;
            case 'MOVE':
                moveToyRobot();
                break;
            case 'LEFT':
                rotateToyLeft();
                break;
            case 'RIGHT':
                rotateToyRight();
                break;
            case 'REPORT':
                reportToyPosition();
                break;
            default:
                break;
        }
    };

    return (
        <div className="tabletop-container">
            <div className="tabletop">
                {[...Array(5)].map((_, row) => {
                    console.log(row);
                    return [...Array(5)].map((_, col) => {
                        return <div
                            className={`tabletop-cell ${position.x === col && position.y === row ? 'toy-robot' : ''}`}
                            key={`${row}-${col}`}
                        >
                            {position.x === col && position.y === row && position.facing && (
                                <div className={`toy-robot ${position.facing.toLowerCase()}`}></div>
                            )}
                        </div>
                    })
                }

                )}
            </div>
            <div className="command-controls">
                <Command handleToyCommand={handleToyCommand} />
            </div>
        </div>
    );
};

export default TableToy;
