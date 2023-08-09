import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import PriceStaticBar from './components/priceStaticBar/PriceStaticBar';
import CustomRouter from './components/router/CustomRouter';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <PriceStaticBar />
      <CustomRouter />
    </BrowserRouter>
  );
}

export default App;
