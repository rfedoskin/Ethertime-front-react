import React from 'react';
import cx from 'classnames';

import s from './IconWinner.module.scss';

const Icon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="57"
    height="84"
    viewBox="0 0 57 84"
    className={cx(s.root, className)}
  >
    <path d="M28.5 1.6v0l-26.7 40v0l26.7 40.6v0l27-40.6v0z" fill="#fff" />
    <path
      d="M28.5 1.6v0l-26.7 40v0l26.7 40.6v0l27-40.6v0z"
      style={{ fill: 'none', strokeLineJoin: 'round', strokeWidth: 2, stroke: '#68c5f0' }}
    />
  </svg>
);

export default Icon;
