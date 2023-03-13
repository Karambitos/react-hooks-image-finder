import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from '../ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export default function ImageGallery({ images, setModalImg }) {
  return (
    <ul className={styles.gallery}>
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={uuidv4()}
            image={image}
            setModalImg={setModalImg}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  setModalImg: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
