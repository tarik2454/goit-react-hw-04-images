import React from 'react';
import PropTypes from 'prop-types';
import { StyledButtonWrapper, StyledButton } from './Button.styled';

export const Button = ({ onClick, children }) => {
  return (
    <StyledButtonWrapper>
      <StyledButton onClick={onClick}>{children}</StyledButton>
    </StyledButtonWrapper>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
