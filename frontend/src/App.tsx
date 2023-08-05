import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import AnimatePresence from './components/AnimationPresence';
import { CustomRoutes } from './components/CustomRoutes';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <CustomRoutes />
    </BrowserRouter>
  );
}

export default App;
