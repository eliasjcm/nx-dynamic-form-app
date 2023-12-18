import { configureStore } from '@reduxjs/toolkit';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { getPlainForm } from 'src/data/form';
import formSlice from 'src/features/form/formSlice';
import uiSlice from 'src/features/ui/uiSlice';
import { AppStore } from 'src/store/store';
import { ResultField } from './ResultField';

describe('Field component', () => {
  let store: AppStore;
  const firstNameObj = getPlainForm().find((field) => field.id === 'firstName');

  beforeEach(() => {
    store = configureStore({
      reducer: {
        form: formSlice,
        ui: uiSlice,
      },
    });
  });

  test('should render', () => {
    const result = render(
      <Provider store={store}>
        <Router>
          <ResultField field={firstNameObj!} value="test" />
        </Router>
      </Provider>
    );

    expect(result).toBeTruthy();

    expect(
      screen.getByTestId(`${firstNameObj!.id}-result-name`).textContent
    ).toBe(`${firstNameObj!.name || firstNameObj!.id}: `);

    expect(
      screen.getByTestId(`${firstNameObj!.id}-result-value`).textContent
    ).toBe('test');
  });

  test('should render blank', () => {
    const result = render(
      <Provider store={store}>
        <Router>
          <ResultField field={firstNameObj!} value="" />
        </Router>
      </Provider>
    );

    expect(result).toBeTruthy();

    expect(
      screen.getByTestId(`${firstNameObj!.id}-result-name`).textContent
    ).toBe(`${firstNameObj!.name || firstNameObj!.id}: `);

    expect(
      screen.getByTestId(`${firstNameObj!.id}-result-value`).textContent
    ).toBe('N/A');
  });
});
