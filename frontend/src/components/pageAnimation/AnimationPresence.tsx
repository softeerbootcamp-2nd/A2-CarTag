import {
  Children,
  HTMLAttributes,
  Key,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from 'react';

interface IAnimatePresence extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
interface IElementByKeyMap {
  [key: Key]: ReactElement;
}

export default function AnimatePresence({ children }: IAnimatePresence) {
  const validChildren = getAllValidChildren(children);
  const childrenOfPreviousRender = useRef(validChildren);
  const elementByKey = useRef<IElementByKeyMap>(getElementByKeyMap(validChildren, {}));
  const [_, forceRender] = useState(0);

  /**
   * 렌더링이 끝난 이후, 렌더링 전의 컴포넌트를 참조하여 기억
   * elementByKey는 직전 렌더링과 직후 렌더링 되는 컴포넌트 기억
   */
  useEffect(() => {
    childrenOfPreviousRender.current = validChildren;
    elementByKey.current = getElementByKeyMap(validChildren, elementByKey.current);
  });

  /**
   * 언마운트 대상 컴포넌트 찾기
   */
  const currentKeys = validChildren.map((element: ReactElement) => {
    return element.key;
  });
  const prevKeys = childrenOfPreviousRender.current.map((element: ReactElement) => {
    return element.key;
  });
  const removedChildrenKey = new Set(prevKeys.filter((key) => !currentKeys.includes(key)));
  const childrenToRender = validChildren.map((child) => cloneElement(child, { isVisible: true }));

  /**
   * isVisible 를 통해 사라질 컴포넌트 구분
   */
  removedChildrenKey.forEach((removedKey) => {
    if (!removedKey) return;

    const onExitAnimationDone = () => {
      removedChildrenKey.delete(removedKey);
      if (!removedChildrenKey.size) {
        forceRender((cur) => cur + 1);
      }
    };

    const element = elementByKey.current[removedKey];
    const elementIndex = prevKeys.indexOf(removedKey);
    childrenToRender.splice(
      elementIndex,
      0,
      cloneElement(element, { isVisible: false, onExitAnimationDone })
    );
  });

  return <>{childrenToRender}</>;
}

function getElementByKeyMap(validchildren: Array<ReactElement>, map: IElementByKeyMap) {
  const result = validchildren.reduce((acc, child) => {
    const key = child.key ? child.key : 'defaultKey';
    acc[key] = child;
    return acc;
  }, map);

  return result;
}

function getAllValidChildren(elements: ReactNode) {
  const validChildren: Array<ReactElement> = [];
  Children.forEach(elements, (element) => {
    if (isValidElement(element)) {
      validChildren.push(element);
    }
  });

  return validChildren;
}
