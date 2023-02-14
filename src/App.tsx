import {
  ChangeEvent,
  FC,
  FormEvent,
  lazy,
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

const ErrorState = lazy(() => import("./components/Error"));
const LoadingState = lazy(() => import("./components/Loading"));
const EmptyState = lazy(() => import("./components/Empty"));

const App: FC = () => {
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

  const handleMessage = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewMessage(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessageMutation.mutate(newMessage);
  };

  useEffect(() => {
    const { current: lastMessage } = lastMessageRef;

    if (lastMessage && lastMessage.scrollTo) {
      lastMessage.scrollTo(0, lastMessage.scrollHeight);
    }
  }, [data]);

  const isMessageFieldEmpty = !newMessage || newMessage.trim().length === 0;
  const isDataEmpty = !data || data.length === 0;

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <>
      <ChatContainer ref={lastMessageRef}>
        <ChatMessages>
          {isDataEmpty ? (
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
              onChange={handleMessage}
            />
            <ChatButton type="submit" disabled={isMessageFieldEmpty}>
              Send
            </ChatButton>
          </ChatFormContainer>
        </ChatForm>
      </ChatContainer>
    </>
  );
};

export default App;
