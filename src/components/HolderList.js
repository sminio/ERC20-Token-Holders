import React from 'react';
import { ListItemGroup,H5,ListItem } from 'ui-neumorphism';
import HolderListItem from "./HolderListItem.js";
function HolderList(props){
    /** Lists the top (# of) Holders of input token address  **/
  

  if (props.tokenHolders == null|| props.tokenInfo == null) return "";
  return (
    <>
      <H5 
        className='list-head'
        dark={props.darkMode}>
          Tokens Top {props.numHolders} Holders
      </H5>

      <ListItemGroup
        rounded
        dark={props.darkMode}
        raised>
                  
          {props.tokenHolders.map((holder, index) => {
            return(
              <ListItem
                className="ListItem-class"
                active
                dark={props.darkMode}
                key={index}
                raised
                rounded>
                  <HolderListItem
                    index={index}
                    darkMode={props.darkMode}
                    key={holder["address"] + index}
                    decimals={props.tokenInfo.decimals ? props.tokenInfo.decimals : "18 "} 
                    price={props.tokenInfo.price.rate ? props.tokenInfo.price.rate : "1 "} 
                    address={holder["address"]}
                    balance={holder["balance"]}
                    share={holder["share"]}
                    apiKey={props.apiKey}
                    handleNetworkError={props.handleNetworkError}/>
              </ListItem>
                );
              }
              )
            }
      </ListItemGroup>
    </>
    );
}
export default HolderList;