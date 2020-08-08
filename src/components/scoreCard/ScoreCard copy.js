import React from 'react';
import { AIName } from '../../helpers/utils';

const ScoreCard = props => {
    const { setPlayerTurnColor, score, playerName } = props;

    return <div>
        <div className='score-card-active' >
            <h2>P1: </h2>
            <p>{playerName} - {score[0].score}</p>
            {/* <div className="bar">
                <div className="emptybar"></div>
                <div className="filledbar"></div>
            </div> */}
        </div>
        <div>
            <h2 className='playing'>{playerName}, playing</h2>
        </div>
        <div>
            <h2>P2: </h2>
            <p>{AIName} - {score[1].score}</p>
            <div className="bar">
                <div className="emptybar"></div>
                <div className="filledbar"></div>
            </div>
        </div>
    </div>
}

export default ScoreCard;