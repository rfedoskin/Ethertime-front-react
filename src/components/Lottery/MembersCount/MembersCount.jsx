import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './membersCount.module.scss';

const MembersCount = ({ isHighlighted, membersCount }) => {
  const { t: translation } = useTranslation();

  return (
    <span className={cn(styles.playersCountContainer, { [styles.highlighted]: isHighlighted })}>
      {`${translation('lottery.allMembers')} - `}
      <span className={styles.playersCount}>{membersCount}</span>
      <span className={styles.newMember}>+</span>
    </span>
  );
};

export default MembersCount;
