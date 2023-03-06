import React from 'react';
import cx from 'classnames';

import s from './IconArrowFulfiled.module.scss';

const Icon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={cx(s.root, className)} viewBox="0 0 20 33">
    <path d="M19.861 16.253L.5 32.503V.003z" fill="#d2cece" />
  </svg>
);

export default Icon;
