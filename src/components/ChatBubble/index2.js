import React from 'react';
import * as styles_1 from './styles';
const defaultBubbleStyles = {
  userBubble: {},
  chatbubble: {},
  text: {}
};

const ChatBubble = (args) => {
  const { 
    bubblesCentered,
    bubbleStyles,
    message
  } = args;

  const _bubbleStyles = bubbleStyles | defaultBubbleStyles,
        userBubble = _bubbleStyles.userBuble,
        chatbubble = _bubbleStyles.chatbubble,
        text       = _bubbleStyles.text;

  // sender or recipient chat bubble style
  const chatBubbleStyle = 
        message.id === 0 ? 
          Object.assign({}, styles_1.default.chatBubble, 
            bubblesCentered ? {} : styles_1.default.chatbubbleOrientationNormal, chatbubble, userBubble) : 
          Object.assign({}, styles_1.default.chatbubble,                styles_1.default.recipientChatbubble, bubblesCentered ? {} : styles_1.default.recipientChatbubbleOrientationNormal,     chatbubble, userBubble);
  return (
    <div style={chatBubbleStyle}>
      <p style={styles_1.default.p}>{text}</p>
    </div>
  )
}
// class ChatBubble extends Component {
//   constructor() {
//     super(props);
//   }
//   render() {
//     return (
//       <div>
//         {/* TODOS: add chatbubutle */}
//       </div>
//     )
//   }
// }

export default ChatBubble;