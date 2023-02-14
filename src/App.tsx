import { FC, lazy, useRef } from "react"
import { ChatContainer } from "./styles"
import Chat from "./components/Chat"
import Form from "./components/Form"
import useScrollToBottom from "./hooks/useScrollToBottom"
import useFetchMessages from "./hooks/useFetchMessages"

const ErrorState = lazy(() => import("./components/Error"))
const LoadingState = lazy(() => import("./components/Loading"))
const EmptyState = lazy(() => import("./components/Empty"))

const App: FC = () => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null)

  const { isLoading, error, data, refetch } = useFetchMessages()

  useScrollToBottom(lastMessageRef, data)

  const isDataEmpty = !data || data.length === 0

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState />

  return (
    <>
      <ChatContainer ref={lastMessageRef}>
        {isDataEmpty ? <EmptyState /> : <Chat messages={data} />}
        <Form refetchMessage={refetch} />
      </ChatContainer>
    </>
  )
}

export default App
