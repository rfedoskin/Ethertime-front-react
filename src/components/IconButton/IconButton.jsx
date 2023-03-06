import React from 'react';
import PropTypes from 'prop-types';
import styles from './iconButton.module.scss';

const IconButton = ({ children, onClick }) => {
  return (
    <div className={styles.iconButton} onClick={onClick}>
      {children}
    </div>
  );
};

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default IconButton;
