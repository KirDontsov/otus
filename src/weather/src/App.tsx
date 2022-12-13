import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AppPage } from './pages/AppPage';
import { ErrorPage } from './pages/ErrorPage';
import { CityPage } from './pages/CityPage';
import { AppContextProvider } from './context';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <CityPage />,
      },
    ],
  },
  {
    path: 'cities/:cityId',
    element: <CityPage />,
  },
]);

export const App = () => (
  <AppContextProvider>
    <RouterProvider router={router} />
  </AppContextProvider>
);
