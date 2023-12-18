import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './index.css';
import { routesConfig } from './routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(routesConfig);

root.render(
  <StrictMode>
    <Provider store={setupStore()}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
