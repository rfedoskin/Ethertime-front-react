/* eslint-disable react/forbid-prop-types */
import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { Trans } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import styles from './lotteryResultSwitch.module.scss';
import ComplitedLotteriesIcon from './ComplitedLotteriesIcon';
import ActiveLotteriesIcon from './ActiveLotteriesIcon';
import LotteryButton from './LotteryButton';

class LotteryResultSwitch extends React.Component {
  static propTypes = {
    history: PropTypes.shape({ push: PropTypes.func }).isRequired,
    location: PropTypes.shape({ push: PropTypes.func }).isRequired,
  };

  handleActiveLotteriesClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleCompliteLotteriesClick = () => {
    const { history } = this.props;
    history.push('/lotteries');
  };

  render() {
    const { location } = this.props;
    const isActiveCompletedLotteries = location.pathname === '/lotteries';
    const isActiveCurrentLotteries = location.pathname === '/';

    return (
      <div className={styles.switchContainer}>
        <div className={cn(styles.col, styles.activeLotteriesCol)}>
          <span>
            <Trans i18nKey="lotteryResultSwitch.selectLottery" />
          </span>
          <LotteryButton
            onClick={this.handleActiveLotteriesClick}
            isActive={isActiveCurrentLotteries}
            className={cn(styles.button, styles.currentLotteriesButton)}
          >
            <ActiveLotteriesIcon />
          </LotteryButton>
        </div>
        <div className={styles.col}>
          <LotteryButton
            onClick={this.handleCompliteLotteriesClick}
            isActive={isActiveCompletedLotteries}
            className={cn(styles.button, styles.completedLotteriesButton)}
          >
            <ComplitedLotteriesIcon />
          </LotteryButton>
          <span>
            <Trans i18nKey="lotteryResultSwitch.resultsAndDraws" />
          </span>
        </div>
      </div>
    );
  }
}

export default withRouter(LotteryResultSwitch);
