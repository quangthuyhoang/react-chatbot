import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Interactions } from 'aws-amplify';

// import { ChatBot } from 'aws-amplify-react';

import { ChatFeed, Message } from 'react-chat-ui'
import ChatBot from './components/chatbot/Chatbot';

class App extends Component {


  render() {
    return (
   
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <div className="">
            Header
          </div>
          <ChatBot />
          {/* <ChatFeed
          messages={this.state.messages}
          hasInputField={false}
          maxHeight={400}
          // bubbleStyles={styles.bubbleStyles}
        />

        <input
          onKeyPress={this._handleKeyPress}
          onChange={this.onChange.bind(this)}
          style={styles.input}
          value={this.state.input}
        />
     */}
      
        </header>
      </div>
    );
  }
}

const styles = {
  bubbleStyles: {
    text: {
      fontSize: 16,
    },
    chatbubble: {
      borderRadius: 30,
      padding: 10
    }
  },
  headerTitle: {
    color: 'white',
    fontSize: 22
  },
  header: {
    backgroundColor: 'rgb(0, 132, 255)',
    padding: 20,
    borderTop: '12px solid rgb(204, 204, 204)'
  },
  messagesContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    alignItems: 'center'
  },
  input: {
    fontSize: 16,
    padding: 10,
    outline: 'none',
    width: 227,
    border: 'none',
    borderBottom: '2px solid rgb(0, 132, 255)'
  }
}

export default App;
