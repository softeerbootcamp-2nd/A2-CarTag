import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

export interface IDefaultPage {
  isClone?: boolean;
  onExitAnimationDone?: () => void;
}

interface IPageAnimationWrapper extends IDefaultPage, React.HTMLAttributes<HTMLDivElement> {}
export default function PageAnimationWrapper({
  isClone = false,
  onExitAnimationDone = () => {},
  ...props
}: IPageAnimationWrapper) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isClone) {
      const animate = wrapperRef.current?.animate([{ transform: 'translateX(-100%)' }], {
        duration: 1000,
        fill: 'forwards',
      });

      animate?.commitStyles();
      animate?.finished.then(onExitAnimationDone);
      return () => animate?.cancel();
    } else {
      const animate = wrapperRef.current?.animate([{ transform: 'translateX(-100%)' }], {
        duration: 1000,
        fill: 'forwards',
      });

      animate?.commitStyles();
      return () => animate?.cancel();
    }
  });

  return <Wrapper ref={wrapperRef} $isClone={isClone} {...props}></Wrapper>;
}

const Wrapper = styled.div<{ $isClone: boolean }>``;
