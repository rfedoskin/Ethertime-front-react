import React from 'react';
import cn from 'classnames';
import styles from './metamaskLoadingIndicator.module.scss';

const MetamaskLoadingIndicator = () => {
  return (
    <div className={styles.dots}>
      <div className={styles.dot} />
      <div className={cn(styles.dot, styles.dot2)} />
      <div className={cn(styles.dot, styles.dot3)} />
    </div>
  );
};

export default MetamaskLoadingIndicator;
