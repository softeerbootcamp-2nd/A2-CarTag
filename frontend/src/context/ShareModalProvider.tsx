import { ReactNode, createContext, useState } from 'react';

interface IShareModalContext {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IShareModalProvider {
  children: ReactNode;
}

const initialContext = {
  visible: false,
  setVisible: () => {},
};

export const ShareModalContext = createContext<IShareModalContext>(initialContext);

export default function ShareModalProvider({ children }: IShareModalProvider) {
  const [visible, setVisible] = useState(initialContext.visible);

  return (
    <ShareModalContext.Provider value={{ visible, setVisible }}>
      {children}
    </ShareModalContext.Provider>
  );
}
