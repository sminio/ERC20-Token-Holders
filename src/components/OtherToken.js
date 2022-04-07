import React from 'react';
import { H6 } from 'ui-neumorphism';

function OtherToken(props){
    /** gives info about the other token that parent hodler has **/
  
  const otherTokenBalance = (props.balance / 10 ** props.decimals).toFixed(5);
  return (
    <> 
      <H6 dark={props.darkMode}>
        <a 
          href={`https://etherscan.io/token/${props.address}`} 
          target="_blank">
            {`${props.name} (${props.symbol})`}
        </a>
      </H6>
      <H6 
        dark={props.darkMode}> 
          Tokens: {otherTokenBalance} 
      </H6>
      <H6 
        dark={props.darkMode}> 
          {props.price?
            `Value: ${(props.price * otherTokenBalance).toFixed(2)} $` 
            : `price rate unknown`} 
      </H6>
    </>
  );
}
export default OtherToken;