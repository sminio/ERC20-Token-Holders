import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import 'ui-neumorphism/dist/index.css';
/* UI library component imports */
/* for changeTheme function:
   import { overrideThemeVariables } from 'ui-neumorphism'; */
import { 
  Button,
  Card
  } from 'ui-neumorphism';

/* Input Components */
import AddressInput from './components/AddressInput';
import ApiKeyInput from './components/ApiKeyInput';
import LimitHolderInput from './components/LimitHolderInput';

/* Output Components */
import ErrorOutput from "./components/ErrorOutput.js";
import TokenInfo from "./components/TokenInfo.js";
import HolderList from "./components/HolderList.js";



function App() {

  const [tokenHolders, setTokenHolders] = useState(null);
  const [input, setInput] = useState("");
  const [limitHolders, setLimitHolders] = useState(10);
  const [apiKey, setApiKey] = useState("EK-nYME2-u6tTYfo-L5LES");
  const [darkMode, setDarkMode] = useState(false);
  const [inputTokenInfo, setInputTokenInfo] = useState(null);
  
  const [addressInputError, setAddressInputError] = useState(false);
  const [limitInputError, setLimitInputError] = useState(false);
  const [networkErrorOccured, setNetworkErrorOccured] = useState(false);
  const [networkError, setNetworkError] = useState(null);

  // axios request urls
  const baseUrl = "https://api.ethplorer.io";
  const tokenholdersApiUrl = () => `${baseUrl}/getTopTokenHolders/${input}?apiKey=${apiKey}&limit=${limitHolders}`;
  const tokenAddressApiUrl = () => `${baseUrl}/getAddressInfo/${input}?apiKey=${apiKey}`;
  const tokenHoldersRequest = () => axios.get(tokenholdersApiUrl());
  const tokenAddressRequest = () => axios.get(tokenAddressApiUrl());
  const tokenRequests = () => [ tokenHoldersRequest(), tokenAddressRequest() ];

  const inputIsInvalid = () => addressInputError || limitInputError || networkErrorOccured

  useEffect(() => {

    if (inputIsInvalid() || input == "") return ;
    let isMounted = true;

    async function getTokenHoldersAndInfo() {
      axios
        .all(tokenRequests())
        .then(axios.spread(
          (holdersResponse, tokenAddressResponse) => {
            if(isMounted){
              setTokenHolders(holdersResponse.data.holders);
              setInputTokenInfo(tokenAddressResponse.data.tokenInfo);
            }
            
          }
        )
      ).catch( error => handleNetworkError(error) );
    }
    getTokenHoldersAndInfo();
    return () => isMounted = false;
  },
  [input, apiKey, limitHolders]); 

  /** Handler Functions for Input changes and simple input validation **/
  function handleTokenAddressChange(changedInput) {
	  const newInput = changedInput.event.target.value;
	  /** all ethereum token addresses are 42 characters long **/
	  if (newInput.length == 42){
		  setAddressInputError(false);
		  setInput(newInput);
	    } 
      else {
		  setAddressInputError(true);
	    }
    }
  
  function handleApiKeyChange(changedApiKey) {
	  const newApiKey = changedApiKey.event.target.value;
      setApiKey(newApiKey);
    }
	
  function handleLimitHoldersChange(changedLimitHolders) {
	  const newLimitHolders = changedLimitHolders.event.target.value;
	  /** parseInt converts floats to ints and returns NaN when input is string **/
	  if (parseInt(newLimitHolders) > 0 
        && parseInt(newLimitHolders) <= 1000){
          setLimitInputError(false);
          setLimitHolders(newLimitHolders);
	  }
	  else {
		  setLimitInputError(true);
	    }
    }

  function handleNetworkError(error){
    setNetworkErrorOccured(true);
    setNetworkError(error);
    console.log("NETWORK ERROR");
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
  
  /* function changeTheme(props){
	   // This function can be used to override css values 
     // requires import of the following function
	  overrideThemeVariables({
      '--light-bg': '#E9B7B9'
    });
  } **/
	
  function darkModeToggle(event) {
    setDarkMode(!darkMode);
  }

  return (
  
    <Card className="App"
	    dark={darkMode}>
      
      <Card 
        dark={darkMode} 
        rounded={true} 
        width={700} 
        className="UserInput-container">

          <h1>Tokenholders Other Holdings</h1>

          <Button
            onClick={darkModeToggle}
            rounded
            depressed
            color={darkMode?"var(--white)":"var(--primary)"}>
              {!darkMode?"dark-mode":"light-mode"}
          </Button>

          <AddressInput 
            handleTokenAddressChange={handleTokenAddressChange}
            tokenHolders={tokenHolders}
          />

          <Card 
            dark={darkMode} 
            rounded
            flat
            width={500} 
            className="InputComponent-container">
              <ApiKeyInput
                apiKey={apiKey}
                handleApiKeyChange={handleApiKeyChange}
                tokenHolders={tokenHolders}
              />
          </Card>

          <Card 
            dark={darkMode} 
            rounded
            flat
            width={500} 
            className="InputComponent-container">
              <LimitHolderInput
                handleLimitHoldersChange={handleLimitHoldersChange}
                tokenHolders={tokenHolders}
              />
          </Card>
          
          <Card 
            dark={darkMode}
            width={200} 
            className="TokenInfoComponent-container">
              <TokenInfo 
                darkMode={darkMode}
                tokenInfo={inputTokenInfo} />
          </Card>

          <Card 
            dark={darkMode}
            width={300} 
            className="ErrorComponent-container">
              <ErrorOutput
                darkMode={darkMode} 
                addressError={addressInputError} 
                limitError={limitInputError} 
                networkErrorHappened={networkErrorOccured}
                networkErrorObject={networkError}
                />
          </Card>

      </Card>

      <Card 
        dark={darkMode} 
        rounded
        width={700}
        className="HolderListComponent-container">
          <HolderList
            darkMode={darkMode}
            tokenHolders={tokenHolders}
            numHolders={limitHolders}
            tokenInfo={inputTokenInfo}
            apiKey={apiKey}
            handleNetworkError={handleNetworkError}/>
      </Card>
      
      <footer>
          <Card 
            dark={darkMode} 
            className='footer'>
              <p>Built with 💚 by <a 
                                    href="https://github.com/sminio"
                                    target="_blank">
                                      Simon
                                  </a>
              </p>
              <p>powered by <a 
                              href="https://Ethplorer.io" 
                              target="_blank">
                                Ethplorer.io
                            </a> 
              </p>
            </Card>
        </footer>
	  
    </Card>
  );
}

export default App;
