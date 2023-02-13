import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import {
  ChatContainer,
  Message as StyledMessage,
  ChatForm,
  ChatInput,
  ChatButton,
  ChatMessages,
  SendTime,
  ChatFormContainer,
} from "./styles";
import { Message } from "./types";
import { useMutation, useQuery } from "react-query";
import { API_URL } from "./constants";
import { formattedDate, sendMessage } from "./helpers";

const App: React.FC = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: () => axios.get(API_URL).then((res) => res.data),
  });
  const [newMessage, setNewMessage] = useState<string>("");
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const sendMessageMutation = useMutation(sendMessage, {
    onSuccess: () => {
      setNewMessage("");
      refetch();
    },
  });

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewMessage(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessageMutation.mutate(newMessage);
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      const scroll =
        lastMessageRef.current.scrollHeight -
        lastMessageRef.current.clientHeight;
      lastMessageRef.current.scrollTo(0, scroll);
    }
  }, [data]);

  const isEmptyMessage =
    newMessage.length === 0 || !newMessage || newMessage.trim().length === 0;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <ChatContainer ref={lastMessageRef}>
        <ChatMessages>
          {data.map((message: Message, key: number) => {
            return (
              <StyledMessage
                key={key}
                style={
                  message.author === "me"
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "rgb(252, 246, 197)",
                        minWidth: "auto",
                      }
                    : { alignSelf: "flex-start", minWidth: "auto" }
                }
              >
                {message.author !== "me" && <p>{message.author}</p>}
                <p dangerouslySetInnerHTML={{ __html: message.message }} />
                <SendTime>{formattedDate(message.timestamp)}</SendTime>
              </StyledMessage>
            );
          })}
        </ChatMessages>
        <ChatForm onSubmit={handleSubmit}>
          <ChatFormContainer>
            <ChatInput
              type="text"
              value={newMessage}
              onChange={handleMessageChange}
            />
            <ChatButton type="submit" disabled={isEmptyMessage}>
              Send
            </ChatButton>
          </ChatFormContainer>
        </ChatForm>
      </ChatContainer>
    </>
  );
};

export default App;
