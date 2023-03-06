import React from 'react';
import PropTypes from 'prop-types';

const ComplitedLotteriesIcon = props => {
  const { isActive } = props;
  const primaryColor = '#5bc1f0';
  const secondaryColor = '#c5c5c5';
  const backgroundColor = '#ffffff';

  const borderColor = isActive ? backgroundColor : primaryColor;
  const groundColor = isActive ? secondaryColor : backgroundColor;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
      <g id="Group_712" data-name="Group 712" transform="translate(-222 -4985)">
        <rect
          id="Rectangle_1583"
          data-name="Rectangle 1583"
          width="28"
          height="28"
          rx="4"
          transform="translate(222 4985)"
          fill={borderColor}
        />
        <rect
          id="Rectangle_1587"
          data-name="Rectangle 1587"
          width="7"
          height="7"
          rx="1"
          transform="translate(227.13 4990)"
          fill={groundColor}
        />
        <rect
          id="Rectangle_1588"
          data-name="Rectangle 1588"
          width="7"
          height="7"
          rx="1"
          transform="translate(238.534 4990)"
          fill={groundColor}
        />
        <rect
          id="Rectangle_1589"
          data-name="Rectangle 1589"
          width="7"
          height="7"
          rx="1"
          transform="translate(227.13 5001.68)"
          fill={groundColor}
        />
        <rect
          id="Rectangle_1590"
          data-name="Rectangle 1590"
          width="7"
          height="7"
          rx="1"
          transform="translate(238.534 5001.68)"
          fill={groundColor}
        />
      </g>
    </svg>
  );
};

ComplitedLotteriesIcon.propTypes = {
  isActive: PropTypes.bool,
};

ComplitedLotteriesIcon.defaultProps = {
  isActive: false,
};

export default ComplitedLotteriesIcon;
