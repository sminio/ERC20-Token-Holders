import React from 'react';
import { CardContent,H6,Body1 } from 'ui-neumorphism';

function TokenInfo(props){
    /** shows info about the token from address input **/
 
    /**  tokenInfo only gets accessible after first API call
   * so we do a little bit of conditional rendering here **/
   if (!props.tokenInfo) return "";
    return(
      <>
      {props.tokenInfo?
        <CardContent
          dark={props.darkMode}>
            <H6> {`${props.tokenInfo.name} (${props.tokenInfo.symbol})`} </H6>
            <H6> Price: {props.tokenInfo.price.rate? 
                          props.tokenInfo.price.rate.toFixed(2)
                          :  "unknown price"} $ 
            </H6>
            <Body1>
              Owner: {props.tokenInfo.owner}
            </Body1>
            <Body1>  
              Holders: {props.tokenInfo.holdersCount}
            </Body1>
          
        </CardContent>
        : ""
        }
        </>
      );
    
}

export default TokenInfo;