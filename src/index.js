import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import config from './config';
import Amplify from 'aws-amplify';

const ampConfig = {
  Auth: {
    identityPoolId: 'us-east-1:76356956-5d4b-47f9-96a6-eed6f4dfbc9a', 
    region: 'us-east-1'
  },
  Interactions: {
    bots: {
      "CareerAvatar": {
        "name": "CareerAvatar",
        "alias": "$LATEST",
        "region": "us-east-1",
      },
    }
  }
};
Amplify.configure(config);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

if (module.hot) {
  module.hot.accept();
}