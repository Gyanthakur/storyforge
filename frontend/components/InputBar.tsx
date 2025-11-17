// // import React, { useState } from 'react';

// // const InputBar = ({ sendMessage }: { sendMessage: (msg: string) => void }) => {
// //   const [message, setMessage] = useState('');

// //   const handleSendMessage = () => {
// //     if (message.trim()) {
// //       sendMessage(message);
// //       setMessage('');
// //     }
// //   };

// //   return (
// //     <div className="flex mt-4">
// //       <input
// //         type="text"
// //         value={message}
// //         onChange={(e) => setMessage(e.target.value)}
// //         className="flex-1 p-2 border border-gray-300 rounded"
// //         placeholder="Type a message"
// //       />
// //       <button onClick={handleSendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
// //         Send
// //       </button>
// //     </div>
// //   );
// // };

// // export default InputBar;

// import React, { useState } from 'react';

// const InputBar = ({ sendMessage }: { sendMessage: (msg: string) => void }) => {
//   const [message, setMessage] = useState('');

//   const handleSendMessage = () => {
//     if (message.trim()) {
//       sendMessage(message);
//       setMessage('');
//     }
//   };

//   return (
//     <div className="flex mt-4">
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         className="flex-1 p-2 border border-gray-300 rounded"
//         placeholder="Type a message"
//       />
//       <button onClick={handleSendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
//         Send
//       </button>
//     </div>
//   );
// };

// export default InputBar;

"use client";
import React, { useState } from "react";

interface InputBarProps {
  sendMessage: (question: string) => void;
  loading: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ sendMessage, loading }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== "") {
      sendMessage(input);
      setInput(""); // Clear input after sending
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mt-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-l-lg"
        placeholder="Type your message..."
        disabled={loading}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-r-lg"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default InputBar;
