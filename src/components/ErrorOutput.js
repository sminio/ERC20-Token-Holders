import React from 'react';
import { Alert } from 'ui-neumorphism';

function ErrorOutput(props){
    /** renders possible input errors to the user */
    
    return(
      <>
        {props.addressError?
          <Alert 
            dark={props.darkMode}
            type="error">
              Input Error : invalid Token Address input
          </Alert>
          : ""
        }

        {props.limitError?
          <Alert 
            dark={props.darkMode}
            type="error">
              Input Error : only integers between 1-1000 allowed for # of Top Holders
          </Alert>
          : ""
        }

        {props.networkErrorHappened?
          <Alert 
            dark={props.darkMode}
            type="error">
              Network Error occured, Check Console { (props.networkErrorObject == null)? "" : props.networkErrorObject.message }
          </Alert>
          : ""
        }

      </>
    );
  }

export default ErrorOutput;