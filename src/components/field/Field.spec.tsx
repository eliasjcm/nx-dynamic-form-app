import { configureStore } from '@reduxjs/toolkit';
import { screen, render, waitFor, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { getPlainForm } from 'src/data/form';
import formSlice, { updateErrors } from 'src/features/form/formSlice';
import uiSlice from 'src/features/ui/uiSlice';
import { AppStore } from 'src/store/store';
import { Field } from './Field';

describe('Field component', () => {
  let store: AppStore;
  const firstNameObj = getPlainForm().find((field) => field.id === 'firstName');
  const jobTitleObj = getPlainForm().find((field) => field.id === 'jobTitle');
  const reasonObj = getPlainForm().find((field) => field.id === 'reason');

  beforeEach(() => {
    store = configureStore({
      reducer: {
        form: formSlice,
        ui: uiSlice,
      },
    });
  });

  test('should render type text', () => {
    const result = render(
      <Provider store={store}>
        <Router>
          <Field
            id={firstNameObj!.id}
            type={firstNameObj!.type}
            placeholder={firstNameObj!.placeholder}
            name={firstNameObj!.name}
            required={firstNameObj!.required}
            options={firstNameObj?.options}
          />
        </Router>
      </Provider>
    );

    expect(result).toBeTruthy();
  });

  test('should render type select', () => {
    const result = render(
      <Provider store={store}>
        <Router>
          <Field
            id={jobTitleObj!.id}
            type={jobTitleObj!.type}
            placeholder={jobTitleObj!.placeholder}
            name={jobTitleObj!.name}
            required={jobTitleObj!.required}
            options={jobTitleObj?.options}
          />
        </Router>
      </Provider>
    );

    expect(result).toBeTruthy();
  });

  test('should render type textarea', () => {
    const result = render(
      <Provider store={store}>
        <Router>
          <Field
            id={reasonObj!.id}
            type={reasonObj!.type}
            placeholder={reasonObj!.placeholder}
            name={reasonObj!.name}
            required={reasonObj!.required}
            options={reasonObj?.options}
          />
        </Router>
      </Provider>
    );

    expect(result).toBeTruthy();
  });

  test('should render error message', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Field
            id={firstNameObj!.id}
            type={firstNameObj!.type}
            placeholder={firstNameObj!.placeholder}
            name={firstNameObj!.name}
            required={firstNameObj!.required}
            options={firstNameObj?.options}
          />
        </Router>
      </Provider>
    );

    act(() => {
      store.dispatch(
        updateErrors({
          firstName: 'Value required',
        })
      );
    });

    await waitFor(async () => {
      expect(await screen.findByText(/value required/i)).toBeTruthy();
    });
  });

  test('should clear error message after typing', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Field
            id={firstNameObj!.id}
            type={firstNameObj!.type}
            placeholder={firstNameObj!.placeholder}
            name={firstNameObj!.name}
            required={firstNameObj!.required}
            options={firstNameObj?.options}
          />
        </Router>
      </Provider>
    );

    act(() => {
      store.dispatch(
        updateErrors({
          firstName: 'Value required',
        })
      );
    });

    await waitFor(async () => {
      expect(await screen.findByText(/value required/i)).toBeTruthy();
    });

    fireEvent.change(screen.getByTestId('firstName'), {
      target: { value: 'test' },
    });

    await waitFor(async () => {
      expect(screen.queryByText(/value required/i)).toBeFalsy();
    });
  });
});
