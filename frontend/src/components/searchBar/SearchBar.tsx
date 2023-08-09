import { styled } from 'styled-components';
import { BodyKrRegular4 } from '../../styles/typefaces';
import { SearchIcon } from '../common/icons/Icons';

interface SearchBarProps extends React.HTMLAttributes<HTMLInputElement> {}
export default function SearchBar({ ...props }: SearchBarProps) {
  return (
    <Wrapper>
      <Input {...props} />
      <Button>
        <SearchIcon width={18} height={18} />
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 400px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.color.gray200};
`;

const Input = styled.input`
  padding: 4px 16px;
  ${BodyKrRegular4}
  width: 100%;
  height: 100%;
  border: none;
  box-sizing: border-box;
  outline: none;
  color: ${({ theme }) => theme.color.gray900};

  :focus {
    outline: none;
    border: none;
  }
  ::placeholder {
    color: ${({ theme }) => theme.color.gray600};
  }
`;
const Button = styled.button`
  width: 67px;
  height: 100%;
  background-color: ${({ theme }) => theme.color.gray100};
`;
