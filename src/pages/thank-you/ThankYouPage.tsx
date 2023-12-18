import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UiStatus } from '../../features/ui/uiSlice';
import { RootState } from '../../store/store';
import { fields } from '../../data/form';
import './ThankYouPage.css';
import { ResultField } from 'src/components/result-field/ResultField';

const ThankYouPage = () => {
  const status = useSelector((state: RootState) => state.ui.status);
  const values = useSelector((state: RootState) => state.form.values);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (status !== UiStatus.Approved) {
      navigate('/');
    }
  }, [status, navigate]);

  return (
    <div className="thank-you-page">
      <h1>Thank you for your submission!</h1>
      <p className="description">Here are the values you submitted:</p>
      <div className="fields-container">
        {fields.map((field, idx) => {
          if (!Array.isArray(field)) {
            return (
              <ResultField
                key={idx.toString()}
                field={field}
                value={values[field.id]}
              />
            );
          } else {
            return (
              <div key={idx.toString()} className="multiple-fields-container">
                {field.map((subField) => (
                  <ResultField
                    key={subField.id}
                    field={subField}
                    value={values[subField.id]}
                  />
                ))}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ThankYouPage;
