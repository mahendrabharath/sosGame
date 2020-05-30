import React from 'react';
import { ScoreSvg } from '../ScoreSVG';
import './MobileScoreCard.css';
import { AIName } from '../../../helpers/utils';

export const MobileScoreCard = props => {
    const { setPlayerTurnColor, score, playerName, playerTurn, isAIPlaying } = props;

    return <div className="mobile-score-card-container">
        <div className={isAIPlaying ? "mobile-profile active" : "mobile-profile"}>
            <div className="mobile-photo"><img src="src/assets/images/profile-512.jpg" />
            </div>
            <div className="mobile-content">
                <div className="mobile-text">
                    <h5>{AIName}</h5>
                    <div className="mobile-bar">
                        <div className="mobile-emptybar"></div>
                        <div className="mobile-filledbar"></div>
                    </div>
                    {/* <!-- <h6>Front-end Web Designer</h6> --> */}
                </div>
                <div className="mobile-score-container">
                    <ScoreSvg key={1} id={1} score={score[1].score}/>
                </div>
            </div>
        </div>

        <div className={!isAIPlaying ? "mobile-profile active" : "mobile-profile"}>
            <div className="mobile-photo"><img src="src/assets/images/myAvatar.png" />
            </div>
            <div className="mobile-content">
                <div className="mobile-text">
                    <h5>{playerName}</h5>
                    <div className="mobile-bar">
                        <div className="mobile-emptybar"></div>
                        <div className={!isAIPlaying ? "mobile-filledbar mobile-filledbar-active" : 'mobile-filledbar'}></div>
                        {/* <div className="mobile-filledbar"></div> */}
                    </div>
                    {/* <!-- <h6>Front-end Web Designer</h6> --> */}
                </div>
                <div className="mobile-score-container">
                    <ScoreSvg key={2} id={2} score={score[0].score}/>
                </div>
            </div>
        </div>

    </div>
}