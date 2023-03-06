import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './lotteryTableLayout.module.scss';

const Td = ({ children, className }) => <div className={cn(styles.td, className)}>{children}</div>;

Td.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Td;
