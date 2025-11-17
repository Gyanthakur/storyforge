// // import React from 'react';
// // import Message from './Message';

// // const ChatBox = ({ messages }: { messages: string[] }) => {
// //   return (
// //     <div className="mt-4 p-4 border border-gray-300 rounded-lg max-h-80 overflow-auto">
// //       {messages.map((msg, idx) => (
// //         <Message key={idx} text={msg} />
// //       ))}
// //     </div>
// //   );
// // };

// // export default ChatBox;


// // app/components/ChatBox.tsx
// import React from 'react';

// interface ChatBoxProps {
//   messages: { text: string; from: 'user' | 'agent' }[];
// }

// const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
//   return (
//     <div className="chat-box">
//       {messages.map((message, index) => (
//         <div
//           key={index}
//           className={`message ${message.from === 'user' ? 'user' : 'agent'}`}
//         >
//           <p>{message.text}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ChatBox;

"use client";
import React from "react";

interface ChatBoxProps {
  messages: { text: string; from: "user" | "agent" }[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  return (
    <div className="overflow-y-auto h-64 border-b border-gray-300 p-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-2 ${msg.from === "user" ? "text-right" : "text-left"}`}
        >
          <div
            className={`inline-block px-4 py-2 rounded-full ${
              msg.from === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
