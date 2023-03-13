import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { TailSpin } from 'react-loader-spinner';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import getImages from '../api/imageAPI';
import { useState, useEffect, useRef } from 'react';

const statusList = {
  loading: 'loading',
  success: 'success',
  error: 'error',
  idle: 'idle',
};

export default function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState(statusList.idle);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [imageModal, setImageModal] = useState({ largeImageURL: '', tags: '' });
  const [resaltLength, setResaltLength] = useState();

  const prevQuery = useRef('');

  useEffect(() => {
    if (searchQuery !== prevQuery.current) {
      setImages([]);
    }
    handleGetImages();
    prevQuery.current = searchQuery;
  }, [searchQuery, currentPage]);

  const handleGetImages = () => {
    setStatus(statusList.loading);
    getImages(searchQuery, currentPage)
      .then(res => {
        setImages(prevState => [...prevState, ...res.data.hits]);
        setStatus(statusList.success);
        setResaltLength(res.data.totalHits);
      })
      .catch(error => setStatus(statusList.error))
      .finally(() => {
        setStatus(statusList.success);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery !== event.target.serach.value) {
      setCurrentPage(1);
      setSearchQuery(event.target.serach.value);
      event.target.serach.value = '';
      window.scrollTo(0, 0);
    } else if (searchQuery === event.target.serach.value) {
      setCurrentPage(prevState => prevState + 1);
      event.target.serach.value = '';
    }
  };

  const setModalImg = id => {
    const { largeImageURL, tags } = images.find(image => image.id === id);
    setIsOpenModal(true);
    setImageModal({ largeImageURL: largeImageURL, tags: tags });
  };

  const toggleModal = () => {
    setIsOpenModal(prevState => !prevState);
  };

  const loadMore = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  return (
    <div className="App">
      {isOpenModal && (
        <Modal toggleModal={toggleModal}>
          <img src={imageModal.largeImageURL} alt={imageModal.tag} />
        </Modal>
      )}
      {status === 'loading' && (
        <Modal>
          <TailSpin />
        </Modal>
      )}
      <Searchbar handleSubmit={handleSubmit} />
      {images.length > 0 || status === 'error' ? (
        <ImageGallery images={images} setModalImg={setModalImg} />
      ) : (
        <div className="container">
          <h1>There are no images for your request</h1>
          <p>
            Sorry, we couldn't find any images that match your search. Please
            try again with different keywords.
          </p>
        </div>
      )}
      {resaltLength > images.length && (
        <Button onClick={loadMore}>Load more</Button>
      )}
    </div>
  );
}
