import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { setupGame } from '../../Actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


const mapDispatchToProps = dispatch => ({
    setupGame: payload => dispatch(setupGame(payload))
});

const GetUserDetails = props => {

    const [name, setName] = useState('Devs');
    const [cellCount, setCellCount] = useState('50');

    const startGame = () => {
        props.setupGame({ name, cellCount })
        props.history.push('/')
    }

    return <div>
        <h2>Get user details</h2>

        <span className="p-float-label">
            <InputText id="float-input" type="text" size="30" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="float-input">Player Name</label>
        </span>
        <span className="p-float-label">
            <InputText id="float-input" type="text" size="30" value={cellCount} onChange={(e) => setCellCount(e.target.value)} />
            <label htmlFor="float-input">Cells count</label>
        </span>
        <Button label="Start" onClick={() => startGame()} className="p-button-raised p-button-secondary" />
    </div>
}

export default withRouter(connect(null, mapDispatchToProps)(GetUserDetails));