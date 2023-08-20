import { useContext } from 'react';
import CloseModal from '../../components/modal/CloseModal';
import GuideModal from '../../components/modal/GuideModal';
import SimilarQuoteModal from '../../components/modal/SimilarQuoteModal';
import { GuideModalContext } from '../../context/GuideModalProvider';
import { SimilarQuoteModalContext } from '../../context/SimilarQuoteModalProvider';
import { CloseModalContext } from '../../context/CloseModalProvider';
import QuoteSummaryModal from '../../components/modal/QuoteSummaryModal';
import { QuoteSummaryModalContext } from '../../context/QuoteSummaryModalProvider';

export default function ModalContainer() {
  const { setVisible: setCloseModalVisible } = useContext(CloseModalContext);
  const { setVisible: setGuideModalVisible } = useContext(GuideModalContext);
  const { setVisible: setSimilarQuoteModalVisible } = useContext(SimilarQuoteModalContext);
  const { setVisible: setQuoteSummaryModalVisible } = useContext(QuoteSummaryModalContext);

  return (
    <>
      <CloseModal onClick={() => setCloseModalVisible(false)} />
      <GuideModal onClick={() => setGuideModalVisible(false)} />
      <SimilarQuoteModal onClick={() => setSimilarQuoteModalVisible(false)} />
      <QuoteSummaryModal onClick={() => setQuoteSummaryModalVisible(false)} />
    </>
  );
}
