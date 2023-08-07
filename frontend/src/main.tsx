import ReactDOM from 'react-dom/client';
import './styles/reset.css';
import './styles/font.css';

import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme.ts';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
