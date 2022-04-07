import React from 'react';
import { TextField } from 'ui-neumorphism';
  
const AddressInput = (props) => 
  <>
    <h2> ERC20 Token Address </h2>
    <TextField 
      rounded
      width={500} 
      type="text" 
      onChange={props.handleTokenAddressChange} />
    <p> { props.tokenHolders == undefined? 
          "Ex.: 0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30"
          :"" } 
    </p>
  </>

export default AddressInput;