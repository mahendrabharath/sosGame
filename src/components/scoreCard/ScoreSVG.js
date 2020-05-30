import React from 'react';

export const ScoreSvg = ({ id: key, score }) => <div className="wrapper">
    <button className='mobile-score-btn'>
        {score}
  <span></span>
        <span></span>
        <span></span>
        <span></span>
    </button>
</div>
