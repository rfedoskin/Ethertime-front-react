import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Trans } from 'react-i18next';
import styles from './lottery.module.scss';
import LotteryPrizeType from '../LotteryPrizeType';
import StatusSection from './StatusSection';
import StairSection from './StairSection';
import StatusRowSection from './StatusRowSection';
import { getRemainingTimeString, getPastTimeString } from '../../services/timeService';
import { convertFromWei } from '../../services/web3Service';
import { getCycleStatus, cycleStatus } from '../../services/lotteryService';

const LotteryResult = ({
  rootId,
  end,
  begin,
  pot,
  playersCount,
  prizeType,
  nowTime,
  possiblePayments,
  status,
  isPayedOut,
  isHighlighted,
  isEnded,
  isFixed,
  winningsCount,
  refreshCycle,
  winners,
}) => {
  const displayedStatus = getCycleStatus(isEnded, status, winningsCount, isPayedOut);

  const mainStatusClasses = cn(styles.mainStatus, {
    [styles.mainStatusCenter]:
      displayedStatus === cycleStatus.calculation || displayedStatus === cycleStatus.pending,
  });
  const coverClasses = cn(styles.coverFade, {
    [styles.cover]: !isEnded && playersCount === 0,
  });

  const href = '#';

  const remainingSeconds = end - Math.floor(nowTime / 1000);
  const timeOutput =
    remainingSeconds > 0
      ? getRemainingTimeString(remainingSeconds)
      : getPastTimeString(remainingSeconds);

  const refreshHandler = () => {
    refreshCycle(rootId);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoRow}>
        <div className={styles.col}>
          <span className={styles.bank}>
            <Trans i18nKey="lottery.bank" />
          </span>
          <span className={cn({ [styles.highlighted]: isHighlighted })}>
            {`${convertFromWei(pot)} ETH`}
          </span>
        </div>
        <span className={styles.time}>{timeOutput}</span>
      </div>
      <div className={styles.main}>
        <div className={styles.mainHead}>
          <span>{`№ ${rootId}`}</span>
          <div className={styles.prizeType}>
            <LotteryPrizeType type={prizeType} />
          </div>
        </div>
        <div className={styles.mainStair}>
          <StairSection
            rootId={rootId}
            cycleStatus={displayedStatus}
            remainingSeconds={remainingSeconds}
            end={end}
            begin={begin}
            winners={winners}
          />
        </div>
        <div className={mainStatusClasses}>
          <StatusSection
            cycleStatus={displayedStatus}
            possiblePayments={possiblePayments}
            winners={winners}
            isHighlighted={isHighlighted}
          />
        </div>

        <div className={coverClasses}>
          <p>
            <Trans i18nKey="lottery.cover" />
          </p>
        </div>
      </div>
      <div className={styles.statusRow}>
        <StatusRowSection
          cycleStatus={displayedStatus}
          members={playersCount}
          href={href}
          isHighlighted={isHighlighted}
          refreshHandler={refreshHandler}
          isFixed={isFixed}
        />
      </div>
    </div>
  );
};

LotteryResult.propTypes = {
  status: PropTypes.oneOf([0, 1, 2]),
  playersCount: PropTypes.number,
  // prizes: PropTypes.arrayOf(PropTypes.string),
  // results: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  // prizeType: PropTypes.oneOf([0, 1, 2, 3, 4]).isRequired,
  // id: PropTypes.string,
  // time: PropTypes.string,
  // bank: PropTypes.string,
};

const mapStateToProps = ({ appReducer }) => {
  return {
    nowTime: appReducer.nowTime,
  };
};

export default connect(mapStateToProps)(LotteryResult);
