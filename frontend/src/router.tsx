import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { TrimPage } from './pages/TrimPage';
import { PATH } from './utils/url';
import ExteriorPage from './pages/ExteriorPage';
import { ModelTypePage } from './pages/ModelTypePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: PATH.trim,
        element: <TrimPage />,
      },
      {
        path: 'type',
        element: <ModelTypePage />,
      },
      {
        path: PATH.exterior,
        element: <ExteriorPage />,
      },
      {
        path: PATH.interior,
        element: <div>inside 페이지</div>,
      },
      {
        path: PATH.option,
        element: <div>option 페이지</div>,
      },
      {
        path: PATH.result,
        element: <div>result 페이지</div>,
      },
    ],
  },
]);
