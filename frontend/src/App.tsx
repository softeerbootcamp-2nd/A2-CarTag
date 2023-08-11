import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import PriceStaticBar from './components/priceStaticBar/PriceStaticBar';
import CustomRouter from './components/router/CustomRouter';
import ModalContainer from './containers/Modal/ModalContainer';
import CloseModalProvider from './context/closeModalContext';
import SimilarQuoteModalProvider from './context/SimilarQuoteModalContext';
import GuideModalProvider from './context/GuideMoadlContext';

function App() {
  return (
    <CloseModalProvider>
      <SimilarQuoteModalProvider>
        <GuideModalProvider>
          <BrowserRouter>
            <NavBar />

            <PriceStaticBar />
            <CustomRouter />
            <ModalContainer />
          </BrowserRouter>
        </GuideModalProvider>
      </SimilarQuoteModalProvider>
    </CloseModalProvider>
  );
}

export default App;
