import { FC, lazy, useEffect, useRef } from "react"
import axios from "axios"
import { ChatContainer } from "./styles"
import { useQuery } from "react-query"
import { API_URL } from "./constants"
import Chat from "./components/Chat"
import Form from "./components/Form"

const ErrorState = lazy(() => import("./components/Error"))
const LoadingState = lazy(() => import("./components/Loading"))
const EmptyState = lazy(() => import("./components/Empty"))

const App: FC = () => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null)

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: () => axios.get(API_URL).then((res) => res.data),
  })

  useEffect(() => {
    const { current: lastMessage } = lastMessageRef

    if (lastMessage && lastMessage.scrollTo) {
      lastMessage.scrollTo(0, lastMessage.scrollHeight)
    }
  }, [data])

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
