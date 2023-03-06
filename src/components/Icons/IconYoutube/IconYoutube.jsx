import React from 'react';
import cx from 'classnames';
import s from './iconYoutube.module.scss';

const Icon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="19"
    viewBox="0 0 26 19"
    className={cx(s.root, className)}
  >
    <g id="Group_790" data-name="Group 790" transform="translate(-849 -126)">
      <rect
        id="Rectangle_1967"
        data-name="Rectangle 1967"
        width="26"
        height="19"
        rx="5"
        transform="translate(849 126)"
        fill="#ff7e7e"
      />
      <path
        id="Polygon_145"
        data-name="Polygon 145"
        d="M3.168,1.248a1,1,0,0,1,1.664,0l2.131,3.2A1,1,0,0,1,6.131,6H1.869a1,1,0,0,1-.832-1.555Z"
        transform="translate(865.5 131.5) rotate(90)"
        fill="#fff"
      />
    </g>
  </svg>
);

export default Icon;
