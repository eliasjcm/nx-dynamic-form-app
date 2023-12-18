import './FormPage.css';
import { Field } from '../../components/field/Field';
import { fields, getPlainForm } from '../../data/form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { resetErrors, updateErrors } from '../../features/form/formSlice';
import { UiStatus, updateUiState } from '../../features/ui/uiSlice';
import { useNavigate } from 'react-router-dom';

const FormPage = () => {
  const values = useSelector((state: RootState) => state.form.values);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(resetErrors());

    const plainForm = getPlainForm();

    const errors: { [key: string]: string } = {};

    plainForm.forEach((field) => {
      if (field.required && !values[field.id]) {
        errors[field.id] = 'Value required';
      }

      if (field.id === 'email' && values[field.id]) {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(values[field.id])) {
          errors[field.id] = 'Invalid email';
        }
      }

      if (field.id === 'phone' && values[field.id]) {
        const numberRegex = /^\d+$/;
        if (!numberRegex.test(values[field.id])) {
          errors[field.id] = 'Invalid number';
        }
      }
    });

    if (Object.keys(errors).length > 0) {
      dispatch(updateErrors(errors));
    } else {
      dispatch(updateUiState(UiStatus.Approved));
      navigate('/thank-you');
    }
  };

  return (
    <>
      <h1>Form Submission</h1>
      <form onSubmit={handleSubmit} data-testid="form">
        {fields.map((field, idx) => {
          if (!Array.isArray(field)) {
            return (
              <Field
                key={idx}
                id={field.id}
                type={field.type}
                placeholder={field?.placeholder}
                required={field?.required}
                name={field.name}
                options={field?.options}
              />
            );
          } else {
            return (
              <div key={idx} className="multifield-container">
                {field.map(
                  (subField: {
                    id: string;
                    type: string;
                    placeholder?: string;
                    required?: boolean;
                    name?: string;
                  }) => (
                    <Field
                      key={subField.id}
                      id={subField.id}
                      type={subField.type}
                      placeholder={subField?.placeholder}
                      required={subField?.required}
                      name={subField.name}
                    />
                  )
                )}
              </div>
            );
          }
        })}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default FormPage;
