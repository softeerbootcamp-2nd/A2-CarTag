import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';

interface IAnimatePresence extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
interface IElementByKeyMap {
  [key: React.Key]: React.ReactElement;
}

export default function AnimatePresence({ children, ...props }: IAnimatePresence) {
  const validChildren = getAllValidChildren(children);
  const childrenOfPreviousRender = useRef(validChildren);
  const elementByKey = useRef<IElementByKeyMap>(getElementByKeyMap(validChildren, {}));
  const [_, forceRender] = useState(0);

  useLayoutEffect(() => {
    childrenOfPreviousRender.current = validChildren;
  });
  useLayoutEffect(() => {
    elementByKey.current = getElementByKeyMap(validChildren, elementByKey.current);
  });

  const currentKeys = validChildren.map((element: React.ReactElement) => {
    return element.key;
  });
  const prevKeys = childrenOfPreviousRender.current.map((element: React.ReactElement) => {
    return element.key;
  });
  const removedChildrenKey = new Set(prevKeys.filter((key) => !currentKeys.includes(key)));

  console.log(prevKeys, '에서 ', currentKeys, '로 이동');
  console.log('언 마운트 대상:', prevKeys);
  const childrenToRender = validChildren.map((child) =>
    React.cloneElement(child, { isClone: false })
  );

  removedChildrenKey.forEach((removedKey) => {
    if (!removedKey) return;
    const element = elementByKey.current[removedKey];
    const elementIndex = prevKeys.indexOf(removedKey);

    const onExitAnimationDone = () => {
      removedChildrenKey.delete(removedKey);
      if (!removedChildrenKey.size) {
        forceRender(0);
      }
    };

    childrenToRender.splice(
      elementIndex,
      0,
      React.cloneElement(element, { isClone: true, onExitAnimationDone })
    );
  });

  return (
    <Wrapper>
      {childrenToRender.map((page, idx) => (
        <Page key={idx}>{page}</Page>
      ))}
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  display: flex;
`;
const Page = styled.div`
  width: 100vw;
`;

function getElementByKeyMap(validchildren: Array<React.ReactElement>, map: IElementByKeyMap) {
  const result = validchildren.reduce((acc, child) => {
    const key = child.key ? child.key : 'defaultKey';
    acc[key] = child;
    return acc;
  }, map);

  return result;
}

function getAllValidChildren(elements: React.ReactNode) {
  let validChildren: Array<React.ReactElement> = [];
  React.Children.forEach(elements, (element) => {
    if (React.isValidElement(element)) {
      validChildren.push(element);
    }
  });

  return validChildren;
}

function getKey(element: React.ReactElement) {
  return element.key ?? 'defaultKey';
}

function useForceRender() {
  const [_, setCount] = useState(0);

  return useCallback(() => setCount((prev) => prev + 1), []);
}
