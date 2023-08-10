import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { fetchImages } from '../utills/images-api-sevice';
import {
  StyledMain,
  StyledSection,
  StyledContainer,
} from '../styles/GlobalStyle';

export class App extends Component {
  state = {
    hits: [],
    page: 1,
    per_page: 12,
    query: '',
    totalHits: null,
    currentImage: null,
    tags: '',
    loading: false,
    isModalOpen: false,
    buttonIsGone: false,
  };

  async componentDidMount() {
    await this.handleLoadImages();
  }

  async componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      await this.handleLoadImages();

      // if (this.state.hits.length === this.state.totalHits) {
      //   toast.info(`End ${this.state.hits.length}!`);
      // }
    }
  }

  handleLoadImages = async () => {
    try {
      this.setState({ loading: true });
      const { per_page, page, query } = this.state;

      const { hits, totalHits } = await fetchImages({
        per_page,
        page,
        q: query,
      });

      this.setState(prevState => ({
        hits: [...prevState.hits, ...hits],
        totalHits,
      }));

      if ([...this.state.hits, ...hits].length === totalHits) {
        toast.info(`End ${totalHits}!`);
      }
    } catch (error) {
      console.warn(error.message);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));

    // const { per_page, page, totalHits, hits } = this.state;
    // if (totalHits - page * hits.length < per_page) {
    //   toast.info(`End ${totalHits}!`);
    // }
  };

  handleChangeQuery = query => {
    if (query === this.state.query) {
      toast.error('Please change your request!');
      return;
    }
    this.setState({ query: query, hits: [], page: 1 });
  };

  toggleModal = (imageURL, alt) => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
      currentImage: imageURL,
      tags: alt,
    }));
  };

  render() {
    const {
      hits,
      totalHits,
      loading,
      isModalOpen,
      children,
      currentImage,
      tags,
    } = this.state;

    return (
      <>
        <StyledMain>
          <Searchbar setQuery={this.handleChangeQuery} />
          <StyledSection>
            <StyledContainer>
              <ImageGallery>
                {loading && !hits.length ? (
                  <Loader />
                ) : (
                  <ImageGalleryItem
                    images={hits}
                    toggleModal={this.toggleModal}
                  />
                )}
              </ImageGallery>

              {totalHits !== hits.length && (
                <Button disabled={loading} onClick={this.handleLoadMore}>
                  {loading ? 'Loading...' : 'Load More'}
                </Button>
              )}
            </StyledContainer>
          </StyledSection>
          {isModalOpen && (
            <Modal
              currentImage={currentImage}
              tags={tags}
              toggleModal={this.toggleModal}
            >
              {children}
            </Modal>
          )}
          <ToastContainer />
        </StyledMain>
      </>
    );
  }
}
