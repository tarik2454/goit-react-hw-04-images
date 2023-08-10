import React from 'react';
import PropTypes from 'prop-types';
import { StyledImageGallery } from './ImageGallery.styled';

export const ImageGallery = ({ children }) => {
  return <StyledImageGallery>{children}</StyledImageGallery>;
};

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
};
