import React from 'react';
import { ListItem } from 'ui-neumorphism';
import OtherToken from "./OtherToken.js";

function OtherTokenList(props){
    /* Holds List of the other tokens held by parent address */
    return(
      <>
        {props.otherTokens.map((otherToken, index) => {
          return(
            <ListItem
              key={index}
              dark={props.darkMode}
              active
              raised
              rounded
              className="OtherTokenListItem-class"> 

                <OtherToken
                  darkMode={props.darkMode}
                  address={otherToken.tokenInfo.address}
                  name={otherToken.tokenInfo.name}
                  index={index}
                  symbol={otherToken.tokenInfo.symbol}
                  balance={otherToken.balance}
                  decimals={otherToken.tokenInfo.decimals > 0? otherToken.tokenInfo.decimals : 1}
                  price={otherToken.tokenInfo.price.rate}/>

            </ListItem>
          );
        })}
      </>
    );
  }

export default OtherTokenList;