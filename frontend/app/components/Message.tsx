import React from 'react';

const Message = ({ text }: { text: string }) => {
  return (
    <div className="mb-2 p-2 bg-gray-100 rounded-lg">
      <p>{text}</p>
    </div>
  );
};

export default Message;
