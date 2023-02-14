import { useQuery } from "react-query"
import axios from "axios"
import { API_URL } from "../constants"

const useFetchMessages = () => {
  return useQuery("messages", () => axios.get(API_URL).then((res) => res.data))
}

export default useFetchMessages
