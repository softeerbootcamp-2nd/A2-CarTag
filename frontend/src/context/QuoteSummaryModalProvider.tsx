import { ReactNode, createContext, useState } from 'react';

interface IQuoteSummaryModalContext {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IQuoteSummaryModalProvider {
  children: ReactNode;
}

const initialContext = {
  visible: false,
  setVisible: () => {},
};

export const QuoteSummaryModalContext = createContext<IQuoteSummaryModalContext>(initialContext);

export default function QuoteSummaryModalProvider({ children }: IQuoteSummaryModalProvider) {
  const [visible, setVisible] = useState(initialContext.visible);

  return (
    <QuoteSummaryModalContext.Provider value={{ visible, setVisible }}>
      {children}
    </QuoteSummaryModalContext.Provider>
  );
}
