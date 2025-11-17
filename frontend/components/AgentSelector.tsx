import React, { useState } from 'react';

const AgentSelector = () => {
  const [selectedAgent, setSelectedAgent] = useState('');

  const handleAgentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAgent(event.target.value);
  };

  return (
    <div className="mt-4">
      <label className="block text-lg font-semibold">Select Agent</label>
      <select value={selectedAgent} onChange={handleAgentChange} className="mt-2 p-2 border border-gray-300 rounded">
        <option value="Agent-001">Agent-001</option>
        <option value="Agent-002">Agent-002</option>
      </select>
    </div>
  );
};

export default AgentSelector;
