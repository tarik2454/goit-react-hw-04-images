import { createGlobalStyle, styled } from 'styled-components';
import '@csstools/normalize.css';

export const GlobalStyle = createGlobalStyle`
  body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${props => props.theme.colors.$primiryTextColor};
  background-color: ${props => props.theme.colors.$primiryBgColor};
  }
`;

export const StyledMain = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
`;

export const StyledSection = styled.section`
  width: 100vw;
`;

export const StyledContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
  max-width: 480px;

  @media screen and (min-width: 768px) {
    max-width: 768px;
  }

  @media screen and (min-width: 1200px) {
    max-width: 1200px;
    padding: 0 24px;
  }
`;
