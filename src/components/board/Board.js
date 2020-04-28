import React, { useState } from 'react';
import Cells from './Cells';
import { copyData } from '../../helpers/utils';

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

const patternRectWidth = 40; // individual cell's width is 5% of the table's width
const patternRectHeight = 40; // individual cell's height is 5% of the table's height

console.log(boardDimensions)

const Board = () => {
    const [playerTurn, setPlayerTurn] = useState('Devs');
    const [score, setScore] = useState([{ name: 'Devs', score: 0 }, { name: 'Siri', score: 0 }]);
    const setPlayerTurnColor = player => player === playerTurn ? '#ce1d1de8' : 'black';

    const changePlayer = () => setPlayerTurn(oldVal => oldVal === 'Siri' ? 'Devs' : 'Siri');

    const setScoreToPlayer = (count) => {
        const playerIndex = score.findIndex(arg => arg.name == playerTurn);
        const prevScore = copyData(score);
        prevScore[playerIndex].score += count;
        setScore(prevScore);
    }

    return <div>
        <div style={{ position: 'fixed', color: setPlayerTurnColor('Devs') }}><h2>P1: </h2><p>Devs - {score[0].score}</p></div>
        <div><h2 className='playing'>{playerTurn}, playing</h2></div>
        <svg width={innerWidth} height={innerHeight}>
            <rect x={x} y={y} width={width} height={height} {...outterRectStyle} />

            <Cells start={{ x, y }}
                patternRectWidth={Math.round(patternRectWidth)}
                patternRectHeight={Math.round(patternRectHeight)}
                boardWidth={Math.round(width)} boardHeight={Math.round(height)}
                changePlayer={changePlayer}
                player={playerTurn}
                setScoreToPlayer={setScoreToPlayer}
                score={score}
            />

            {/* <rect x={x} y={y} width={patternRectWidth} height={patternRectHeight} {...patternRectStyle} />
        <text x="100" y="150" fill="red">I love SVG!</text> */}
        </svg>
        <div style={{ position: 'absolute', top: '0px', right: '0px', padding: '5px', color: setPlayerTurnColor('Siri') }}>
            <h2>P2: </h2>
            <p>Siri - {score[1].score}</p>
        </div>
    </div>
}
export default Board;