import React from 'react';
import AgentUI from './AgentUI';
import AgentHistory from './AgentHistory';

const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="mt-6">
        <AgentUI />
        <AgentHistory />
      </div>
    </div>
  );
};

export default Dashboard;
