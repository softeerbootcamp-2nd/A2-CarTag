import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

export interface IDefaultPage {
  onExitAnimationDone?: () => void;
  isVisible?: boolean;
}

interface IPageAnimationWrapper extends IDefaultPage, React.HTMLAttributes<HTMLDivElement> {}
export default function PageAnimationWrapper({
  onExitAnimationDone,
  isVisible = true,
  children,
}: IPageAnimationWrapper) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      const animate = wrapperRef.current?.animate(
        visibleAnimation.keyframes,
        visibleAnimation.option
      );

      return () => animate?.cancel();
    } else {
      const animate = wrapperRef.current?.animate(
        unvisibleAnimation.keyframes,
        unvisibleAnimation.option
      );

      animate?.finished.then(onExitAnimationDone).catch((err) => console.log(err));
      return () => animate?.cancel();
    }
  }, [isVisible, onExitAnimationDone]);

  return <Wrapper ref={wrapperRef}>{children}</Wrapper>;
}

const Wrapper = styled.div`
  opacity: 1;
  position: absolute;
  top: 60px;
  right: 0;
  width: 100vw;
`;

interface IAnimation {
  keyframes: Keyframe[];
  option: KeyframeAnimationOptions;
}

const visibleAnimation: IAnimation = {
  keyframes: [
    { right: '-100%', opacity: 0 },
    { right: 0, opacity: 1 },
  ],
  option: {
    duration: 700,
    easing: 'ease-out',
  },
};

const unvisibleAnimation: IAnimation = {
  keyframes: [
    { right: 0, opacity: 1 },
    { right: '100%', opacity: 0 },
  ],
  option: {
    duration: 700,
    easing: 'ease-out',
    fill: 'forwards',
  },
};
