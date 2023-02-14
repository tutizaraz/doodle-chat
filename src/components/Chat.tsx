import { FC } from "react";
import { formattedDate } from "../helpers";
import { SendTime, Message as StyledMessage, ChatMessages } from "../styles";
import { Message } from "../types";

interface ChatMessagesProps {
  messages: Message[];
}

const Chat: FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <>
      {messages.map((message: Message, key: number) => {
        return (
          <ChatMessages key={key}>
            <StyledMessage
              aria-live="polite"
              aria-relevant="additions"
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
          </ChatMessages>
        );
      })}
    </>
  );
};

export default Chat;
