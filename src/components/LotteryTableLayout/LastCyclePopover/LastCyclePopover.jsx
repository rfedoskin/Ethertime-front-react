import React from 'react';
import { Trans } from 'react-i18next';
import CashbackIcon from '../CashbackPopover/CashbackIcon';
import Popover from '../../Popover';
import styles from './lastCyclePopover.module.scss';

const popoverBody = (
  <>
    <p>
      <Trans i18nKey="lotteryTableRow.lastCycleText" />
    </p>
  </>
);

const LastCyclePopover = ({ className }) => (
  <div className={className}>
    <Popover body={popoverBody} preferPlace="below">
      <span className={styles.lastLabel}>Last</span>
      <CashbackIcon />
    </Popover>
  </div>
);

export default LastCyclePopover;
