import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import { CustomRouter } from './components/router/CustomRouter';
import PriceStaticBar from './components/priceStaticBar/PriceStaticBar';

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
