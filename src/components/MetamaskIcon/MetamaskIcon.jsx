import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './metamaskIcon.module.scss';

const MetamaskIcon = ({ isConnected }) => {
  const classes = cn(styles.icon, {
    [styles.iconColor]: isConnected,
  });

  return <div className={classes} />;
};

MetamaskIcon.propTypes = {
  isConnected: PropTypes.bool,
};

export default MetamaskIcon;
