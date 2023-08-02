import { styled } from 'styled-components';

interface ICenterWrapper extends React.HTMLAttributes<HTMLDivElement> {}
export default function CenterWrapper({ ...props }: ICenterWrapper) {
  return <Wrapper {...props}></Wrapper>;
}

const Wrapper = styled.div`
  width: 1024px;
  margin: 0 auto;
`;
