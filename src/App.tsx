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
  StateMessage,
} from "./styles";
import { Message } from "./types";
import { useMutation, useQuery } from "react-query";
import { API_URL } from "./constants";
import { formattedDate, sendMessage } from "./helpers";
const ErrorState = React.lazy(() => import("./components/Error"));
const LoadingState = React.lazy(() => import("./components/Loading"));
const EmptyState = React.lazy(() => import("./components/Empty"));

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessageMutation.mutate(newMessage);
  };

  useEffect(() => {
    if (lastMessageRef.current && lastMessageRef.current.scrollTo) {
      lastMessageRef.current.scrollTo(0, lastMessageRef.current.scrollHeight);
    }
  }, [data]);

  const isEmptyInputMessageField =
    newMessage.length === 0 || !newMessage || newMessage.trim().length === 0;

  const isEmptyData = data?.length === 0;

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <>
      <ChatContainer ref={lastMessageRef}>
        <ChatMessages>
          {isEmptyData ? (
            <EmptyState />
          ) : (
            data.map((message: Message, key: number) => {
              return (
                <StyledMessage
                  aria-live="polite"
                  aria-relevant="additions"
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
            })
          )}
        </ChatMessages>
        <ChatForm onSubmit={handleSubmit}>
          <ChatFormContainer>
            <ChatInput
              placeholder="Enter your message"
              aria-label="Enter message"
              aria-describedby="message-input-hint"
              type="text"
              value={newMessage}
              onChange={handleMessageChange}
            />
            <ChatButton type="submit" disabled={isEmptyInputMessageField}>
              Send
            </ChatButton>
          </ChatFormContainer>
        </ChatForm>
      </ChatContainer>
    </>
  );
};

export default App;
