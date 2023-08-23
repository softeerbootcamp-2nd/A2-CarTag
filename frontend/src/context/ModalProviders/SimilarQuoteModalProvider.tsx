import { ReactNode, createContext, useState } from 'react';

export interface ISimilarQuoteIdList {
  quoteId: number | null;
  historyIds: number[] | null;
}

interface ISimilarQuoteModalContext {
  visible: boolean;
  similarQuoteIdList: ISimilarQuoteIdList | null;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSimilarQuoteIdList: React.Dispatch<React.SetStateAction<ISimilarQuoteIdList | null>>;
}

interface ISimilarQuoteModalProvider {
  children: ReactNode;
}

const initialContext = {
  visible: false,
  similarQuoteIdList: null,
  setVisible: () => {},
  setSimilarQuoteIdList: () => {},
};

export const SimilarQuoteModalContext = createContext<ISimilarQuoteModalContext>(initialContext);

export default function SimilarQuoteModalProvider({ children }: ISimilarQuoteModalProvider) {
  const [visible, setVisible] = useState(initialContext.visible);
  const [similarQuoteIdList, setSimilarQuoteIdList] = useState<ISimilarQuoteIdList | null>(
    initialContext.similarQuoteIdList
  );

  const providerValue = {
    visible,
    setVisible,
    similarQuoteIdList,
    setSimilarQuoteIdList,
  };

  return (
    <SimilarQuoteModalContext.Provider value={providerValue}>
      {children}
    </SimilarQuoteModalContext.Provider>
  );
}
