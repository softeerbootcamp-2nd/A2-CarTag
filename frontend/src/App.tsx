import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Providers from './components/contextProviders/Providers';
import PriceStaticBar from './components/priceStaticBar/PriceStaticBar';
import CustomRouter from './components/router/CustomRouter';
import ModalContainer from './containers/Modal/ModalContainer';
import CloseModalProvider from './context/CloseModalProvider';
import SimilarQuoteModalProvider from './context/SimilarQuoteModalProvider';
import GuideModalProvider from './context/GuideModalProvider';
import ItemProvider from './context/ItemProvider';

function App() {
  const globalProviders = [
    CloseModalProvider,
    SimilarQuoteModalProvider,
    GuideModalProvider,
    ItemProvider,
  ];
  return (
    <Providers contexts={globalProviders}>
      <BrowserRouter>
        <NavBar />
        <PriceStaticBar />
        <CustomRouter />
        <ModalContainer />
      </BrowserRouter>
    </Providers>
  );
}

export default App;
