import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import PriceStaticBar from './components/priceStaticBar/PriceStaticBar';
import CustomRouter from './components/router/CustomRouter';
import ModalContainer from './containers/Modal/ModalContainer';
import CloseModalProvider from './context/CloseModalContext';
import SimilarQuoteModalProvider from './context/SimilarQuoteModalContext';
import GuideModalProvider from './context/GuideMoadlContext';
import Providers from './components/contextProviders/Providers';

function App() {
  const modalProviders = [CloseModalProvider, SimilarQuoteModalProvider, GuideModalProvider];
  return (
    <Providers contexts={modalProviders}>
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

