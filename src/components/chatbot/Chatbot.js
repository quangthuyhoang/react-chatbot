import React, { Component } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';
import { Interactions } from 'aws-amplify';
import './chatbot.css'

class ChatBot extends Component {
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
    const { input } = this.state;
    let finalMessage;
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

      finalMessage = response.message;
      if(response.intentName) {
  
        if (response.intentName === "GetBotCommands") {
          let text = response.message.split("'").join("\"");
          const { 
            main,
            contentlist
          } = JSON.parse(text);

          let commands = '';
          for(let i = 0; i < contentlist.length; i++) {
            if (i < contentlist.length - 1) {
              commands += contentlist[i] + ', '
            } else {
              commands += ' and ' + contentlist[i] +'.';
            }
          }
          finalMessage = main + ' ' + commands;
        }
      }  
    }

    if (response.dialogState === 'ElicitIntent') {
      if (response.intentName === null) {
        finalMessage = response.message;
      }
    }

    const responseMessage = new Message({
      id: this.state.messages.length,
      message: finalMessage,
    })
    messages  = [...this.state.messages, responseMessage];

    this.setState({ finalMessage })
    this.setState({ messages })
  }

  render() {
    return (
      // TODOS: Need to bring chat-ui component into parent directory
      <div >
        <ChatFeed
        className="h-min10"
          messages={this.state.messages}
          hasInputField={false}
          maxHeight={400}
          minHeight={300}
          // bubbleStyles={styles.bubbleStyles}
        />
        <input
          onKeyPress={this._handleKeyPress}
          onChange={this.onChange.bind(this)}
          style={styles.input}
          value={this.state.input}
        />
      </div>
    )
  }
}

export default ChatBot;


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
  },
  h100: {
    height: '900'
  }

}
