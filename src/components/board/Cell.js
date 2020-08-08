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

// on hover cell style
const patternRectHoverErrorStyle = {
    style: {
        fill: 'rgb(255, 150, 150)',
        stroke: 'aquamarine',
        strokeWidth: '7px'
    }
}

// single cell component.
const Cell = props => {
    const { x, y, width, height, getValueById, setTrackerValue, glowClass, value, setGlowClass, index } = props; // dimentions of a cell
    const [recStyle, setStyle] = useState(Object.assign(patternRectStyle)); // change the style of the cell on hover
    const [ele, setEle] = useState(value);
    const [warning, setWarning] = useState('')

    const checkForSOS = (val) => {
        console.log('Checkable cells are ', x, y, ' given val is -> ', val);
        setGlowClass(x, y, val)

        // setTrackerValue(x + '-' + y, val)
    }

    // changes color of the cell based on the cell value.
    const cellHoverCss = (eventType) => {
        if (eventType === 'OVER') value ? setStyle(patternRectHoverErrorStyle) : setStyle(patternRectHoverStyle)
        else if (eventType === 'OUT') setStyle(patternRectStyle)
    }

    const addShakeAnimation = () => {
        setWarning('warning-shake'); setTimeout(() => setWarning(''), 1000); return;
    }

    let clickCount = 1;
    let timer = null;
    return <g>
        <rect
            id={index == 0 ? 'myCell' : ''}
            className={'cell-' + glowClass}
            {...recStyle}
            onMouseOut={e => cellHoverCss('OUT')}
            onMouseOver={e => cellHoverCss('OVER')}
            x={x} y={y}
            width={width}
            height={height}
            onClick={(e) => {
                if (value) {addShakeAnimation(); return}
                e.persist()
                if (clickCount < 2) {
                    // console.log('Click Increased ', clickCount)
                    clickCount++;
                    timer = setTimeout(() => {
                        // console.log('Single click')
                        if (e.altKey) {
                            setEle('O'); checkForSOS('O');
                            console.log('Alt O')
                        } else {
                            setEle('S'); checkForSOS('S')
                            console.log('S')
                        }
                        clickCount = 0;
                    }, 300)
                } else {
                    clearTimeout(timer)
                    // console.log('Double click')
                    console.log('Dbl click O')
                    setEle('O'); checkForSOS('O');
                }

            }}
        // onClick={() =>  setTrackerValue(x + '-' + y, 'S')}
        // onDoubleClick={() => {
        //     console.log('Double clicked')
        //     setEle('O'); checkForSOS('O')
        // }}
        />
        <text className={warning} onMouseOut={e => cellHoverCss('OUT')} onClick={() => {addShakeAnimation(); return;}}
            onMouseOver={e => cellHoverCss('OVER')} x={x + (width * 0.35)} y={y + (height * 0.6)} fill="red">{value}</text>
        {recStyle.style.strokeWidth === '7px' && <text x={x} y={y + 6} fontSize='6'>{index}</text>}
    </g>
}

export default Cell;