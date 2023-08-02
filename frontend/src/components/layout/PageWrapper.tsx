import { styled } from 'styled-components';

interface IPageWrapper extends React.HTMLAttributes<HTMLDivElement> {}
export function PageWrapper({ ...props }: IPageWrapper) {
  return <Wrapper {...props}></Wrapper>;
}

const Wrapper = styled.div`
  width: 1024px;
  margin: 0 auto;
`;
