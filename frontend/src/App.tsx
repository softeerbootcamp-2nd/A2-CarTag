import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/common/navbar/NavBar';
import Providers from './components/contextProviders/Providers';
import PriceStaticBar from './components/priceStaticBar/PriceStaticBar';
import CustomRouter from './components/router/CustomRouter';
import ModalContainer from './containers/Modal/ModalContainer';
import CloseModalProvider from './context/ModalProviders/CloseModalProvider';
import SimilarQuoteModalProvider from './context/ModalProviders/SimilarQuoteModalProvider';
import GuideModalProvider from './context/ModalProviders/GuideModalProvider';
import QuoteSummaryModalProvider from './context/ModalProviders/QuoteSummaryModalProvider';
import ShareModalProvider from './context/ModalProviders/ShareModalProvider';
import ItemProvider from './context/ItemProvider';
import ProgressProvider from './context/ProgressProvider';
import QuoteListProvider from './context/QuoteListProvider';

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
      <QuoteListProvider>
        <BrowserRouter>
          <NavBar />
          <PriceStaticBar />
          <CustomRouter />
          <ModalContainer />
        </BrowserRouter>
      </QuoteListProvider>
    </Providers>
  );
}

export default App;
