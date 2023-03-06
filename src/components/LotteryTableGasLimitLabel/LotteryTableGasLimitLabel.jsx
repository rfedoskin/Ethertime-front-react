import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './lotteryTableGasLimitLabel.module.scss';
import CopyButton from '../CopyButton';

const LotteryTableGasLimitLabel = () => {
  const gasLimit = '0000000';
  const { t: translation } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div>
        <span className={styles.label}>Gas limit</span>
        <span>{gasLimit}</span>
      </div>
      <div className={styles.inner}>
        <CopyButton popoverText={translation('lotteryTable.copyButton')} textToCopy={gasLimit} />
      </div>
    </div>
  );
};

export default LotteryTableGasLimitLabel;
