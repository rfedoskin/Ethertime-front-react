import React from 'react';
import cn from 'classnames';
import styles from './collapseArea.module.scss';

const CollapseArea = ({ onClick, className, children }) => {
  return (
    <div type="button" onClick={onClick} className={cn(styles.collapseArea, className)}>
      {children}
    </div>
  );
};

export default CollapseArea;
