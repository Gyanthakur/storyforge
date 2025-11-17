// // app/hooks/useChat.ts
// import { useState } from 'react';

// export const useChat = () => {
//   const [messages, setMessages] = useState<string[]>([]);

//   const sendMessage = (message: string) => {
//     setMessages((prevMessages) => [...prevMessages, message]);
//   };

//   return { messages, sendMessage };
// };

// app/hooks/useChat.ts
import { useState } from 'react';

// Import axios to make HTTP requests
import axios from 'axios';

export const useChat = () => {
  const [messages, setMessages] = useState<{ text: string; from: 'user' | 'agent' }[]>([]);

  // Function to send message
  const sendMessage = async (message: string) => {
    // Add the user message to the chat
    setMessages((prevMessages) => [...prevMessages, { text: message, from: 'user' }]);

    try {
      // Send the user's message to the backend
      const response = await axios.post('http://127.0.0.1:8000/ask-agent/', {
        question: message,
      });

      // Extract the agent's response from the backend
      const agentResponse = response.data.answer;

      // Add the agent's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: agentResponse, from: 'agent' },
      ]);
    } catch (error) {
      console.error('Error fetching agent response:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Error: Could not get agent response', from: 'agent' },
      ]);
    }
  };

  return { messages, sendMessage };
};
