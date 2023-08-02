import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { theme } from './styles/theme';
import { Outlet, RouterProvider } from 'react-router-dom';
import { router } from './router';
import NavBar from './components/layout/NavBar/NavBar';

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </>
  );
}

export default App;
