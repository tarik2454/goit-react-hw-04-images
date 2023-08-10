import { styled } from 'styled-components';

export const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const StyledModalWindow = styled.div`
  display: flex;
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);

  @media screen and (min-width: 768px) {
    max-width: calc(100vw - 248px);
  }

  @media screen and (min-width: 1200px) {
    max-width: calc(100vw - 548px);
    max-height: calc(100vh - 124px);
  }
`;
