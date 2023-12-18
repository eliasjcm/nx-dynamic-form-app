import React from 'react';

import './ResultField.css';

interface ResultFieldProps {
  field: {
    name: string;
    id: string;
  };
  value: string;
}

export const ResultField: React.FC<ResultFieldProps> = ({ field, value }) => {
  return (
    <div className="field-result-container">
      <span
        className="field-result-name"
        data-testid={`${field.id}-result-name`}
      >
        {field.name || field.id}:{' '}
      </span>
      <span
        className={`field-result-value ${
          value === '' ? 'field-result-value-blank' : ''
        }`}
        data-testid={`${field.id}-result-value`}
      >
        {value !== '' ? value : 'N/A'}
      </span>
    </div>
  );
};
