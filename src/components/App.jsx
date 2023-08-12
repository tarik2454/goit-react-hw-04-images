import React, { useEffect, useState, children } from 'react';
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

export const App = () => {
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [per_page] = useState(12);
  const [query, setQuery] = useState('');
  const [totalHits, setTotalHits] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleLoadImages = async () => {
      try {
        setLoading({ loading: true });

        const { hits, totalHits } = await fetchImages({
          per_page,
          page,
          q: query,
        });

        setHits(prev => [...prev, ...hits]);
        setTotalHits(totalHits);

        if ([...hits].length === totalHits) {
          toast.info(`End ${totalHits} images!`);
        }
        // if ([...this.state.hits, ...hits].length === totalHits) {
        //   toast.info(`End ${totalHits}!`);
        // }
      } catch (error) {
        console.warn(error.message);
      } finally {
        setLoading({ loading: false });
      }
    };
    handleLoadImages();
  }, [page, per_page, query]);

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleChangeQuery = newQuery => {
    if (query === newQuery) {
      toast.error('Please change your request!');
      return;
    }
    setQuery(newQuery);
    setHits([]);
    setPage(1);
  };

  const toggleModal = (imageURL, alt) => {
    setCurrentImage(imageURL);
    setTags(alt);
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <>
      <StyledMain>
        <Searchbar setQuery={handleChangeQuery} />
        <StyledSection>
          <StyledContainer>
            <ImageGallery>
              {loading && !hits.length ? (
                <Loader />
              ) : (
                <ImageGalleryItem images={hits} toggleModal={toggleModal} />
              )}
            </ImageGallery>

            {totalHits !== hits.length && (
              <Button disabled={loading} onClick={handleLoadMore}>
                {loading ? 'Loading...' : 'Load More'}
              </Button>
            )}
          </StyledContainer>
        </StyledSection>
        {isModalOpen && (
          <Modal
            currentImage={currentImage}
            tags={tags}
            toggleModal={toggleModal}
          >
            {children}
          </Modal>
        )}
        <ToastContainer />
      </StyledMain>
    </>
  );
};
