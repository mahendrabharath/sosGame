import React from 'react';
import Cells from './Cells';

// style for the board, i.e the table
const outterRectStyle = {
    style: {
        fill: 'rgba(46, 46, 88, 0)',
        strokeWidth: '1px',
        stroke: 'rgb(12, 56, 175)'
    }
}


const { innerWidth, innerHeight } = window;
const x = innerWidth * 0.05; // sets the tables x cordinate
const y = innerHeight * 0.05; // sets the tables y cordinate
const width = innerWidth - (innerWidth * 0.1); // leaves a gap of 0.1% for width from the window horizontal edges
const height = innerHeight - (innerHeight * 0.1); // leaves a gap of 0.1% for width from the window vertical edges

const boardDimensions = { x, y, width, height }

const patternRectWidth = innerWidth * 0.05; // individual cell's width is 5% of the table's width
const patternRectHeight = innerHeight * 0.05; // individual cell's height is 5% of the table's height

console.log(boardDimensions)

const Board = () => <div>
    <svg width={innerWidth} height={innerHeight}>
        <rect x={x} y={y} width={width} height={height} {...outterRectStyle} />

        <Cells start={{ x, y }}
            patternRectWidth={Math.round(patternRectWidth)}
            patternRectHeight={Math.round(patternRectHeight)}
            boardWidth={Math.round(width)} boardHeight={Math.round(height)}
        />


        {/* <rect x={x} y={y} width={patternRectWidth} height={patternRectHeight} {...patternRectStyle} />
        <text x="100" y="150" fill="red">I love SVG!</text> */}
    </svg>
</div>

export default Board;