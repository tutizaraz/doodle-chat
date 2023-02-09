import styled from "styled-components";
import BackgroundImage from "./images/background.png";

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${BackgroundImage});
  background-repeat: repeat;
`;

const ChatMessages = styled.div`
  max-width: 664px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
`;

const Message = styled.div`
  padding: 16px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(218, 222, 209);
  margin-bottom: 10px;
  border-radius: 2px;
  color: rgb(95, 101, 101);
  font-weight: bold;
  font-size: 15px;
`;

const SendTime = styled.div`
  color: rgb(179, 188, 194);
  font-size: 13px;
  text-align: right;
`;

const ChatForm = styled.form`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 15px;
  background-color: rgb(54, 152, 212);
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
  background-color: rgb(255, 135, 109);
  color: rgb(255, 255, 255);
  border: none;
  margin-left: 10px;
  margin-right: 10px;
  font-weight: bold;
  cursor: pointer;
`;

export {
  ChatContainer,
  Message,
  ChatMessages,
  ChatForm,
  ChatInput,
  ChatButton,
  SendTime,
};
