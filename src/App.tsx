import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  ChatContainer,
  Message as StyledMessage,
  ChatForm,
  ChatInput,
  ChatButton,
  ChatMessages,
  SendTime,
} from "./styles";
import { Message } from "./types";
import { useMutation, useQuery } from "react-query";
import { API_URL } from "./constants";
import { formattedDate, sendMessage } from "./helpers";

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop =
        containerRef.current?.scrollHeight - containerRef.current?.clientHeight;
    }
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <ChatContainer>
        <ChatMessages ref={containerRef}>
          {data.map((message: Message) => {
            console.log(message);
            return message.author !== "You" ? (
              <StyledMessage
                style={{
                  alignSelf: "flex-end",
                  backgroundColor: "rgb(252, 246, 197)",
                  minWidth: "420px",
                }}
                key={message.id}
              >
                <p>{message.message}</p>
                <SendTime>{formattedDate(message.timestamp)}</SendTime>
              </StyledMessage>
            ) : (
              <StyledMessage
                style={{
                  alignSelf: "flex-start",
                }}
                key={message.id}
              >
                <p>{message.author}</p>
                <p>{message.message}</p>
                <SendTime>{formattedDate(message.timestamp)}</SendTime>
              </StyledMessage>
            );
          })}
        </ChatMessages>
      </ChatContainer>
      <ChatForm onSubmit={handleSubmit}>
        <ChatInput
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <ChatButton type="submit">Send</ChatButton>
      </ChatForm>
    </>
  );
};

export default App;
