import styled from "styled-components";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

const ChatHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  margin-bottom: 20px;
`;

const MessageContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid lightgray;
`;

const ChatForm = styled.form`
  display: flex;
  width: 80%;
  margin-bottom: 20px;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid lightgray;
`;

const ChatButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: lightgray;
  border: none;
  margin-left: 10px;
  cursor: pointer;
`;

export {
  ChatContainer,
  ChatHeader,
  ChatMessages,
  MessageContainer,
  ChatForm,
  ChatInput,
  ChatButton,
};
