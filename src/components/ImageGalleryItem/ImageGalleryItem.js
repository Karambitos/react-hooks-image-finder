import React from 'react';
import styles from '../ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ image, setModalImg }) {
  const { webformatURL, largeImageURL, tags, id } = image;
  return (
    <>
      <li className={styles.ImageGalleryItem}>
        <img
          className={styles.ImageGalleryItemImage}
          onClick={() => setModalImg(id)}
          src={webformatURL}
          data-src={largeImageURL}
          alt={tags}
        />
      </li>
    </>
  );
}

ImageGalleryItem.propTypes = {
  setModalImg: PropTypes.func.isRequired,
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
