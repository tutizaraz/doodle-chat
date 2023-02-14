import axios from "axios"
import { API_URL } from "../constants"
import { Roles } from "../types"

export const formattedDate = (timestamp: number) => {
  const date = new Date(timestamp)
  return `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()} ${formatTime(date)}`
}

const getMonthName = (month: number) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return months[month]
}

const formatTime = (date: Date) => {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`
}

export const sendMessage = (message: string) => {
  return axios.post(API_URL, { message, author: Roles.me })
}

export const getMessages = async (since: number, limit: number) => {
  const response = await axios.get(
    `https://chatty.doodle-test.com/api/chatty/v1.0/?since=${since}&limit=${limit}&token=${process.env.CHATTY_TOKEN}`
  )
  return response.data
}
