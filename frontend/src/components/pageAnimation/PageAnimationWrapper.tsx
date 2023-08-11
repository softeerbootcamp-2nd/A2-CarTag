import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

export interface IDefaultPage {
  onExitAnimationDone?: () => void;
  isVisible?: boolean;
  isLeft?: boolean | undefined;
}

interface IPageAnimationWrapper extends IDefaultPage, React.HTMLAttributes<HTMLDivElement> {}
export default function PageAnimationWrapper({
  onExitAnimationDone,
  isVisible = true,
  isLeft,
  children,
}: IPageAnimationWrapper) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const visibleAnimation = isLeft ? visibleLeftAnimation : visibleRightAnimation;
    const unvisibleAnimation = isLeft ? unvisibleLeftAnimation : unvisibleRightAnimation;

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
  }, [isVisible, onExitAnimationDone, isLeft]);

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

const visibleLeftAnimation: IAnimation = {
  keyframes: [
    { right: '-100%', opacity: 0 },
    { right: 0, opacity: 1 },
  ],
  option: {
    duration: 700,
    easing: 'ease-out',
  },
};

const unvisibleLeftAnimation: IAnimation = {
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

const visibleRightAnimation: IAnimation = {
  keyframes: [
    { left: '-100%', opacity: 0 },
    { left: 0, opacity: 1 },
  ],
  option: {
    duration: 700,
    easing: 'ease-out',
  },
};

const unvisibleRightAnimation: IAnimation = {
  keyframes: [
    { left: 0, opacity: 1 },
    { left: '100%', opacity: 0 },
  ],
  option: {
    duration: 700,
    easing: 'ease-out',
    fill: 'forwards',
  },
};
