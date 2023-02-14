import { FC } from "react"
import { formattedDate } from "../helpers"
import { SendTime, Message as StyledMessage, ChatMessages } from "../styles"
import { Message } from "../types"

interface ChatMessagesProps {
  messages: Message[]
}

const Chat: FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <>
      {messages.map((message: Message, key: number) => {
        const authorStyle = {
          alignSelf: message.author === "me" ? "flex-end" : "flex-start",
          minWidth: "auto",
          ...(message.author === "me" && { backgroundColor: "rgb(252, 246, 197)" }),
        }

        return (
          <ChatMessages key={key}>
            <StyledMessage aria-live="polite" aria-relevant="additions" style={authorStyle}>
              {message.author !== "me" && <p>{message.author}</p>}
              <p dangerouslySetInnerHTML={{ __html: message.message }} />
              <SendTime>{formattedDate(message.timestamp)}</SendTime>
            </StyledMessage>
          </ChatMessages>
        )
      })}
    </>
  )
}

export default Chat
