import React from 'react';
import { TextField } from 'ui-neumorphism';

const LimitHolderInput = (props) => 
<>
    <h2> # of Top Holders </h2>
    <TextField 
        rounded
        width={100} 
        type="text" 
        placeholder="10" 
        onChange={props.handleLimitHoldersChange} />
    <p> { props.tokenHolders == undefined? 
            "1-1000"
            :"" } 
    </p>
</>

export default LimitHolderInput;