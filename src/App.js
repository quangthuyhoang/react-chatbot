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

  handleComplete(err, confirmation) {
    if (err) {
        alert('bot conversation failed')
        return;
    }
    alert('done: ' + JSON.stringify(confirmation, null, 2));

    return 'Trip booked. Thank you! what would you like to do next?';
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
    if (response.dialogState === 'Fulfilled') {
      console.log(response)
      console.log(response.intentName === "GetBotCommands")
      let finalMessage = response.message;
      if(response.intentName) {
        console.log("We're inide")
        if (response.intentName === "GetBotCommands") {
          let text = response.message.split("'").join("\"");
          console.log("text", text);
          const { 
            main,
            contentlist
          } = JSON.parse(text);
          console.log("main", main)
          console.log("contentlist", contentlist)
          let commands = '';
          for(let i = 0; i < contentlist.length; i++) {
            if (i < contentlist.length - 1) {
              commands += contentlist[i] + ', '
            } else {
              commands += ' and' + contentlist[i] +'.';
            }
          }
          finalMessage = main + ' ' + commands;
          // console.log("This should be parse", text);
        }
      }

      const responseMessage = new Message({
        id: this.state.messages.length,
        message: finalMessage,
      })
      messages  = [...this.state.messages, responseMessage];
      this.setState({ finalMessage })
    }

 
    this.setState({ messages })
    console.log(response)
    // if (response.dialogState === 'Fulfilled') {
    //   if (response.intentName === 'BookTripBookHotel') {
    //     const { slots: { BookTripCheckInDate, BookTripLocation, BookTripNights, BookTripRoomType } } = response
    //     const finalMessage = `Congratulations! Your trip to ${BookTripLocation}  with a ${BookTripRoomType} rooom on ${BookTripCheckInDate} for ${BookTripNights} days has been booked!!`
    //     this.setState({ finalMessage })
    //   }
    // }
  }

  render() {
    return (
   
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <ChatFeed
     
          messages={this.state.messages}
          hasInputField={false}
          maxHeight={500}
          // bubbleStyles={styles.bubbleStyles}
        />

        <input
          onKeyPress={this._handleKeyPress}
          onChange={this.onChange.bind(this)}
          style={styles.input}
          value={this.state.input}
        />
    
      
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
