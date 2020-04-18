import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import { getSurroundingCells, copyData } from '../../helpers/utils';

// cell style
const patternRectStyle = {
    style: {
        fill: '#f0f8ff08',
        stroke: 'aquamarine',
        strokeWidth: '2px'
    }
}

// on hover cell style
const patternRectHoverStyle = {
    style: {
        fill: 'rgba(136, 206, 173, 0.96)',
        stroke: 'aquamarine',
        strokeWidth: '7px'
    }
}

// component for gathering all the cells.
const Cells = props => {
    const { start, boardWidth, boardHeight, patternRectHeight, patternRectWidth } = props;
    let tempCells = [];
    const [tracker, setTracker] = useState(false);
    const [cells, setCells] = useState([]);
    const [renderCount, setRenderCount] = useState(0)
    const trackerTemp = [];

    const setTrackerValue = (id, value, surroundingCells) => {
        console.log('tracker is ', tracker)
        const eleIndex = trackerTemp.findIndex(el => el.key === id);
        var newTracker = [...trackerTemp];
        newTracker[eleIndex].value = value;

        // refreshBoard();
    }

    const setGlowClass = (x, y, selVal) => {
        const height = patternRectHeight, width = patternRectWidth;
        const surroundingCells = [];
        let firstLevelMatch = false;
        const pairVal = selVal === 'S' ? 'O' : 'S';


        surroundingCells.push({ pos: 'top', key: `${x}-${y - height}` }) // cell's top key
        surroundingCells.push({ pos: 'topRight', key: `${x + width}-${y - height}` }) // cell's top right corner key
        surroundingCells.push({ pos: 'right', key: `${x + width}-${y}` }); // cell's right key
        surroundingCells.push({ pos: 'bottomRight', key: `${x + width}-${y + height}` }) // cell's bottom right corner key
        surroundingCells.push({ pos: 'bottom', key: `${x}-${y + height}` }) // cell's bottom key
        surroundingCells.push({ pos: 'bottomLeft', key: `${x - width}-${y + height}` }) // cell's bottom left corner key
        surroundingCells.push({ pos: 'left', key: `${x - width}-${y}` }); // cell's left key
        surroundingCells.push({ pos: 'topLeft', key: `${x - width}-${y - height}` }) // cell's top left corner key
        console.log('Created in cells ', surroundingCells)


        for (const cell of surroundingCells) {
            const eleIndex = trackerTemp.findIndex(el => el.key === cell.key);
            if (eleIndex < 0) return;
            var newTracker = [...trackerTemp];
            newTracker[eleIndex].glowClass = cell.pos;
            if (newTracker[eleIndex].value == pairVal) {
                firstLevelMatch = true;
                console.log('******* First level match found *******')
            }
        }
        refreshBoard();

        setTimeout(() => {
            for (const cell of surroundingCells) {
                const eleIndex = trackerTemp.findIndex(el => el.key === cell.key);
                if (eleIndex < 0) continue;
                var newTracker = [...trackerTemp];
                newTracker[eleIndex].glowClass = false;
            }
            refreshBoard();
        }, 1000);
    }

    // const setGlowClass = (cell, value) => {
    //     console.log('Glowing cell ', cell)
    //     const eleIndex = trackerTemp.findIndex(el => el.key === cell.key);
    //     if (eleIndex < 0) return;
    //     var newTracker = [...trackerTemp];
    //     newTracker[eleIndex].glowClass = value && cell.pos;

    //     refreshBoard();
    // }

    const getValueById = id => tracker.find(el => el.key === id);

    const initialize = () => {
        // creating a (a X b) matrix for the board
        // first set the board y axis are initial height, then iterate over the cell height
        for (let y = start.y; y <= boardHeight; y += patternRectHeight) {
            // first set the board x axis as initial width, then iterate overt the cell's width
            for (let x = start.x; x <= boardWidth; x += patternRectWidth) {
                const newEle = {
                    key: x + '-' + y,
                    x, y,
                    value: '',
                    glowClass: 0
                };
                trackerTemp.push(newEle);
                tempCells.push(<Cell
                    setGlowClass={setGlowClass}
                    glowClass={0}
                    getValueById={getValueById}
                    setTrackerValue={setTrackerValue}
                    key={x + '-' + y} x={x} y={y}
                    width={patternRectWidth}
                    height={patternRectHeight}
                    {...patternRectStyle}
                />)
            }
        }
        // trackerTemp
        setTracker(copyData(trackerTemp));
        setCells(tempCells);
        console.log({ trackerTemp, tracker });
        refreshBoard()
    }

    const refreshBoard = () => {
        tempCells = []
        for (let x of trackerTemp) {
            tempCells.push(<Cell
                {...x}
                getValueById={getValueById}
                setTrackerValue={setTrackerValue}
                width={patternRectWidth}
                setGlowClass={setGlowClass}
                height={patternRectHeight}
                {...patternRectStyle}
            />)
        }
        setCells(tempCells);
    }

    useEffect(() => {
        initialize();
    }, [])

    console.log('Before Cells return ', cells, tracker)
    return <g>{cells}</g>
}


export default Cells;