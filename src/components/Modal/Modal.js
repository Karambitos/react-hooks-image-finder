import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

const portalRoot = document.getElementById('modal-root');

export default function Modal({ toggleModal, children }) {
  const closeModalBackdrop = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };
  const handlePressKey = event => {
    if (event.code === 'Escape') {
      toggleModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handlePressKey);
    return () => {
      document.removeEventListener('keydown', handlePressKey);
    };
  }, []);

  return createPortal(
    <div
      className={styles.overlay}
      onClick={e => {
        closeModalBackdrop(e);
      }}
    >
      <div className={styles.modal}>{children}</div>
    </div>,
    portalRoot
  );
}
Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
