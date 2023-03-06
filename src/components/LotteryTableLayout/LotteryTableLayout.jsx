import React from 'react';
import { Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import styles from './lotteryTableLayout.module.scss';
import Th from './Th';
import CashbackPopover from './CashbackPopover';

const LotteryTableLayout = ({ children, orderBy, onRequestSort, sortDirection, compactLayout }) => {
  return (
    <div className={styles.table}>
      <div className={styles.thead}>
        <div className={styles.tr}>
          <Th className={styles.colSwitch} />
          <Th
            className={styles.colNumber}
            orderId="rootId"
            orderBy={orderBy}
            onRequestSort={onRequestSort}
            sortDirection={sortDirection}
          >
            <Trans i18nKey="lotteryTable.lotteryNumber" />
          </Th>
          <Th
            className={styles.colPrice}
            orderId="price"
            orderBy={orderBy}
            onRequestSort={onRequestSort}
            sortDirection={sortDirection}
          >
            <Trans i18nKey="lotteryTable.cost" />
          </Th>
          <Th
            className={styles.colBank}
            orderId="pot"
            orderBy={orderBy}
            onRequestSort={onRequestSort}
            sortDirection={sortDirection}
          >
            <Trans i18nKey="lotteryTable.bank" />
          </Th>
          <Th
            className={styles.colMembers}
            orderId="playersCount"
            orderBy={orderBy}
            onRequestSort={onRequestSort}
            sortDirection={sortDirection}
          >
            <Trans i18nKey="lotteryTable.members" />
          </Th>
          <Th
            className={styles.colCycle}
            orderId="cycleTime"
            orderBy={orderBy}
            onRequestSort={onRequestSort}
            sortDirection={sortDirection}
          >
            <Trans i18nKey="lotteryTable.cycle" />
          </Th>
          <Th
            className={styles.colTime}
            orderId="timeTillEnd"
            orderBy={orderBy}
            onRequestSort={onRequestSort}
            sortDirection={sortDirection}
          >
            <Trans i18nKey="lotteryTable.time" />
          </Th>
          <Th
            className={styles.colLabel}
            orderId="prizeType"
            orderBy={orderBy}
            onRequestSort={onRequestSort}
            sortDirection={sortDirection}
          >
            <Trans i18nKey="lotteryTable.type" />
          </Th>
          {!compactLayout && (
            <>
              <Th className={styles.colButton} />
              <div className={styles.etherbackContainer}>
                <Th
                  className={styles.colEhterback}
                  orderId="etherback"
                  orderBy={orderBy}
                  onRequestSort={onRequestSort}
                  sortDirection={sortDirection}
                >
                  <Trans i18nKey="lotteryTable.cashback" />
                </Th>
                <CashbackPopover className={styles.popoverIcon} iconSize={20} />
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.tbody}>{children}</div>
    </div>
  );
};

LotteryTableLayout.propTypes = {
  children: PropTypes.node,
  sortDirection: PropTypes.string,
  orderBy: PropTypes.string,
  onRequestSort: PropTypes.func.isRequired,
};

export default LotteryTableLayout;
