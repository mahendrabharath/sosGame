import React, { useState } from 'react';
import Cells from './Cells';
import { copyData, AIName, r } from '../../helpers/utils';
import { connect } from 'react-redux';
import ScoreCard from '../scoreCard/ScoreCard';


const mapStateToProps = state => ({
    gameData: state
});


// style for the board, i.e the table
const outterRectStyle = {
    style: {
        fill: 'rgba(46, 46, 88, 0)',
        strokeWidth: '1px',
        stroke: 'rgb(12, 56, 175)'
    }
}


const { innerWidth, innerHeight } = window;
const x = r(innerWidth * 0.05); // sets the tables x cordinate
const y = r(innerHeight * 0.05); // sets the tables y cordinate
const width = innerWidth - (innerWidth * 0.25); // leaves a gap of 0.1% for width from the window horizontal edges
const height = innerHeight - (innerHeight * 0.1); // leaves a gap of 0.1% for width from the window vertical edges

const boardDimensions = { x, y, width, height }

const patternRectWidth = 40; // individual cell's width is 5% of the table's width
const patternRectHeight = 40; // individual cell's height is 5% of the table's height

console.log(boardDimensions)

const Board = (props) => {
    const { name: playerName } = props.gameData;
    const [playerTurn, setPlayerTurn] = useState(playerName);
    const [score, setScore] = useState([{ name: playerName, score: 0 }, { name: AIName, score: 0 }]);
    const setPlayerTurnColor = player => player === playerTurn ? '#ce1d1de8' : 'black';

    const changePlayer = () => setPlayerTurn(oldVal => oldVal === AIName ? playerName : AIName);

    const setScoreToPlayer = (count) => {
        const playerIndex = score.findIndex(arg => arg.name == playerTurn);
        const prevScore = copyData(score);
        prevScore[playerIndex].score += count;
        setScore(prevScore);
    }
debugger
    return <div className='board-container'>
        {/* <div style={{ position: 'fixed', color: setPlayerTurnColor(playerName) }}><h2>P1: </h2><p>{playerName} - {score[0].score}</p></div>
        <div><h2 className='playing'>{playerName}, playing</h2></div> */}
        <ScoreCard setPlayerTurnColor={setPlayerTurnColor} score={score} playerName={playerName} playerTurn={playerTurn} />
        <div className='game-board'>
            <svg width={width + patternRectWidth} height={height + patternRectHeight}>
                {/* <rect x={x} y={y} width={width} height={height} {...outterRectStyle} /> */}
                <Cells start={{ x, y }}
                    patternRectWidth={Math.round(patternRectWidth)}
                    patternRectHeight={Math.round(patternRectHeight)}
                    boardWidth={Math.round(width)} boardHeight={Math.round(height)}
                    changePlayer={changePlayer}
                    player={playerTurn}
                    setScoreToPlayer={setScoreToPlayer}
                    score={score}
                />
            </svg>
        </div>
        {/* <div style={{ position: 'absolute', top: '0px', right: '0px', padding: '5px', color: setPlayerTurnColor(AIName) }}>
            <h2>P2: </h2>
            <p>{AIName} - {score[1].score}</p>
        </div> */}
    </div>
}
export default connect(mapStateToProps, null)(Board);