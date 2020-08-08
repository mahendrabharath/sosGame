import React from 'react';
import { awakeVideoSrc } from '../../helpers/utils';

export const AwakeView = () => <div className='awake-container'>
  <video width="320" height="240" autoPlay muted controls loop>
    <source src="/assets/video/video1.mp4" type="video/mp4" />
    {/* <source src="movie.ogg" type="video/ogg"/> */}
Your browser does not support the video tag.
</video>
</div>;
