import React from 'react';
import { withTranslation } from 'react-i18next';
import cn from 'classnames';
import onClickOutside from 'react-onclickoutside';
import styles from './metamaskHint.module.scss';

const MetamaskHint = ({ t: translation, className, clickOutsideHandler }) => {
  MetamaskHint.handleClickOutside = () => {
    clickOutsideHandler();
  };

  return (
    <div className={cn(styles.hint, className)}>
      <span className={styles.text}>{translation('metamaskHint.text')}</span>
      <span className={styles.closeText}>{translation('metamaskHint.closeText')}</span>
    </div>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => MetamaskHint.handleClickOutside,
};

export default onClickOutside(withTranslation()(MetamaskHint), clickOutsideConfig);
