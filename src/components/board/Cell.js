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
    const { x, y, width, height, getValueById, setTrackerValue, glowClass, value, setGlowClass, index } = props; // dimentions of a cell
    const [recStyle, setStyle] = useState(Object.assign(patternRectStyle)); // change the style of the cell on hover
    const [ele, setEle] = useState(value);

    const checkForSOS = (val) => {
        console.log('Checkable cells are ', x, y, ' given val is -> ', val);
        setGlowClass(x, y, val)

        // setTrackerValue(x + '-' + y, val)
    }

    return <g>
        <rect
            className={'cell-' + glowClass}
            {...recStyle}
            onMouseOut={e => setStyle(patternRectStyle)}
            onMouseOver={e => setStyle(patternRectHoverStyle)}
            x={x} y={y}
            width={width}
            height={height}
            onClick={(e) => {
                if (e.altKey) {
                    setEle('O'); checkForSOS('O');
                } else {
                    setEle('S'); checkForSOS('S')
                }
            }}
            // onClick={() =>  setTrackerValue(x + '-' + y, 'S')}
            onDoubleClick={() => { setEle('O'); checkForSOS('O') }}
        />
        <text x={x + (width * 0.5)} y={y + (height * 0.7)} fill="red">{value}</text>
       {recStyle.style.strokeWidth === '7px' && <text x={x} y={y + 6} fontSize='6'>{index}</text>} 
    </g>
}

export default Cell;