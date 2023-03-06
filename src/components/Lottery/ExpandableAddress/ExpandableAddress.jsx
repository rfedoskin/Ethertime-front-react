import React from 'react';
import styles from './expandableAddress.module.scss';

const ExpandableAddress = ({ address }) => {
  return (
    <div className={styles.container}>
      <span className={styles.address}>{address}</span>
    </div>
  );
};

export default ExpandableAddress;
