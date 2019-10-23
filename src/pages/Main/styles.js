import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 3rem;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 0.1rem solid ${props => (props.error ? 'red' : '#eee')};
    padding: 1rem 1.5rem;
    border-radius: 0.4rem;
    font-size: 1.6rem;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 1.5rem;
  margin-left: 1rem;
  border-radius: 0.4rem;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.form`
  list-style: none;
  margin-top: 3rem;

  li {
    padding: 1.5rem 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 0.1rem solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;
