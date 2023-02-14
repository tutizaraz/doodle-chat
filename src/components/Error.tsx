import { FC } from "react"
import { StateMessage } from "../styles"

const Error: FC = () => {
  return (
    <StateMessage>
      <h1 aria-label="Error">Error :(</h1>
    </StateMessage>
  )
}

export default Error
