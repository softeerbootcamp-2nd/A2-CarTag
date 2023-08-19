/**
<ItemList $open={isOpen[0]} $height={itemListHeight[0]} ref={itemListRefs[0]}>
    {modelTypeItems}
</ItemList>
 */

import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

interface IDetailsItemList {
  open: boolean;
  children: React.ReactNode;
}

export default function DetailsItemList({ open, children }: IDetailsItemList) {
  const wrapperRef = useRef<HTMLUListElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    wrapperRef.current && setHeight(wrapperRef.current.getBoundingClientRect().height);
  }, []);

  return (
    <Wrapper ref={wrapperRef} $open={open} $height={height}>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.ul<{ $open: boolean; $height?: number }>`
  :last-child {
    border-bottom: none;
  }

  transition: 0.3s ease;
  margin-top: ${({ $open, $height }) => ($open ? '0px' : `-${$height}px`)};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
`;
