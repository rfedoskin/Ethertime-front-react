import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './metamaskDownloadLink.module.scss';

const MetamaskDownloadLink = ({ isCompact }) => {
  const { t: translation } = useTranslation();

  return (
    <a
      className={styles.link}
      href="https://metamask.io/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {isCompact ? (
        <span>{translation('metamaskDownloadLink.linkTextShort')}</span>
      ) : (
        <span>{translation('metamaskDownloadLink.linkText')}</span>
      )}
    </a>
  );
};

export default MetamaskDownloadLink;
