// import React from 'react';
import renderer from 'react-test-renderer';
import ChatBubble from './index2';

it('renders correctly', () => {
  const testChatBubble = ChatBubble({
    bubbleStyles: styles.bubbleStyles,
    message: "test jest rendering"
  });
  const tree = renderer
    .create(testChatBubble)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

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
