import { render, screen } from '@testing-library/react';
import formSlice from '../../features/form/formSlice';
import { getFormIds, getFormNames } from '../../data/form';
import { configureStore } from '@reduxjs/toolkit';
import uiSlice, { UiStatus } from '../../features/ui/uiSlice';
import { Provider } from 'react-redux';
import {
  MemoryRouter as Router,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import ThankYouPage from './ThankYouPage';
import { routesConfig } from 'src/routes';
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks(); // mock for useNavigate

describe('Thank You Page', () => {
  const formIds = getFormIds();

  const formState = formIds.reduce(
    (formObj, id) => ({ ...formObj, [id]: 'Test Value' }),
    {}
  );

  const store = configureStore({
    reducer: {
      form: formSlice,
      ui: uiSlice,
    },
    preloadedState: {
      form: {
        values: formState,
        errors: {},
      },
      ui: {
        status: UiStatus.Approved,
      },
    },
  });

  test('should render thank you page', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <ThankYouPage />
        </Router>
      </Provider>
    );

    expect(getByText(/Thank You/i)).toBeTruthy();
  });

  test('should render form field names', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <ThankYouPage />
        </Router>
      </Provider>
    );

    getFormNames().forEach((name) => {
      expect(getByText(new RegExp(name, 'i'))).toBeTruthy();
    });
  });

  test('should render form result values', () => {
    render(
      <Provider store={store}>
        <Router>
          <ThankYouPage />
        </Router>
      </Provider>
    );

    expect(screen.getAllByText(/Test Value/i).length).toBe(formIds.length);
  });

  test('should render form page if status is not approved', () => {
    const store = configureStore({
      reducer: {
        form: formSlice,
        ui: uiSlice,
      },
      preloadedState: {
        form: {
          values: formState,
          errors: {},
        },
        ui: {
          status: UiStatus.CollectInformation,
        },
      },
    });

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/thank-you'],
      initialIndex: 1,
    });

    const { getByText } = render(
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    );

    expect(getByText(/Form Submission/i)).toBeTruthy();
  });
});
