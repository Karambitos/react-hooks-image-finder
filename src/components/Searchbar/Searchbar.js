import styles from './Searchbar.module.css';
import SVGComponent from './SearchIcon';
import PropTypes from 'prop-types';

export default function Searchbar({ handleSubmit }) {
  return (
    <header className={styles.header}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.searchFormButton}>
          <span className={styles.searchFormButtonLabel}>Search</span>
          <SVGComponent />
        </button>
        <input
          className={styles.searchFormInput}
          name="serach"
          type="text"
          required
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
