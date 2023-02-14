import { FC } from "react"
import { StateMessage } from "../styles"

const Empty: FC = () => {
  return (
    <StateMessage>
      <h1>No messages</h1>
    </StateMessage>
  )
}

export default Empty
