import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ItemContext } from './ItemProvider';
import { QUOTE_LIST_API } from '../utils/apis';

interface IQuote {
  historyId: number;
  soldCount: number;
  histories: IQuote;
}
interface IQuoteListContext {
  quoteList: IQuote[] | null;
  setQuoteList: Dispatch<SetStateAction<IQuote[] | null>>;
}
interface IQuoteListProvider {
  children: ReactNode;
}

const initialContext = {
  quoteList: null,
  setQuoteList: () => {},
};
export const QuoteListContext = createContext<IQuoteListContext>(initialContext);
export default function QuoteListProvider({ children }: IQuoteListProvider) {
  const { selectedItem } = useContext(ItemContext);
  const [quoteList, setQuoteList] = useState<IQuote[] | null>(initialContext.quoteList);
  const providerValue = {
    quoteList,
    setQuoteList,
  };

  useEffect(() => {
    const fetchQuoteList = async () => {
      const optionIds = selectedItem.options.map((option) => option.id);
      const params = {
        carId: 1,
        powerTrainId: selectedItem.modelType.powerTrain.id,
        bodyTypeId: selectedItem.modelType.bodyType.id,
        operationId: selectedItem.modelType.operation.id,
        outerColorId: selectedItem.outerColor.id,
        innerColorId: selectedItem.innerColor.id,
        optionIdList: optionIds,
      };
      console.log('fetch 요청 시작', params);
      const res = await fetch(QUOTE_LIST_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      setQuoteList(data);
    };

    // const abortController = new AbortController();
    console.log('셀렉트 아이템이 바뀌었다!');
    fetchQuoteList();
  }, [selectedItem]);

  return <QuoteListContext.Provider value={providerValue}>{children}</QuoteListContext.Provider>;
}
