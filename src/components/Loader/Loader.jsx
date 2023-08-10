import React from 'react';
import { Watch } from 'react-loader-spinner';
import { styled } from 'styled-components';

export const Loader = () => {
  return (
    <StyledWatchWrapper>
      <Watch
        height="80"
        width="80"
        radius="48"
        color="#3f51b5"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
      <p>Loading...</p>
    </StyledWatchWrapper>
  );
};

const StyledWatchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-height: 70vh;
`;
