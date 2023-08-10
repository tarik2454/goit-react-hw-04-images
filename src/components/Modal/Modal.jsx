import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledOverlay, StyledModalWindow } from './Modal.styled';

export class Modal extends Component {
  state = {
    currentImage: this.props.largeImageURL,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  onBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.toggleModal();
    }
  };

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.toggleModal();
    }
  };

  getBigImage = () => {
    const { largeImageURL } = this.props;
    this.setState({ currentImage: largeImageURL });
  };

  render() {
    const { tags, currentImage } = this.props;

    return (
      <StyledOverlay onClick={this.onBackdropClick}>
        <StyledModalWindow>
          <img src={currentImage} alt={tags} onClick={this.getBigImage} />
        </StyledModalWindow>
      </StyledOverlay>
    );
  }
}

Modal.propTypes = {
  tags: PropTypes.string.isRequired,
  currentImage: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
