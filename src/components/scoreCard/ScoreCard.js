import React, { useEffect, useState } from 'react';
import { AIName } from '../../helpers/utils';

const ScoreCard = props => {
    const { setPlayerTurnColor, score, playerName, playerTurn } = props;
    // const isAIPlaying = player === playerTurn;
    const [scoreChange, setScoreChange] = useState('');
    useEffect(() => {
       const palyerScore = score.find(el => el.name == playerTurn);
       palyerScore.score && setScoreChange(playerTurn);
        setTimeout(() => setScoreChange(''), 300);
    }, [score])

    return <div className="score-card-container">
        <div className="profile">
            <div className="photo"><img src="src/assets/images/profile-512.jpg" />
            </div>
            <div className="content">
                <div className="text">
                    <h3>{AIName}</h3>
                    <div className="bar">
                        <div className="emptybar"></div>
                        <div className={playerTurn === AIName ? "filledbar filledbar-active" : 'filledbar'}></div>
                    </div>
                    <h6>Front-end Web Designer</h6>
                </div>
                <div className={scoreChange === AIName ? "btn btn-active" : 'btn'}><h3 className='score'>{score[1].score}</h3></div>
            </div>
        </div>

        <div className="profile">
            <div className="photo"><img src="src/assets/images/myAvatar.png" />
            </div>
            <div className="content">
                <div className="text">
                    <h3>{playerName}</h3>
                    <div className="bar">
                        <div className="emptybar"></div>
                        <div className={playerTurn == playerName ? "filledbar filledbar-active" : 'filledbar'}></div>
                    </div>
                    <h6>Front-end Web Designer</h6>
                </div>
                <div className={scoreChange === playerName ? "btn btn-active" : 'btn'}><h3 className='score'>{score[0].score}</h3></div>
            </div>
        </div>

    </div>
}

export default ScoreCard;