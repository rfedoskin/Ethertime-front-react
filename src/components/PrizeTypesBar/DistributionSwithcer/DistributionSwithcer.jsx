import React from 'react';
import cx from 'classnames';

import s from './DistributionSwithcer.module.scss';

const Switcher = ({ currentValue, options, onChange, className }) => {
  return (
    <div className={cx(s.root, className)}>
      {options.map(option => (
        <div
          key={option.value}
          className={cx(s.option, {
            [s.current]: currentValue === option.value,
          })}
          onClick={() => onChange(option.value)}
        >
          {option.title}
        </div>
      ))}
    </div>
  );
};
export default Switcher;
