import React from 'react';
import { Trans } from 'react-i18next';
import CashbackIcon from './CashbackIcon';
import Popover from '../../Popover';
import styles from './cashbackPopover.module.scss';

const popoverBody = (
  <>
    <div className={styles.col1}>
      <Trans i18nKey="cashbackPopover.col1" />
    </div>
    <div className={styles.col2}>
      <Trans i18nKey="cashbackPopover.col2" />
    </div>
  </>
);

const CashbackPopover = ({ className }) => (
  <div className={className}>
    <Popover body={popoverBody} preferPlace="left">
      <CashbackIcon />
    </Popover>
  </div>
);

export default CashbackPopover;
