import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, screen, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  MemoryRouter as Router,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import { getPlainForm } from 'src/data/form';
import formSlice from 'src/features/form/formSlice';
import uiSlice, { UiStatus } from 'src/features/ui/uiSlice';
import FormPage from './FormPage';
import { AppStore } from 'src/store/store';
import { routesConfig } from '../../routes';
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks(); // mock for useNavigate

describe('Form Page', () => {
  let store: AppStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        form: formSlice,
        ui: uiSlice,
      },
    });
  });

  test('should check required fields', async () => {
    const result = render(
      <Provider store={store}>
        <Router>
          <FormPage />
        </Router>
      </Provider>
    );

    fireEvent.submit(result.getByTestId('form'));

    await waitFor(async () => {
      expect(await screen.findByTestId('email-error')).toBeTruthy();
    });

    expect(screen.getAllByText(/value required/i)).toHaveLength(
      getPlainForm().filter((field) => field.required).length
    );
  });

  test('should check for valid email', () => {
    const result = render(
      <Provider store={store}>
        <Router>
          <FormPage />
        </Router>
      </Provider>
    );

    fireEvent.change(result.getByTestId('email'), {
      target: { value: 'invalidemail@test' },
    });

    fireEvent.submit(result.getByTestId('form'));

    expect(screen.getByText(/invalid email/i)).toBeTruthy();
  });

  test('should check for valid phone number', () => {
    const result = render(
      <Provider store={store}>
        <Router>
          <FormPage />
        </Router>
      </Provider>
    );

    fireEvent.change(result.getByTestId('phone'), {
      target: { value: 'invalid phone' },
    });

    fireEvent.submit(result.getByTestId('form'));

    expect(screen.getByText(/invalid number/i)).toBeTruthy();
  });

  test('should submit form', async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/'],
      initialIndex: 1,
    });

    const result = render(
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    );

    fireEvent.change(result.getByTestId('firstName'), {
      target: { value: 'John' },
    });

    fireEvent.change(result.getByTestId('lastName'), {
      target: { value: 'Williams' },
    });

    fireEvent.change(result.getByTestId('email'), {
      target: { value: 'johnwilliams@test.com' },
    });

    fireEvent.change(result.getByTestId('address1'), {
      target: { value: 'Home address of John Williams' },
    });

    fireEvent.change(result.getByTestId('phone'), {
      target: { value: '1234567890' },
    });

    fireEvent.change(result.getByTestId('city'), {
      target: { value: 'New York' },
    });

    fireEvent.change(result.getByTestId('state'), {
      target: { value: 'NY' },
    });

    fireEvent.change(result.getByTestId('zip'), {
      target: { value: '10001' },
    });

    fireEvent.change(result.getByTestId('jobTitle'), {
      target: { value: 'Engineer - lead' },
    });

    fireEvent.change(result.getByTestId('reason'), {
      target: { value: 'For testing' },
    });

    fireEvent.submit(result.getByTestId('form'));

    await waitFor(async () => {
      expect(store.getState().ui.status).toEqual(UiStatus.Approved);
    });

    await waitFor(async () => {
      expect(await screen.findByText(/thank you/i)).toBeTruthy();
    });
  });
});
