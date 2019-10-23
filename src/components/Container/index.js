import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  max-width: 70rem;
  background: #fff;
  border-radius: 0.4rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  margin: 2rem;

  h1 {
    font-size: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 1rem;
    }
  }
`;

export default Container;
