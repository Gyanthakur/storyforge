"use client";
import React, { useState } from "react";
import InputBar from "@/components/InputBar";
import ChatBox from "../components/ChatBox";

const AgentUI = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; from: "user" | "agent" }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (question: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: `You: ${question}`, from: "user" },
    ]);
    setLoading(true);

    try {
      // Send request to backend to get the agent's response
      const response = await fetch("http://127.0.0.1:8000/ask-agent/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      // Check if the response is valid
      if (response.ok) {
        const data = await response.json();
        if (data.error) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: `Agent: ${data.error}`, from: "agent" },
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: `Agent: ${data.answer || "No answer provided"}`, from: "agent" },
          ]);
        }
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Agent: Error occurred", from: "agent" },
        ]);
      }
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Agent: Error occurred", from: "agent" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold">Chat with Agent</h2>
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isChatOpen ? "Close Chat" : "Open Chat"}
      </button>
      {isChatOpen && (
        <>
          <ChatBox messages={messages} />
          <InputBar sendMessage={sendMessage} loading={loading} />
        </>
      )}
    </div>
  );
};

export default AgentUI;
