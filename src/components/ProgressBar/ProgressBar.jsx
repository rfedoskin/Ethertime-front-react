import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ progress, spinner, idSpacename = '', idKey, ...rest }) => {
  const uniqueId = id => {
    return `${idSpacename}-${idKey}-${id}`;
  };

  const getCurrentClipPath = () => {
    if (progress >= 100) {
      return `#${uniqueId('clipNone')}`;
    }
    if (progress < 100 && progress > 0) {
      const valuesPerStep = 5;
      const currentStep = Math.ceil(progress / valuesPerStep);
      return `#${uniqueId(`clipStep${currentStep}`)}`;
    }
    return '';
  };

  return (
    <svg viewBox="0 0 81 126" {...rest}>
      <defs>
        <clipPath id={uniqueId('clipAll')}>
          <rect width="81" height="128" />
        </clipPath>
        <clipPath id={uniqueId('quarter2')}>
          <rect x="-2" width="43" height="128" />
          <rect x="-2" y="64" width="86" height="64" />
        </clipPath>
        <clipPath id={uniqueId('quarter3')}>
          <rect x="-2" width="43" height="128" />
        </clipPath>
        <clipPath id={uniqueId('quarter4')}>
          <rect x="-2" width="43" height="64" />
        </clipPath>
        <clipPath id={uniqueId('clipNone')} />
        <clipPath id={uniqueId('clipStep1')}>
          <polygon points="41,63 41,0 0,0 0,126 81,126 126,0 49,0" />
        </clipPath>
        <clipPath id={uniqueId('clipStep2')}>
          <polygon points="41,63 41,0 0,0 0,126 81,126 126,0 63,0" />
        </clipPath>
        <clipPath id={uniqueId('clipStep3')}>
          <polygon points="41,63 41,0 0,0 0,126 81,126 81,8" />
        </clipPath>
        <clipPath id={uniqueId('clipStep4')}>
          <polygon points="41,63 41,0 0,0 0,126 81,126 81,39" />
        </clipPath>
        <clipPath id={uniqueId('clipStep5')}>
          <polygon points="41,63 41,0 0,0 0,126 81,126 81,58" />
        </clipPath>
        <clipPath id={uniqueId('clipStep6')}>
          <polygon points="41,63 41,0 0,0 0,126 81,126 81,70" />
        </clipPath>
        <clipPath id={uniqueId('clipStep7')}>
          <polygon points="41,63 41,0 0,0 0,126 81,126 81,89" />
        </clipPath>
        <clipPath id={uniqueId('clipStep8')}>
          <polygon points="41,63 41,0 0,0 0,126 81,126 81,120" />
        </clipPath>
        <clipPath id={uniqueId('clipStep9')}>
          <polygon points="41,63 41,0 0,0 0,126 62,126" />
        </clipPath>
        <clipPath id={uniqueId('clipStep10')}>
          <polygon points="41,63 41,0 0,0 0,126 48,126" />
        </clipPath>
        <clipPath id={uniqueId('clipStep11')}>
          <polygon points="41,63 41,0 0,0 0,126 33,126" />
        </clipPath>
        <clipPath id={uniqueId('clipStep12')}>
          <polygon points="41,63 41,0 0,0 0,126 19,126" />
        </clipPath>
        <clipPath id={uniqueId('clipStep13')}>
          <polygon points="41,63 41,0 0,0 0,119" />
        </clipPath>
        <clipPath id={uniqueId('clipStep14')}>
          <polygon points="41,63 41,0 0,0 0,88" />
        </clipPath>
        <clipPath id={uniqueId('clipStep15')}>
          <polygon points="41,63 41,0 0,0 0,70" />
        </clipPath>
        <clipPath id={uniqueId('clipStep16')}>
          <polygon points="41,63 41,0 0,0 0,56" />
        </clipPath>
        <clipPath id={uniqueId('clipStep17')}>
          <polygon points="41,63 41,0 0,0 0,38" />
        </clipPath>
        <clipPath id={uniqueId('clipStep18')}>
          <polygon points="41,63 41,0 0,0 0,7" />
        </clipPath>
        <clipPath id={uniqueId('clipStep19')}>
          <polygon points="41,63 41,0 19,0" />
        </clipPath>
        <clipPath id={uniqueId('clipStep20')}>
          <polygon points="41,63 41,0 33,0" />
        </clipPath>

        <polygon
          id={uniqueId('ribbed')}
          points="0 57.34 0 69.14 5 69.14 5 80.95 12.13 80.95 12.13 92.76 19.26 92.76 19.26 104.57 26.39 104.57 26.39 116.37 34.09 116.37 34.37 126.48 46.93 126.48 46.93 116.37 54.91 116.37 54.91 104.57 62.04 104.57 62.04 92.76 69.17 92.76 69.17 80.95 76.3 80.95 76.3 69.14 81.31 69.14 81.31 57.34 76.3 57.34 76.3 45.53 69.17 45.53 69.17 33.72 62.04 33.72 62.04 21.91 54.91 21.91 54.91 10.11 46.93 10.11 46.93 0 34.37 0 34.37 10.11 26.39 10.11 26.39 21.91 19.26 21.91 19.26 33.72 12.13 33.72 12.13 45.53 5 45.53 5 57.34 0 57.34"
        />

        <polygon id={uniqueId('romb')} points="35.58 0 0 59.26 35.58 117.58 71.16 59.26 35.58 0" />
      </defs>

      <use xlinkHref={`#${uniqueId('romb')}`} x="5" y="4" fill="#b2b3b3" />
      {spinner ? (
        <use xlinkHref={`#${uniqueId('ribbed')}`} fill="#696968">
          <animate
            attributeName="clip-path"
            values={`url(#${uniqueId('clipAll')});url(#${uniqueId('clipAll')});url(#${uniqueId(
              'quarter2'
            )};url(#${uniqueId('quarter2')};url(#${uniqueId('quarter3')});url(#${uniqueId(
              'quarter3'
            )});url(#${uniqueId('quarter4')});url(#${uniqueId('quarter4')});url(#${uniqueId(
              'clipNone'
            )});url(#${uniqueId('clipNone')});`}
            dur="5s"
            repeatCount="indefinite"
          />
        </use>
      ) : (
        <use
          xlinkHref={`#${uniqueId('ribbed')}`}
          fill="#696968"
          clipPath={`url(${getCurrentClipPath()})`}
        />
      )}
    </svg>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number,
  spinner: PropTypes.bool,
};

export default ProgressBar;
