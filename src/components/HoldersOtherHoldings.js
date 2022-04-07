import React from 'react';
import { H6 } from 'ui-neumorphism';
import OtherTokenList from "./OtherTokenList.js";

function HoldersOtherHoldings(props){
    /** Shows other Tokens of parent holder 
     *  address once UI Button is pressed **/

    /* tokens are sorted based on value in descending order
        calculated by custom comparison function  */

    const sortedOtherTokens = props.tokens.sort(
        (a,b) => {
        if(a.tokenInfo.price && b.tokenInfo.price){
            return ( 
            ( (b.balance / 10 ** b.tokenInfo.decimals ) 
            * b.tokenInfo.price.rate 
            - (a.balance / 10 ** a.tokenInfo.decimals ) 
            * a.tokenInfo.price.rate) 
            );
        }
        else if(a.tokenInfo.price && !b.tokenInfo.price){
            return -1;
        }
        else if(!a.tokenInfo.price && b.tokenInfo.price){
            return 1;
        }
        else {
            return 0;
        }
        }
    );

    return(
        <>
            <H6 dark={props.darkMode}>{props.tokens.length > 1 ?
                `${props.tokens.length} Tokens held by this address`
                : `${props.tokens.length} Token held by this address`
                }  
            </H6>
            <OtherTokenList
                darkMode={props.darkMode}
                otherTokens={props.tokens}/>
        </>
        );
}
export default HoldersOtherHoldings;