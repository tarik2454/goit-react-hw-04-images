import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyledOverlay, StyledModalWindow } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ tags, currentImage, toggleModal }) => {
  const [currentImageSrc, setCurrentImageSrc] = useState(currentImage);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        toggleModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleModal]);

  const onBackdropClick = event => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };

  const getBigImage = () => {
    setCurrentImageSrc(currentImage);
  };

  return createPortal(
    <StyledOverlay onClick={onBackdropClick}>
      <StyledModalWindow>
        <img src={currentImageSrc} alt={tags} onClick={getBigImage} />
      </StyledModalWindow>
    </StyledOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  tags: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
