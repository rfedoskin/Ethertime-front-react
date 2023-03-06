import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import MetamaskIcon from '../../components/MetamaskIcon';
import MetamaskLoadingIndicator from '../../components/MetamaskLoadingIndicator';
import Switch from '../../components/Switch';
import styles from './metamask.module.scss';

import { updateMetamaskConnection } from '../../redux/actions/accountActions';

// TODO: on metamask account change, disconnect/reconnect

const Metamask = ({ dispatch, isConnected, isConnecting, isOpen }) => {
  const handleChange = () => {
    dispatch(updateMetamaskConnection(!isConnected));
  };

  return (
    <div className={cn(styles.wrapper, { [styles.opened]: isOpen })}>
      <div className={styles.icon}>
        {isConnecting ? <MetamaskLoadingIndicator /> : <MetamaskIcon isConnected={isConnected} />}
      </div>
      <div className={styles.switch}>
        <Switch checked={isConnected} doubleSide onChange={handleChange} id="metamask_switch" />
      </div>
    </div>
  );
};

export default connect()(Metamask);
