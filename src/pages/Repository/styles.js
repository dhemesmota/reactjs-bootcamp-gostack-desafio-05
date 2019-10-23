import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 3rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 1.6rem;
    text-decoration: none;
  }

  img {
    width: 12rem;
    border-radius: 50%;
    margin-top: 2rem;
  }

  h1 {
    font-size: 2.4rem;
    margin-top: 1rem;
  }

  p {
    margin-top: 0.5rem;
    font-size: 1.4rem;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 40rem;
  }
`;

export const IssueList = styled.ul`
  padding-top: 3rem;
  margin-top: 3rem;
  border-top: 1px solid #eee;
  list-style: none;

  div#filter {
    margin-bottom: 2rem;
  }

  li {
    display: flex;
    padding: 1.5rem 1rem;
    border: 0.1rem solid #eee;
    border-radius: 0.4rem;

    & + li {
      margin-top: 1rem;
    }

    img {
      width: 3.6rem;
      height: 3.6rem;
      border-radius: 50%;
      border: 0.2rem solid #eee;
    }

    div {
      flex: 1;
      margin-left: 1.5rem;

      strong {
        font-size: 1.6rem;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 0.2rem;
          font-size: 1.2rem;
          font-weight: 600;
          height: 2rem;
          padding: 0.3rem 0.4rem;
          margin-left: 1rem;
        }
      }

      p {
        margin-top: 0.5rem;
        font-size: 1.2rem;
        color: #999;
      }
    }
  }
  div#page {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 2rem;
  }
`;
