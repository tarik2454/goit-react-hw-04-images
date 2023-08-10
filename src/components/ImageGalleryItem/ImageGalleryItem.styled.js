import { styled } from 'styled-components';

export const StyledGalleryItem = styled.li`
  width: 100%;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);

  @media screen and (min-width: 768px) {
    width: calc(50% - 8px);
  }

  @media screen and (min-width: 1200px) {
    width: calc(25% - 12px);
  }
`;

export const StyledImageItem = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.03);
    cursor: zoom-in;
  }
`;
