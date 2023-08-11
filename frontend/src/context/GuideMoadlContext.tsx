import { ReactNode, createContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface IGuideModalContext {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IGuideModalProvider {
  children: ReactNode;
}

const initialContext = {
  visible: true,
  setVisible: () => {},
};

export const GuideModalContext = createContext<IGuideModalContext>(initialContext);

export default function GuideModalProvider({ children }: IGuideModalProvider) {
  const [visible, setVisible] = useState(true);
  useLocation;

  return (
    <GuideModalContext.Provider value={{ visible, setVisible }}>
      {children}
    </GuideModalContext.Provider>
  );
}
