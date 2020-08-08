import React from 'react';
import './Input.css'

const UIInput = props => {
    const {value, onChange, label} = props;

    return <div>
        <input type="text" name="name" className="question" id="nme" required autoComplete="off" value={value} onChange={onChange} />
        <label htmlFor="nme"><span>{label}</span></label>
    </div>
}

export default UIInput;