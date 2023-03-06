import React from 'react';
import { connect } from 'react-redux';
import LotteryTableLayout, { LotteryTableRow } from '../../components/LotteryTableLayout';
import styles from './lotteryTable.module.scss';
import Container from '../Container';
import LotteryResultSwitch from '../../components/LotteryResultSwitch';
import { updateSort } from '../../redux/actions/lotteriesActions';

import { getFilteredLotteries } from '../../redux/selectors/lotteriesSelectors';
import { getCycleTimeOutput } from '../../services/timeService';

const LotteryTable = ({ lotteries, orderBy, sortDirection, changeSort, isHintShown, layout }) => {
  const handleRequestSort = orderId => {
    changeSort(orderId);
  };

  const isCompact = layout === 'L';

  const lotteriesList = lotteries.map(lottery => {
    const cycleTimeOutput = getCycleTimeOutput(lottery.cycleTime);

    return (
      <LotteryTableRow
        key={lottery.rootId}
        cycleTimeOutput={cycleTimeOutput}
        compactLayout={isCompact}
        {...lottery}
      />
    );
  });

  return (
    <div className={styles.lotteryTableWrapper}>
      {isHintShown && <div className={styles.hintOverlay} />}
      <Container>
        <div className={styles.header}>
          <LotteryResultSwitch />
        </div>
        <LotteryTableLayout
          orderBy={orderBy}
          sortDirection={sortDirection}
          onRequestSort={handleRequestSort}
          compactLayout={isCompact}
        >
          {lotteriesList.length > 0 ? (
            lotteriesList
          ) : (
            <div className={styles.noLotteries}>
              Упс! В этой сети нет ни одной запущенной лотереи
            </div>
          )}
        </LotteryTableLayout>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  const { lotteriesReducer, appReducer } = state;

  return {
    lotteries: getFilteredLotteries(state),
    orderBy: lotteriesReducer.orderBy,
    sortDirection: lotteriesReducer.sortDirection,
    isHintShown: appReducer.isHintShown,
    layout: appReducer.mediaSize,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSort: orderId => dispatch(updateSort(orderId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LotteryTable);
