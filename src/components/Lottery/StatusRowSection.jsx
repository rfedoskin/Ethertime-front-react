import React from 'react';
import PropTypes from 'prop-types';
import { Trans } from 'react-i18next';
import styles from './lottery.module.scss';
import { cycleStatus as status } from '../../services/lotteryService';
import MembersCount from './MembersCount';
import IconRefresh from '../Icons/IconRefresh';

const StatusRowSection = ({
  cycleStatus,
  members,
  isHighlighted,
  href = '#',
  refreshHandler,
  isFixed = false,
}) => {
  switch (cycleStatus) {
    case status.active:
      return <MembersCount isHighlighted={isHighlighted} membersCount={members} />;
    case status.pending:
    case status.calculation:
      return (
        <a className={styles.statusRowLink} href={href}>
          <Trans i18nKey="lottery.moreDetail" />
        </a>
      );
    case status.finished:
    default:
      return isFixed ? (
        <button type="button" className={styles.refreshButton} onClick={refreshHandler}>
          <IconRefresh />
          <Trans i18nKey="lottery.updateData" />
        </button>
      ) : (
        <MembersCount isHighlighted={isHighlighted} membersCount={members} />
      );
  }
};

StatusRowSection.propTypes = {
  cycleStatus: PropTypes.oneOf([
    status.active,
    status.calculation,
    status.finished,
    status.pending,
  ]),
  members: PropTypes.number,
  href: PropTypes.string,
};

export default StatusRowSection;
