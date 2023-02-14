import { RefObject, useEffect } from "react"
import { Message } from "../types"

function useScrollToBottom(ref: RefObject<HTMLDivElement>, data: Message): RefObject<HTMLDivElement> {
  useEffect(() => {
    const { current: lastMessage } = ref

    if (lastMessage && lastMessage.scrollTo) {
      lastMessage.scrollTo(0, lastMessage.scrollHeight)
    }
  }, [data, ref])

  return ref
}

export default useScrollToBottom
