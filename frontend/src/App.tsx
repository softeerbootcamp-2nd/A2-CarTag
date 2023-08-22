import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/common/navbar/NavBar';
import Providers from './components/contextProviders/Providers';
import PriceStaticBar from './components/priceStaticBar/PriceStaticBar';
import CustomRouter from './components/router/CustomRouter';
import ModalContainer from './containers/Modal/ModalContainer';
import CloseModalProvider from './context/CloseModalProvider';
import SimilarQuoteModalProvider from './context/SimilarQuoteModalProvider';
import GuideModalProvider from './context/GuideModalProvider';
import ItemProvider from './context/ItemProvider';
import QuoteSummaryModalProvider from './context/QuoteSummaryModalProvider';
import ShareModalProvider from './context/ShareModalProvider';
import ProgressProvider from './context/ProgressProvider';

function App() {
  const globalProviders = [
    CloseModalProvider,
    SimilarQuoteModalProvider,
    GuideModalProvider,
    QuoteSummaryModalProvider,
    ShareModalProvider,
    ItemProvider,
    ProgressProvider,
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
