import React from 'react';
import PropTypes from 'prop-types';
import { StyledGalleryItem, StyledImageItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images = [], toggleModal }) => {
  const onImageClick = (webformatURL, alt) => {
    toggleModal(webformatURL, alt);
  };

  return (
    <>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <StyledGalleryItem
          key={id}
          onClick={() => onImageClick(largeImageURL, tags)}
        >
          <StyledImageItem
            id={id}
            src={webformatURL}
            alt={tags}
            loading="lazy"
          />
        </StyledGalleryItem>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  toggleModal: PropTypes.func.isRequired,
};
