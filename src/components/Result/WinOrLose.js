import React, { useEffect, useRef } from 'react';
import './WinOrLose.css';
import { TimelineMax, Power4, Power3, Power2, gsap } from 'gsap/gsap-core';
import { AIName } from '../../helpers/utils';
import { withRouter } from 'react-router';

const STAR_COLORS = [
    { fill: '#eade9c', stroke: '#775d5d' },
    { fill: '#9cc1ea', stroke: '#dadcab' },
    { fill: '#9cc1ea', stroke: '#dadcab' },
    { fill: 'gold', stroke: 'violet' }
]

const getRandColors = (result) => {
    const randIndex = Math.floor(Math.random() * 4);
    if (result) return {fill: 'black', stroke: 'violet'}
    return STAR_COLORS[randIndex]
}

const GenerateStars = ({result}) => {
    const s1 = useRef(null)

    useEffect(() => {

        const star1 = s1.current;
        var newAnimation = new TimelineMax({
            paused: false,
        }).to(star1, 1.5, { x: Math.floor(Math.random() * 100 + 10) })
            .to(star1, 4, { y: -Math.floor(Math.random() * 150 + 10), rotation: Math.floor(Math.random() * 4) * 90, autoAlpha: 0, scale: Math.random() >= 0.5 ? 1 : 2 }).play();
        // animate = newAnimation;
    }, [])

    return <div ref={s1}>
        <svg className='svg-str' width="24" height="24" viewBox="0 0 24 24"><path {...getRandColors(result)} d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
    </div>
}


const WinOrLose = props => {
    const { score } = props;
    const s2 = useRef(null)
    const s3 = useRef(null)
    const s4 = useRef(null)

    let animate = null;

    const getWinnerName = () => {
        const scoreMap = score.map(el => el.score)
        const winnerIndex = scoreMap.indexOf(Math.max(...scoreMap));
        return winnerIndex >= 0 ? score[winnerIndex] : {};
    }

    const randStars = [];

    for (var i = 0; i <= 30; i++) {
        randStars.push(<GenerateStars result={getWinnerName().name == AIName} key={i} />);
    }

    if (getWinnerName().name == AIName) {
        return <div onClick={() => props.history.push('/setup')}>
        {/* <h1>Win</h1>
        <div className={"win-profile"}>
            <div className="photo">
                <img src={getWinnerName().image} />
            </div>
            <p>Congrats!! {getWinnerName().name} you scored <u>{getWinnerName().score}</u> units
            using {getWinnerName().cellsUsed} cells</p> 
        </div>
        {randStars} */}

        <h1>You Lost</h1>
        <div className={"win-profile"}>
            <div className="photo">
                <img src={getWinnerName().image} />
            </div>
            <p>{getWinnerName().name} scored <u>{getWinnerName().score}</u> units, against you.
            using {getWinnerName().cellsUsed} cells only...</p> 
        </div>
        <p>‘‘Better luck next time loser!!! ‚‚ <sub>-Siri</sub></p>
        {/* <button onClick={() => animate.play().timeScale(5)}>Play</button> */}
        {randStars}
    </div >
    }

    return <div className={getWinnerName().name == AIName ? 'result-win' : 'result-lose'} onClick={() => props.history.push('/setup')}>
        <h1>You Won</h1>
        <div className={"win-profile"}>
            <div className="photo">
                <img src={getWinnerName().image} />
            </div>
            <p>Congrats!! {getWinnerName().name} you scored <u>{getWinnerName().score}</u> units
            using {getWinnerName().cellsUsed} cells</p> 
        </div>
        {/* <button onClick={() => animate.play().timeScale(5)}>Play</button> */}
        {randStars}
    </div >
}

export default withRouter(WinOrLose)