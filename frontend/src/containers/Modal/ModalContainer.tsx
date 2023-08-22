import { useContext } from 'react';
import CloseModal from '../../components/modal/CloseModal';
import GuideModal from '../../components/modal/GuideModal';
import SimilarQuoteModal from '../../components/modal/SimilarQuoteModal';
import { GuideModalContext } from '../../context/ModalProviders/GuideModalProvider';
import { SimilarQuoteModalContext } from '../../context/ModalProviders/SimilarQuoteModalProvider';
import { CloseModalContext } from '../../context/ModalProviders/CloseModalProvider';
import QuoteSummaryModal from '../../components/modal/QuoteSummaryModal';
import { QuoteSummaryModalContext } from '../../context/ModalProviders/QuoteSummaryModalProvider';
import ShareModal from '../../components/modal/ShareModal';
import { ShareModalContext } from '../../context/ModalProviders/ShareModalProvider';

export default function ModalContainer() {
  const { setVisible: setCloseModalVisible } = useContext(CloseModalContext);
  const { setVisible: setGuideModalVisible } = useContext(GuideModalContext);
  const { setVisible: setSimilarQuoteModalVisible } = useContext(SimilarQuoteModalContext);
  const { setVisible: setQuoteSummaryModalVisible } = useContext(QuoteSummaryModalContext);
  const { setVisible: setShareModalVisible } = useContext(ShareModalContext);

  return (
    <>
      <CloseModal onClick={() => setCloseModalVisible(false)} />
      <GuideModal onClick={() => setGuideModalVisible(false)} />
      <SimilarQuoteModal onClick={() => setSimilarQuoteModalVisible(false)} />
      <QuoteSummaryModal onClick={() => setQuoteSummaryModalVisible(false)} />
      <ShareModal onClick={() => setShareModalVisible(false)} />
    </>
  );
}
