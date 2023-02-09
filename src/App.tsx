import React, { useState } from "react";
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
import { Message } from "./types";
import { useMutation, useQuery } from "react-query";
import { API_URL } from "./constants";
import { formattedDate, sendMessage } from "./helpers";

const App: React.FC = () => {
  const [newMessage, setNewMessage] = useState<string>("");
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: () => axios.get(API_URL).then((res) => res.data),
  });

  const sendMessageMutation = useMutation(sendMessage, {
    onSuccess: () => {
      setNewMessage("");
      refetch();
    },
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    sendMessageMutation.mutate(newMessage);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ChatContainer>
      <ChatHeader>Chat App</ChatHeader>
      <ChatMessages>
        {data.map((message: Message) => (
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
