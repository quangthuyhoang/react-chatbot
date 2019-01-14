import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Interactions } from 'aws-amplify';

import { ChatBot } from 'aws-amplify-react';
import { ChatFeed, Message } from 'react-chat-ui'

class App extends Component {
  state = {
    input: '',
    finalMessage: '',
    messages: [
      new Message({
        id: 1,
        message: "Hello, how can I help you today?",
      })
    ]
  }
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.submitMessage()
    }
  }
  onChange(e) {
    const input = e.target.value
    this.setState({
      input
    })
  }

  test(e,a) {
    if(e) {
      console.log('err ' + e)
      return;
    }
    return 'bot responsded';
  }
  handleComplete(err, confirmation) {
    if (err) {
      alert('bot conversation failed');
      return;
    }
    console.log('Success: ' + JSON.stringify(confirmation, 2));
    return 'bot responsded';
  }

  async submitMessage() {
    const { input } = this.state
    if (input === '') return
    const message = new Message({
      id: 0,
      message: input,
    })
    let messages = [...this.state.messages, message]

    this.setState({
      messages,
      input: ''
    })
    const response = await Interactions.send("CareerAvatar", input);
    const responseMessage = new Message({
      id: 1,
      message: response.message,
    })
    messages  = [...this.state.messages, responseMessage]
    this.setState({ messages })

    // if (response.dialogState === 'Fulfilled') {
    //   if (response.intentName === 'BookTripBookHotel') {
    //     const { slots: { BookTripCheckInDate, BookTripLocation, BookTripNights, BookTripRoomType } } = response
    //     const finalMessage = `Congratulations! Your trip to ${BookTripLocation}  with a ${BookTripRoomType} rooom on ${BookTripCheckInDate} for ${BookTripNights} days has been booked!!`
    //     this.setState({ finalMessage })
    //   }
    // }
  }

  render() {
    // const userInput = "I want to reserve a hotel for tonight";

    // Provide a bot name and user input
        // const response = await Interactions.send("BookTrip", userInput);
    
    // Log chatbot response
    // console.log (response.message);
    return (
   
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <ChatFeed
          messages={this.state.messages}
          hasInputField={false}
          // bubbleStyles={styles.bubbleStyles}
        />

        <input
          onKeyPress={this._handleKeyPress}
          onChange={this.onChange.bind(this)}
          style={styles.input}
          value={this.state.input}
        />
          <ChatBot
            title="My Bot"
            // theme={myTheme}
            botName="CareerAvatar"
            // welcomeMessage="Welcome, how can I help you today?"
            onComplete={this.handleComplete.bind(this)}
            clearOnComplete={true}
            // conversationModeOn={false}
          />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
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
    width: 350,
    border: 'none',
    borderBottom: '2px solid rgb(0, 132, 255)'
  }
}

export default App;
