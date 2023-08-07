import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import { CustomRouter } from './components/router/CustomRouter';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <CustomRouter />
    </BrowserRouter>
  );
}

export default App;
