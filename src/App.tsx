import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const API_URL = `https://chatty.doodle-test.com/api/chatty/v1.0/?token=${process.env.REACT_APP_CHATTY_TOKEN}`;

interface Message {
  id: string;
  author: string;
  message: string;
  timestamp: number;
}

interface TimestampToDateOptions {
  year: "numeric";
  month: "long";
  day: "numeric";
  hour: "numeric";
  minute: "numeric";
}

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

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(API_URL);
      setMessages(result.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await axios.post(API_URL, {
      author: "You",
      message: newMessage,
    });
    setMessages([...messages, result.data]);
    setNewMessage("");
  };

  const formattedDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    } as TimestampToDateOptions;
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  return (
    <ChatContainer>
      <ChatHeader>Chat App</ChatHeader>
      <ChatMessages>
        {messages.map((message) => (
          <MessageContainer key={message.id}>
            <p>Author: {message.author}</p>
            <p>Message: {message.message}</p>
            <p>Time: {formattedDate(message.timestamp)}</p>
          </MessageContainer>
        ))}
      </ChatMessages>
      <ChatForm onSubmit={handleSubmit}>
        <ChatInput
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <ChatButton type="submit">Send</ChatButton>
      </ChatForm>
    </ChatContainer>
  );
};

export default App;
