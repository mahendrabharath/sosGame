import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { setupGame } from '../../Actions';


const mapDispatchToProps = dispatch => ({
    setupGame: payload => dispatch(setupGame(payload))
  });

const GetUserDetails = props => {
    const { setName, setCount, name, count } = props;

    return <div>
        <h2>Get user details</h2>

        <span className="p-float-label">
            <InputText id="float-input" type="text" size="30" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="float-input">Player Name</label>
        </span>
        <span className="p-float-label">
            <InputText id="float-input" type="text" size="30" value={count} onChange={(e) => setCount(e.target.value)} />
            <label htmlFor="float-input">Cells count</label>
        </span>
        <Button label="Secondary" className="p-button-raised p-button-secondary" />
    </div>
}

export default GetUserDetails;