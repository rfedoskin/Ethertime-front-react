import React from 'react';
import cn from 'classnames';
import styles from './container.module.scss';

const Container = ({ children, className }) => {
  return <div className={cn(styles.container, className)}>{children}</div>;
};

export default Container;
