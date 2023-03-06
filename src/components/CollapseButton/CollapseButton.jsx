import React from 'react';
import cn from 'classnames';
import IconArrow from '../Icons/IconArrow';
import styles from './collapseButton.module.scss';

const CollapseButton = ({ onClick = function() {}, className, isCollapsed }) => {
  return (
    <button
      type="button"
      className={cn(styles.collapseButton, className, { [styles.collapsed]: isCollapsed })}
      onClick={onClick}
    >
      <IconArrow />
    </button>
  );
};

export default CollapseButton;
