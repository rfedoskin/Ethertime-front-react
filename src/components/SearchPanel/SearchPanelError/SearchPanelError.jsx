import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import styles from './searchPanelError.module.scss';

const SearchPanelError = ({ isFound }) => {
  const { t: translation } = useTranslation();

  const text = isFound
    ? translation('searchPanel.walletNotUsed')
    : translation('searchPanel.walletNotFound');

  return <span className={styles.errorText}>{text}</span>;
};

SearchPanelError.propTypes = {
  isFound: PropTypes.bool,
};

export default SearchPanelError;
