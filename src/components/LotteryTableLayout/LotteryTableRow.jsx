import React from 'react';
import { connect } from 'react-redux';
import { Trans } from 'react-i18next';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './lotteryTableLayout.module.scss';
import LotteryTableButton from '../LotteryTableButton';
import LotteryPrizeType from '../LotteryPrizeType';
import LotteryProgressBar from '../LotteryProgressBar';
import CollapseButton from '../CollapseButton';
import CollapseArea from '../CollapseArea/CollapseArea';
import LastCyclePopover from './LastCyclePopover';
import CashbackPopover from './CashbackPopover';
import Td from './Td';
import { convertFromWei } from '../../services/web3Service';
import { getRemainingTimeString } from '../../services/timeService';
import { getCashback } from '../../services/lotteryService';
import { setHintShown } from '../../redux/actions/appActions';

class LotteryTableRow extends React.Component {
  state = {
    isOpen: false,
    isHintSource: false,
  };

  static propTypes = {
    rootId: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    pot: PropTypes.number.isRequired,
    playersCount: PropTypes.number.isRequired,
    prizeType: PropTypes.number.isRequired,
  };

  handleSwitchClick = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  setHintSource = isHintSource => {
    this.setState({
      isHintSource,
    });
  };

  purchaseLotteryTicket = () => {
    const { id, price, contract, accountAddress, showHint } = this.props;

    if (!accountAddress) {
      showHint();
      this.setHintSource(true);
      return;
    }

    contract.methods
      .buyTicket(id)
      .send({ from: accountAddress, value: price })
      .once('receipt', receipt => {
        console.log(receipt); // TODO: onBuyed notification?
      })
      .on('error', err => console.warn(err));
  };

  render() {
    const {
      rootId,
      end,
      price,
      pot,
      playersCount,
      prizeType,
      nowTime,
      cycleTime,
      cycleTimeOutput,
      possiblePayments,
      withDiscount,
      isHighlighted,
      isRestarting,
      isContinued,
      compactLayout,
    } = this.props;

    const { isOpen, isHintSource } = this.state;

    const url = '#';

    let remainingSeconds = end - nowTime / 1000;

    remainingSeconds = Math.max(0, remainingSeconds);

    const remainingTime = getRemainingTimeString(remainingSeconds);

    const cashback = getCashback(withDiscount, remainingSeconds, cycleTime);

    return (
      <div className={styles.tr}>
        <div className={cn(styles.inner, { [styles.restarting]: isRestarting })}>
          <CollapseArea onClick={this.handleSwitchClick} className={styles.buttonOverlay} />
          <div className={styles.innerRow}>
            <Td className={styles.colSwitch}>
              <CollapseButton isCollapsed={isOpen} />
            </Td>
            <Td className={styles.colNumber}>{rootId}</Td>
            <Td className={styles.colPrice}>{`${convertFromWei(price)} ETH`}</Td>
            <Td className={cn(styles.colBank, { [styles.highlighted]: isHighlighted })}>
              {`${convertFromWei(pot)} ETH`}
            </Td>
            <Td className={cn(styles.colMembers, { [styles.highlighted]: isHighlighted })}>
              <div className={styles.playersCountContainer}>
                {playersCount}
                <span className={cn(styles.newMember, { [styles.highlighted]: isHighlighted })}>
                  +
                </span>
              </div>
            </Td>
            <Td className={styles.colCycle}>
              <span>{cycleTimeOutput}</span>
            </Td>
            <Td className={styles.colTime}>
              {remainingTime}
              {!isContinued && <LastCyclePopover className={styles.lastCycleLabel} />}
            </Td>
            <Td className={styles.colLabel}>
              <LotteryPrizeType type={prizeType} />
            </Td>
          </div>
          {isOpen && (
            <div className={cn(styles.innerRow, { [styles.expandedRow]: isOpen })}>
              <div className={styles.innerCol}>
                <span>1st</span>
                <span>{`${convertFromWei(possiblePayments[0])} ETH`}</span>
              </div>
              <div className={styles.innerCol}>
                <span>2nd</span>
                <span>{`${convertFromWei(possiblePayments[1])} ETH`}</span>
              </div>
              <div className={styles.innerCol}>
                <span>3rd</span>
                <span>{`${convertFromWei(possiblePayments[2])} ETH`}</span>
              </div>
              <a href={url} className={styles.extendLink}>
                <Trans i18nKey="lotteryTableRow.lotteryLink" />
              </a>
            </div>
          )}
        </div>
        <Td className={styles.colButton}>
          <LotteryTableButton
            onClick={() => this.purchaseLotteryTicket()}
            isHintSource={isHintSource}
            setHintSource={this.setHintSource}
          />
          {isOpen && compactLayout && (
            <>
              <div className={styles.etherbackContainer}>
                <Trans i18nKey="lotteryTable.cashback" />
                <CashbackPopover className={styles.popoverIcon} />
              </div>
              <LotteryProgressBar cashback={cashback} />
            </>
          )}
        </Td>
        {!compactLayout && (
          <Td className={styles.colEhterback}>
            <LotteryProgressBar cashback={cashback} />
          </Td>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { appReducer, contractReducer, accountReducer } = state;
  return {
    nowTime: appReducer.nowTime,
    contract: contractReducer.contract,
    accountAddress: accountReducer.accountAddress,
    isHintShown: appReducer.isHintShown,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showHint: () => dispatch(setHintShown(true)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LotteryTableRow);
