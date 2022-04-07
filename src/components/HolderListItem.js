import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card,H5,Button } from 'ui-neumorphism';
import HoldersOtherHoldings from "./HoldersOtherHoldings.js";

function HolderListItem(props){
    /** is showing the holder of token from address input **/
    const [showOtherTokens, setShowOtherTokens] = useState(false);
    const [showOtherTokensButtonPressed, setShowOtherTokensButtonPressed] = useState(false);
    const [tokenHoldersOtherHoldings, setTokenHoldersOtherHoldings] = useState();
    
    useEffect( () => {
       
        /** condition to avoid the warning of hook usage before component mounting **/
        let isMounted = true;
        /** prevent apicall if not intended **/
        if(!showOtherTokens) return ;
        /** prevent apicall of wrong address or apiKey input **/
        if (!props.address === "" || !props.address || !props.apiKey){
            return ;
          }
        
        async function getTokens(){
            const addressInfoApiUrl = 
        `https://api.ethplorer.io/getAddressInfo/${props.address}?apiKey=${props.apiKey}`;
            await axios.get(addressInfoApiUrl)
              .then((addressInfoResponse) => {
                  if (isMounted) setTokenHoldersOtherHoldings(addressInfoResponse.data);
            })
          .catch((error)=> {
            props.handleNetworkError(error);
          });
          }

        getTokens();
          /** cleanup function **/
        return () => { isMounted = false };
       } 
      ,[showOtherTokens]);
      
    function handleShowOtherTokensButtonPressed(event){
        setShowOtherTokens(!showOtherTokens);
        setShowOtherTokensButtonPressed(!showOtherTokensButtonPressed);
    }

    const holdersBalance = (props.balance/ 10 ** props.decimals).toFixed(2);
    const holdersValue = (props.price * holdersBalance).toFixed(2);

    /** tokenHoldersOtherHoldings only gets accessible after first apicall  **/
    /** and holders other tokens only after pressing the listitems button **/  
    return(
    <>
      <H5 dark={props.darkMode}> #{props.index + 1} </H5>
      <H5 dark={props.darkMode}> Share: {props.share} % </H5>
      <H5 dark={props.darkMode}> 
        Tokens: {holdersBalance}
      </H5>
      <H5 dark={props.darkMode}> Value: {holdersValue} $ </H5>
      <H5 dark={props.darkMode}> 
        Address: <a 
                  href={`https://etherscan.io/address/${props.address}`} 
                  target="_blank">
                    {props.address}
                </a> 
      </H5>
      

      <Button 
        className="showOtherTokensButton"
        color={showOtherTokensButtonPressed? 'var(--black)' : 'var(--white)'}
        bgColor={showOtherTokensButtonPressed? 'var(--primary-red)' : 'var(--primary)'}
        dark={props.darkMode}
        rounded
        onClick={handleShowOtherTokensButtonPressed}> 
          {!showOtherTokens? "Show Holders other tokens" : "Hide Holders other tokens" } 
      </Button>
        {tokenHoldersOtherHoldings && showOtherTokens?
          <Card
            flat
            width={400}
            dark={props.darkMode}
            className="HoldersOtherHoldingsComponent-container"
            >
              <HoldersOtherHoldings  
                darkMode={props.darkMode}
                tokens={tokenHoldersOtherHoldings.tokens} />   
          </Card>
          : ""
          }
          </>
        );
}

export default HolderListItem;