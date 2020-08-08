
import React, { useState } from 'react';
import './RangeSlider.scss'

const RangeSlider = props => {
    const { max = 100, min = 1, step = 1, prefix, onChange: setSliderVal, val: sliderVal } = props;
    // const [sliderVal, setSliderVal] = useState(max);
    const [sliderActive, setSliderActive] = useState(false)
    /*
    if max = 7,  [0, 1, 3, 5, 7, 9, 12]
    
    if max = 10, [0, 1, 2, 3, 4, 5, 5, 6, 7 ,8]
    */


    const bubblePos = () => {
        const post = sliderVal / max;
        const left = post * 300;
        return `${left}px`
        // return `calc(${pos}% + 47px)`
        //  {newVa/lue, newPosition};
    }

    const showTearDropOnChange = (e) => {
        // console.log(e.clientX)
        setSliderActive(true);
    }

    const hideTearDropChange = () => {
        setSliderActive(false);
    }

    const tearDropEvents = {
        onMouseOver: showTearDropOnChange,
        onMouseOut: hideTearDropChange,
        onTouchMove: showTearDropOnChange,
        onTouchEnd: hideTearDropChange
    }
    return < div className="container" >

        <div className="range-slider">
            {  <span {...tearDropEvents} id="rs-bullet" style={{left: bubblePos(), opacity: sliderActive ? 1 : 0}} className="rs-label"><p prefix={prefix}>{sliderVal}</p></span>}
            <input {...tearDropEvents} id="rs-range-line" onChange={e => {
                const { value } = e.target;
                setSliderVal(value * step);
            }} className="rs-range" type="range" value={sliderVal} min={min} max={max} />

        </div>

        <div className="box-minmax">
            <span>{min}</span><span>{max}</span>
        </div>

    </div>


    {/*return <div className='range-slide-component'>
        <div style={{ position: 'absolute', width: '200px' }}>
            <span>{min}</span>

            <input type="range" {...tearDropEvents} min={min}
                max={max} step={step} value={sliderVal} onChange={e => setSliderVal(e.target.value * step)} className="range blue" />
            <span>{max}</span>
            {sliderActive && <span className='tear-drop' style={{ position: 'absolute', left: bubblePos() }} {...tearDropEvents}>
                <p className='tear-drop-text'>
                    {sliderVal}
                </p>
            </span>}
        </div>
</div> */}
}

export default RangeSlider;


// var inputRange = document.getElementsByClassName('range')[0],
//     maxValue = 100, // the higher the smoother when dragging
//     speed = 5,
//     currValue, rafID;

// // set min/max value
// inputRange.min = 0;
// inputRange.max = maxValue;

// // listen for unlock
// function unlockStartHandler() {
//     // clear raf if trying again
//     window.cancelAnimationFrame(rafID);

//     // set to desired value
//     currValue = +this.value;
// }

// function unlockEndHandler() {

//     // store current value
//     currValue = +this.value;

//     // determine if we have reached success or not
//     if(currValue >= maxValue) {
//         successHandler();
//     }
//     else {
//         rafID = window.requestAnimationFrame(animateHandler);
//     }
// }

// // handle range animation
// function animateHandler() {

//     // calculate gradient transition
//     var transX = currValue - maxValue;

//     // update input range
//     inputRange.value = currValue;

//     //Change slide thumb color on mouse up
//     if (currValue < 20) {
//         inputRange.classList.remove('ltpurple');
//     }
//     if (currValue < 40) {
//         inputRange.classList.remove('purple');
//     }
//     if (currValue < 60) {
//         inputRange.classList.remove('pink');
//     }

//     // determine if we need to continue
//     if(currValue > -1) {
//       window.requestAnimationFrame(animateHandler);   
//     }

//     // decrement value
//     currValue = currValue - speed;
// }

// // handle successful unlock
// function successHandler() {
//   alert('Unlocked');
// };

// // bind events
// inputRange.addEventListener('mousedown', unlockStartHandler, false);
// inputRange.addEventListener('mousestart', unlockStartHandler, false);
// inputRange.addEventListener('mouseup', unlockEndHandler, false);
// inputRange.addEventListener('touchend', unlockEndHandler, false);

// // move gradient
// inputRange.addEventListener('input', function() {
//     //Change slide thumb color on way up
//     if (this.value > 20) {
//         inputRange.classList.add('ltpurple');
//     }
//     if (this.value > 40) {
//         inputRange.classList.add('purple');
//     }
//     if (this.value > 60) {
//         inputRange.classList.add('pink');
//     }

//     //Change slide thumb color on way down
//     if (this.value < 20) {
//         inputRange.classList.remove('ltpurple');
//     }
//     if (this.value < 40) {
//         inputRange.classList.remove('purple');
//     }
//     if (this.value < 60) {
//         inputRange.classList.remove('pink');
//     }
// });