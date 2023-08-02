import { createBrowserRouter } from 'react-router-dom';
import App from './App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/trim',
    element: <div>트림 선택 페이지</div>,
  },
  {
    path: '/type',
    element: <div>타입 선택 페이지</div>,
  },
  {
    path: '/outside',
    element: <div>외장 색상 선택 페이지</div>,
  },
  {
    path: '/inside',
    element: <div>내장 색상 선택 페이지</div>,
  },
  {
    path: '/option',
    element: <div>옵션 선택 페이지</div>,
  },
  {
    path: '/result',
    element: <div>결과 페이지</div>,
  },
]);
