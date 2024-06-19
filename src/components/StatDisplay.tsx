import React from 'react';

interface StatDisplayProps {
  label: string;
  value?: number;
}

const StatDisplay: React.FC<StatDisplayProps> = ({ label, value }) => {
  return (
    <p>
      {label} {value !== undefined ? value.toFixed(2) : 'N/A'}
    </p>
  );
};

export default StatDisplay;
