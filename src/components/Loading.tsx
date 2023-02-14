import { FC } from "react"
import { StateMessage } from "../styles"

const Loading: FC = () => {
  return (
    <StateMessage>
      <h1 aria-label="Loading">Loading...</h1>
    </StateMessage>
  )
}

export default Loading
