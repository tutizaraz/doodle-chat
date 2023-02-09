export interface Message {
  id: string;
  author: string;
  message: string;
  timestamp: number;
}

export interface TimestampToDateOptions {
  year: "numeric";
  month: "long";
  day: "numeric";
  hour: "numeric";
  minute: "numeric";
}
