import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ChatContainer,
  ChatHeader,
  ChatMessages,
  MessageContainer,
  ChatForm,
  ChatInput,
  ChatButton,
} from "./styles";
import { Message, TimestampToDateOptions } from "./types";

const API_URL = `https://chatty.doodle-test.com/api/chatty/v1.0/?token=${process.env.REACT_APP_CHATTY_TOKEN}`;

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
