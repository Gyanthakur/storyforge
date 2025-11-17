import React from 'react';

const Card = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card;
