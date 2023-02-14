import { ChangeEvent, FC, FormEvent, useState } from "react"
import useSendMessageMutation from "../hooks/useSendMessageMutation"
import { ChatButton, ChatForm, ChatFormContainer, ChatInput } from "../styles"

interface ChatFormProps {
  refetchMessage: () => void
}

const Form: FC<ChatFormProps> = ({ refetchMessage }) => {
  const [newMessage, setNewMessage] = useState<string>("")
  const { mutate } = useSendMessageMutation(refetchMessage)

  const handleMessage = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setNewMessage(value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutate(newMessage)
    setNewMessage("")
  }

  const isMessageFieldEmpty = !newMessage || newMessage.trim().length === 0

  return (
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
  )
}

export default Form
