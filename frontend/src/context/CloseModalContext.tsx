import { ReactNode, createContext, useState } from 'react';

interface ICloseModalContext {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ICloseModalProvider {
  children: ReactNode;
}

const initialContext = {
  visible: false,
  setVisible: () => {},
};

export const CloseModalContext = createContext<ICloseModalContext>(initialContext);

export default function CloseModalProvider({ children }: ICloseModalProvider) {
  const [visible, setVisible] = useState(false);

  return (
    <CloseModalContext.Provider value={{ visible, setVisible }}>
      {children}
    </CloseModalContext.Provider>
  );
}
