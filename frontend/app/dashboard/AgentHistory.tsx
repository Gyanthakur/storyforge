import React from 'react';

const AgentHistory = () => {
  const interactions = [
    { id: 1, date: '2023-11-10', message: 'Hello, how can I assist you today?' },
    { id: 2, date: '2023-11-09', message: 'Your account balance is $500.' },
  ];

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Agent History</h3>
      <ul className="mt-4 space-y-3">
        {interactions.map((interaction) => (
          <li key={interaction.id} className="border p-4 rounded-md">
            <div className="font-medium">{interaction.date}</div>
            <div>{interaction.message}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentHistory;
