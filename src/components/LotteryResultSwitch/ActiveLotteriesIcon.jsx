import React from 'react';
import PropTypes from 'prop-types';

const ActiveLotteriesIcon = props => {
  const { isActive } = props;
  const primaryColor = '#5bc1f0';
  const secondaryColor = '#c5c5c5';
  const backgroundColor = '#ffffff';

  const borderColor = isActive ? backgroundColor : primaryColor;
  const groundColor = isActive ? secondaryColor : backgroundColor;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="26" viewBox="0 0 28 26">
      <g id="Group_711" data-name="Group 711" transform="translate(-167 -5021)">
        <rect
          id="Rectangle_1591"
          data-name="Rectangle 1591"
          width="28"
          height="26"
          rx="4"
          transform="translate(167 5021)"
          fill={borderColor}
        />
        <rect
          id="Rectangle_1592"
          data-name="Rectangle 1592"
          width="20.433"
          height="4.5"
          rx="1"
          transform="translate(170.783 5025)"
          fill={groundColor}
        />
        <rect
          id="Rectangle_1593"
          data-name="Rectangle 1593"
          width="20.433"
          height="4.5"
          rx="1"
          transform="translate(170.783 5031.68)"
          fill={groundColor}
        />
        <rect
          id="Rectangle_1594"
          data-name="Rectangle 1594"
          width="20.433"
          height="4.5"
          rx="1"
          transform="translate(170.783 5038.359)"
          fill={groundColor}
        />
      </g>
    </svg>
  );
};

ActiveLotteriesIcon.propTypes = {
  isActive: PropTypes.bool,
};

ActiveLotteriesIcon.defaultProps = {
  isActive: false,
};

export default ActiveLotteriesIcon;
