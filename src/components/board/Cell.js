import React, { useState } from 'react';

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

// single cell component.
const Cell = props => {
    const { x, y, width, height, getValueById, setTrackerValue, glowClass, value, setGlowClass } = props; // dimentions of a cell
    const [recStyle, setStyle] = useState(Object.assign(patternRectStyle)); // change the style of the cell on hover
    const [ele, setEle] = useState(value);

    const checkForSOS = (val) => {
        console.log({ width, height })

        console.log('Checkable cells are ', x, y);
        setGlowClass(x, y, val)
        const surroundingCells = [];

        surroundingCells.push({ pos: 'top', key: `${x}-${y - height}` }) // cell's top key
        surroundingCells.push({ pos: 'topRight', key: `${x + width}-${y - height}` }) // cell's top right corner key
        surroundingCells.push({ pos: 'right', key: `${x + width}-${y}` }); // cell's right key
        surroundingCells.push({ pos: 'bottomRight', key: `${x + width}-${y + height}` }) // cell's bottom right corner key
        surroundingCells.push({ pos: 'bottom', key: `${x}-${y + height}` }) // cell's bottom key
        surroundingCells.push({ pos: 'bottomLeft', key: `${x - width}-${y + height}` }) // cell's bottom left corner key
        surroundingCells.push({ pos: 'left', key: `${x - width}-${y}` }); // cell's left key
        surroundingCells.push({ pos: 'topLeft', key: `${x - width}-${y - height}` }) // cell's top left corner key
        console.log('created in Cell',{ surroundingCells })

        // const surroundCell2 = [];

        // surroundCell2.push({ pos: 'top', key: `${x}-${y - height * 2}` }) // cell's top key
        // surroundCell2.push({ pos: 'topRight', key: `${x + width * 2}-${y - height * 2}` }) // cell's top right corner key
        // surroundCell2.push({ pos: 'right', key: `${x + width * 2}-${y}` }); // cell's right key
        // surroundCell2.push({ pos: 'bottomRight', key: `${x + width * 2}-${y + height * 2}` }) // cell's bottom right corner key
        // surroundCell2.push({ pos: 'bottom', key: `${x}-${y + height * 2}` }) // cell's bottom key
        // surroundCell2.push({ pos: 'bottomLeft', key: `${x - width * 2}-${y + height * 2}` }) // cell's bottom left corner key
        // surroundCell2.push({ pos: 'left', key: `${x - width * 2}-${y}` }); // cell's left key
        // surroundCell2.push({ pos: 'topLeft', key: `${x - width * 2}-${y - height * 2}` }) // cell's top left corner key

        // console.log({ surroundCell2 })

        // for (const surrondKey of surroundingCells) {
        //     setGlowClass(surrondKey, true)
        // }

        // for (const surrondKey of surroundCell2) {
        //     setGlowClass(surrondKey, true)
        // }

        // setTimeout(() => {
        //     for (const surrondKey of surroundingCells) {
        //         setGlowClass(surrondKey, false)
        //     }
        // }, 1000);

        setTrackerValue(x + '-' + y, 'S', surroundingCells)
    }

    return <g>
        <rect
            className={'cell-'+glowClass}
            {...recStyle}
            onMouseOut={e => setStyle(patternRectStyle)}
            onMouseOver={e => setStyle(patternRectHoverStyle)}
            x={x} y={y}
            width={width}
            height={height}
            onClick={() => { setEle('S'); checkForSOS('S') }}
            onDoubleClick={() => setEle('O')}
        />
        <text x={x + (width * 0.5)} y={y + (height * 0.7)} fill="red">{ele}</text>
    </g>
}

export default Cell;