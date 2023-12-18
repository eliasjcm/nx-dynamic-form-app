import React from 'react';
import { RootState } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { resetErrorField, updateForm } from '../../features/form/formSlice';

import './Field.css';

interface FieldProps {
  id: string;
  type: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  options?: string[];
}

export const Field: React.FC<FieldProps> = ({
  id,
  type,
  placeholder,
  name,
  options,
}) => {
  // use value and error from selector
  const value = useSelector((state: RootState) => state.form.values[id]);
  const error = useSelector((state: RootState) => state.form.errors[id]);

  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (error) dispatch(resetErrorField({ id }));
    dispatch(updateForm({ id, value: e.target.value }));
  };

  return (
    <div className="field-container">
      <label htmlFor={id}>{name || id}</label>
      {type === 'select' ? (
        <select
          id={id}
          value={value || ''}
          onChange={(event) => handleChange(event)}
          className={`${error ? 'error' : ''}`}
          data-testid={id}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value || ''}
          onChange={(event) => handleChange(event)}
          className={`${error ? 'error' : ''}`}
          rows={5}
          data-testid={id}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value || ''}
          onChange={(event) => handleChange(event)}
          className={`${error ? 'error' : ''}`}
          data-testid={id}
        />
      )}
      {error && (
        <p className="error-message" data-testid={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};
