import React, { useEffect, useState } from 'react';
import { AIName } from '../../helpers/utils';
import { MobileScoreCard } from './MobileScoreCardComponent/MobileScoreCard';

const ScoreCard = props => {
    const { setPlayerTurnColor, score, playerName, playerTurn, mobileClass } = props;
    // const isAIPlaying = player === playerTurn;
    const [scoreChange, setScoreChange] = useState('');
    useEffect(() => {
        const palyerScore = score.find(el => el.name == playerTurn);
        palyerScore.score && setScoreChange(playerTurn);
        setTimeout(() => setScoreChange(''), 300);
    }, [score])

    const isAIPlaying = playerTurn === AIName;

    if (mobileClass) {
        return <MobileScoreCard isAIPlaying={isAIPlaying} {...props} />;
    }

    return <div className={"score-card-container"}>
        {/* <div className="crown">
            <img src="src/assets/images/crown-main.png" />
        </div> */}
        <div className={"profile"}>
            <div className="photo"><img src={score[1].image} />
            </div>
            <div className="content">
                <div className="text">
                    <h3>{AIName}</h3>
                    <div className="bar">
                        <div className="emptybar"></div>
                        <div className={isAIPlaying ? "filledbar filledbar-active" : 'filledbar'}></div>
                    </div>
                    <h6>Front-end Web Designer</h6>
                </div>
                <div className={scoreChange === AIName ? "btn btn-active" : 'btn'}><h3 className='score'>{score[1].score}</h3></div>
            </div>
        </div>

        <div className={"profile"}>
            <div className="photo">
                <img src={score[0].image} />
            </div>
            <div className="content">
                <div className="text">
                    <h3>{playerName}</h3>
                    <div className="bar">
                        <div className="emptybar"></div>
                        <div className={!isAIPlaying ? "filledbar filledbar-active" : 'filledbar'}></div>
                    </div>
                    <h6>Front-end Web Designer</h6>
                </div>
                <div className={scoreChange !== AIName ? "btn btn-active" : 'btn'}><h3 className='score'>{score[0].score}</h3></div>
            </div>
        </div>

    </div>
}

export default ScoreCard;
/*
crown image urls
https://toppng.com/uploads/preview/crown-royal-clipart-transparent-background-queen-crown-drawi-1156291683921gwgtbkpi.png
https://www.pngitem.com/pimgs/m/513-5136569_royal-crown-curved-queen-crown-no-background-hd.png
https://www.clipartmax.com/png/middle/19-199253_crown-clipart-no-background-royal-gold-and-blue-crown.png
*/