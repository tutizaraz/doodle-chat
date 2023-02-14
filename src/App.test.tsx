import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { QueryClientProvider, QueryClient } from "react-query";
import App from "./App";
import { Message } from "./types";

jest.mock("axios");

const MESSAGES = [
  {
    id: 1,
    author: "John Doe",
    message: "Hello",
    timestamp: 1623504800000,
  },
  {
    id: 2,
    author: "Jane Doe",
    message: "Hi",
    timestamp: 1623504801000,
  },
];

const queryClient = new QueryClient();
const renderApp = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );

describe("Doodle chat", () => {
  describe("empty state", () => {
    beforeEach(() => {
      (axios.get as jest.Mocked<Message | any>).mockResolvedValue({
        data: [],
      });
    });

    it("displays 'No Messages' when data is absent", async () => {
      renderApp();
      const loadingElement = await screen.findByText(/No messages/i);
      expect(loadingElement).toBeInTheDocument();
    });
  });

  describe("rendering messages", () => {
    beforeEach(() => {
      (axios.get as jest.Mocked<Message | any>).mockResolvedValue({
        data: MESSAGES,
      });
    });

    it("renders messages correctly", async () => {
      renderApp();
      await waitFor(() => {
        MESSAGES.forEach((message) => {
          expect(screen.getByText(message.message)).toBeInTheDocument();
        });
      });
    });
  });

  describe("send button", () => {
    beforeEach(() => {
      (axios.get as jest.Mocked<Message | any>).mockResolvedValue({
        data: MESSAGES,
      });
    });

    it("is disabled if input is empty", () => {
      renderApp();
      const input = screen.getByLabelText("Enter message");
      const sendButton = screen.getByText("Send");
      expect(sendButton).toBeDisabled();
      fireEvent.change(input, { target: { value: "Hello" } });
      expect(sendButton).not.toBeDisabled();
    });
  });
});
