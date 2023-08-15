import { ReactNode, createContext, useState } from 'react';

interface ISimilarQuoteModalContext {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ISimilarQuoteModalProvider {
  children: ReactNode;
}

const initialContext = {
  visible: false,
  setVisible: () => {},
};

export const SimilarQuoteModalContext = createContext<ISimilarQuoteModalContext>(initialContext);

export default function SimilarQuoteModalProvider({ children }: ISimilarQuoteModalProvider) {
  const [visible, setVisible] = useState(false);

  return (
    <SimilarQuoteModalContext.Provider value={{ visible, setVisible }}>
      {children}
    </SimilarQuoteModalContext.Provider>
  );
}
