import React from 'react';
import { Trans } from 'react-i18next';
import styles from './LoadingText.module.scss';

const LoadingText = () => {
  return (
    <div className={styles.loadingText}>
      <p>
        <Trans i18nKey="loading.line1" />
      </p>
      <p>
        <Trans i18nKey="loading.line2" />
      </p>
    </div>
  );
};

export default LoadingText;
