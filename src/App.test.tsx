import { render, fireEvent, screen, act } from "@testing-library/react";
import App from "./App";
import axios from "axios";
import { QueryClientProvider, QueryClient } from "react-query";
import { Message } from "./types";

const queryClient = new QueryClient();
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

const renderApp = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );

describe("Doodle chat", () => {
  describe("loading state", () => {
    it("displays 'Loading...' when data is being fetched", async () => {
      (axios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          data: [],
        })
      );
      renderApp();
      const loadingElement = screen.getByText(/Loading.../i);
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

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      MESSAGES.forEach((message) => {
        expect(screen.getByText(message.message)).toBeInTheDocument();
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
