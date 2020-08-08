import React, { useState, useEffect } from 'react';
import Cells from './Cells';
import { copyData, AIName, r, userData } from '../../helpers/utils';
import { connect } from 'react-redux';
import ScoreCard from '../scoreCard/ScoreCard';
import GsapModal from '../Modal/Modal';
import  WinOrLose  from '../Result/WinOrLose';
const { round } = Math;

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


// const { innerWidth, innerHeight } = window;
const x = round(innerWidth * 0.05); // sets the tables x cordinate
const y = round(innerHeight * 0.05); // sets the tables y cordinate

// let widthMargin = 0.35; // leaves 3.5% gap from the screen

// if (innerWidth <= 450) {
//     widthMargin = 0.2
// }

// const width = innerWidth - (innerWidth * widthMargin); // leaves a gap of 0.1% for width from the window horizontal edges
// const height = innerHeight - (innerHeight * 0.1); // leaves a gap of 0.1% for width from the window vertical edges

// const boardDimensions = { x, y, width, height }

const patternRectWidth = 40; // individual cell's width is 5% of the table's width
const patternRectHeight = 40; // individual cell's height is 5% of the table's height

// console.log(boardDimensions); // Math.ceil((936 - 72) / 40)
// const rnd = num => Math.round(num);
// const noOfCells = { x: Math.ceil((rnd(width) - x) / 40), y: Math.ceil((rnd(height) - y) / 40) };
// console.log('Number of cells is', noOfCells.x * noOfCells.y, noOfCells);


const Board = (props) => {
    const { name: playerName, width, height } = props.gameData;
    const [playerTurn, setPlayerTurn] = useState(playerName);
    const [score, setScore] = useState(userData(playerName));
    const [showModal, setShowModal] = useState(false);
    const setPlayerTurnColor = player => player === playerTurn ? '#ce1d1de8' : 'black';



    // console.log(boardDimensions); // Math.ceil((936 - 72) / 40)
    // const rnd = num => Math.round(num);
    const noOfCells = { x: Math.ceil((round(width) - x) / 40), y: Math.ceil((round(height) - y) / 40) };
    console.log('Number of cells is', noOfCells.x * noOfCells.y, noOfCells);



    const changePlayer = () => setPlayerTurn(oldVal => oldVal === AIName ? playerName : AIName);

    const setScoreToPlayer = (count) => {
        const playerIndex = score.findIndex(arg => arg.name == playerTurn);
        const prevScore = copyData(score);
        prevScore[playerIndex].score += count;
        prevScore[playerIndex].cellsUsed += 1;
        setScore(prevScore);

        // console.log('Called setScoreToPlayer')
        let noOfCellsOccupied = 0;
        prevScore.map(el => noOfCellsOccupied += el.cellsUsed);
        console.log("noOfCellsOccupied ", noOfCellsOccupied)
        if (noOfCellsOccupied == noOfCells.x * noOfCells.y) {
            setShowModal(true)
        }
    }


    const mobileClass = innerWidth <= 450 ? 'mobile-' : '';





    return <div className={mobileClass + 'board-container'}>
        {/* <div style={{ position: 'fixed', color: setPlayerTurnColor(playerName) }}><h2>P1: </h2><p>{playerName} - {score[0].score}</p></div>
        <div><h2 className='playing'>{playerName}, playing</h2></div> */}
        <ScoreCard mobileClass={mobileClass} setPlayerTurnColor={setPlayerTurnColor} score={score} playerName={playerName} playerTurn={playerTurn} />
        <div className={playerTurn == AIName ? 'game-board-wait' : 'game-board'}>
            <svg width={width + patternRectWidth} height={height + patternRectHeight} style={playerTurn == AIName ? { pointerEvents: 'none' } : {}}>
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
        <div>
            {/* <button onClick={() => setShowModal(true)}>Show</button> */}
            <GsapModal showModal={showModal} mobileClass={mobileClass} setShowModal={setShowModal} score={score}>
                <WinOrLose score={score} />
            </GsapModal>
        </div>
    </div>
}
export default connect(mapStateToProps, null)(Board);