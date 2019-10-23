import styled from 'styled-components';

const Button = styled.button`
  padding: 0.4rem 0.6rem;
  border: 0;
  background: #7159c1;
  color: #fff;
  font-size: 1.3rem;
  border-radius: 0.4rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  & + button {
    margin-left: 0.4rem;
  }
`;

export default Button;
