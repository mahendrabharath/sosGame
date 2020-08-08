import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { setupGame, changeBoardDimensions } from '../../Actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import UIInput from '../UIComponents/Input/Input';
import { r } from '../../helpers/utils';
import RangeSlider from '../UIComponents/RangeSlider/RangeSlider';
import GsapModal from '../Modal/Modal';

const { round } = Math;
const mapDispatchToProps = dispatch => ({
    setupGame: payload => dispatch(setupGame(payload)),
    changeBoardDimensions: payload => dispatch(changeBoardDimensions(payload))
});


const { innerWidth, innerHeight } = window;
const x = round(innerWidth * 0.05); // sets the tables x cordinate
const y = round(innerHeight * 0.05); // sets the tables y cordinate

let widthMargin = 0.35; // leaves 3.5% gap from the screen

if (innerWidth <= 450) {
    widthMargin = 0.2
}

const width = innerWidth - (innerWidth * widthMargin); // leaves a gap of 0.1% for width from the window horizontal edges
const height = innerHeight - (innerHeight * 0.1); // leaves a gap of 0.1% for width from the window vertical edges


const patternRectWidth = 40; // individual cell's width is 5% of the table's width
const patternRectHeight = 40;


const rnd = num => Math.round(num);
const noOfCells = { x: Math.ceil((rnd(width) - x) / 40), y: Math.ceil((rnd(height) - y) / 40) };
console.log('Number of cells is', noOfCells.x * noOfCells.y, noOfCells);



const GetUserDetails = props => {

    const [name, setName] = useState('Devs');
    const [cellCount, setCellCount] = useState(noOfCells.x * noOfCells.y);
    const [noOfRows, setNoOfRows] = useState(noOfCells.x);
    const [noOfCols, setNoOfCols] = useState(noOfCells.y);
    const [showModal, setShowModal] = useState(false);

    const startGame = () => {
        props.setupGame({ name, cellCount })
        props.history.push('/')
    }

    useEffect(() => {

        const latestWidth = (40 * noOfRows) + x;
        console.log({ latestWidth })


        const latestHeight = (40 * noOfCols) + y;
        console.log({ latestHeight })


        setCellCount(noOfRows * noOfCols);
        props.changeBoardDimensions({ width: latestWidth, height: latestHeight })
    }, [noOfRows, noOfCols])

    // useEffect(() => {

    //     const latestHeight = (40 * noOfCols) + y;
    //     console.log({ latestHeight })
    //     setCellCount(noOfRows * noOfCols);
    //     props.changeBoardDimensions({ height: latestHeight, width })
    // }, [noOfCols])


    const validator = n => /^[0-9]*$/.test(n) ? n : 0;

    function checkVal(setter) {
        return function (validate) {
            return function (val) {
                return setter(Number(validate(val)))
            }
        }
    }

    const setValidRowNo = checkVal(setNoOfRows)(validator);
    const setValidColNo = checkVal(setNoOfCols)(validator);

    // validateNumbers(val)(Number)(setVal)

    return <div>
        <h2>Get user details</h2>

        <UIInput value={name} label={"What's your name?"} onChange={e => setName(e.target.value)} />
        <RangeSlider min={1} max={noOfCells.x} val={noOfRows} onChange={setValidRowNo} prefix={'rows'} step={1} />
        <UIInput value={noOfRows} label={'Rows'} onChange={e => setValidRowNo((e.target.value))} />
        <RangeSlider min={1} max={noOfCells.y} val={noOfCols} step={1} onChange={setValidColNo} prefix={'cols'} />
        <UIInput value={noOfCols} label={'Columns'} prefix={'cols'} onChange={e => setValidColNo((e.target.value))} />
        <UIInput value={cellCount} label={'Total number of cells (Rows * Cols)'} onChange={e => setCellCount(e.target.value)} />

        {/* <video width="320" height="240" muted controls >
            <source src="/assets/video/SOS_DEMO.mp4" type="video/mp4" />
                Your browser does not support the video tag.
                </video> */}
        <GsapModal showModal={showModal} mobileClass={false} setShowModal={setShowModal}>
            <div style={{ position: 'absolute', width: '100%', height: '100%', background: '#dadada' }}>
                <iframe width="100%" height="60%" src="https://www.youtube.com/embed/EbKPaQn9c9M" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <span onClick={() => setShowModal(false)} className="close thick pointy">Close</span>
            </div>
        </GsapModal>

        <Button label="Start" onClick={() => startGame()} className="p-button-raised p-button-secondary" />
        <Button label="Show Demo" onClick={() => {
            scroll(0, 0);
            setShowModal(true);
        }} className="p-button-raised p-button-secondary" />
    </div>
}

export default withRouter(connect(null, mapDispatchToProps)(GetUserDetails));