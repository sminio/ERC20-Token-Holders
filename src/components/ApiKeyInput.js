import React from 'react';
import { TextField } from 'ui-neumorphism';
  
const ApiKeyInput = (props) => 
    <>
        <h2>API-Key</h2>
        <TextField 
            rounded
            type="text" 
            placeholder={props.apiKey} 
            onChange={props.handleApiKeyChange}
        />
        <p> {props.tokenHolders == undefined? 
             "Ex.: EK-nYME2-u6tTYfo-L5LES"
             :"" } 
        </p>
    </>

export default ApiKeyInput;