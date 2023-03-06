import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './lotteryTableLayout.module.scss';

const Th = ({ children, className, orderId, orderBy, onRequestSort, sortDirection }) => {
  const buttonClasses = cn(styles.sortButton, {
    [styles.activeButton]: orderBy === orderId,
    [styles.sortAsc]: sortDirection === 'asc',
  });

  return (
    <div className={cn(styles.th, className)}>
      {!orderId ? (
        children
      ) : (
        <button className={buttonClasses} type="button" onClick={() => onRequestSort(orderId)}>
          {children}
        </button>
      )}
    </div>
  );
};

Th.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  orderId: PropTypes.string,
  orderBy: PropTypes.string,
  sortDirection: PropTypes.string,
  onRequestSort: PropTypes.func,
};

export default Th;
