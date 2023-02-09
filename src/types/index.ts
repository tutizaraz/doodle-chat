export interface Message {
  id: string;
  author: string;
  message: string;
  timestamp: number;
}

export enum Roles {
  me = "me",
  otherPerson = "otherPerson",
}
