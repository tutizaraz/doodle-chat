import { useMutation } from "react-query"
import { sendMessage } from "../helpers"

const useSendMessageMutation = (refetch: () => void) => {
  const sendMessageMutation = useMutation(sendMessage, {
    onSuccess: () => {
      refetch()
    },
  })
  return sendMessageMutation
}
export default useSendMessageMutation
