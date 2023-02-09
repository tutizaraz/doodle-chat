import axios from "axios";
import { API_URL } from "../constants";
import { TimestampToDateOptions } from "../types";

export const formattedDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  } as TimestampToDateOptions;

  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};

export const sendMessage = (message: string) => {
  return axios.post(API_URL, { message, author: "you" });
};
