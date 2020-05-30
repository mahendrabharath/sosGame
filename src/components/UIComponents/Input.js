import React from 'react';

const UIInput = props => {
    return <div>
        <input type="text" name="name" class="question" id="nme" required autocomplete="off" />
        <label for="nme"><span>What's your name?</span></label>
    </div>
}