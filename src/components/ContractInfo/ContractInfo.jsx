import React from 'react';
import PropTypes from 'prop-types';
import { Trans } from 'react-i18next';
import cn from 'classnames';
import onClickOutside from 'react-onclickoutside';
import styles from './contractInfo.module.scss';
import CollapseButton from '../CollapseButton';
import CopyButton from '../CopyButton';
import EtherscanLink from '../EtherscanLink';
import Popover from '../Popover';
import CollapseArea from '../CollapseArea/CollapseArea';
import IconYoutube from '../Icons/IconYoutube';

function ContractInfo({ contractAddress, isOpen, handleOpen, handleClose }) {
  return (
    <div className={styles.wrapper}>
      <div className={cn(styles.container, { [styles.collapsed]: isOpen })}>
        <div className={styles.containerContract}>
          <div className={styles.contractRow}>
            <span>
              <Trans i18nKey="contractInfo.address" />
            </span>
            <span className={styles.contractAddress}>{contractAddress}</span>
            <Popover body={<div className={styles.qrLarge} />} preferPlace="below">
              <div className={styles.qrBtn} />
            </Popover>
            <div className={styles.buttonWrapper}>
              <CopyButton
                popoverText={<Trans i18nKey="contractInfo.copyLabel" />}
                textToCopy={contractAddress}
              />
            </div>
            <EtherscanLink />
          </div>
        </div>
        {isOpen && (
          <section className={styles.collapsePanel}>
            <h4 className={styles.messageTitle}>
              <Trans i18nKey="contractInfo.messageTitle1" />
            </h4>
            <p className={styles.messageText}>
              <Trans i18nKey="contractInfo.messageText1" />
            </p>
            <p className={styles.messageSubtitle}>
              <Trans i18nKey="contractInfo.messageSubtitle1" />
            </p>
            <p className={styles.messageText}>
              <Trans i18nKey="contractInfo.messageText2" />
            </p>
            <a href="/">
              <IconYoutube className={styles.buttonIcon} />
              <Trans i18nKey="contractInfo.howtoLink" />
            </a>
          </section>
        )}
        <CollapseArea onClick={isOpen ? handleClose : handleOpen} className={styles.collapseBtn}>
          <div className={styles.infoRow}>
            {!isOpen && (
              <span className={styles.infoText}>
                <Trans i18nKey="contractInfo.infoText" />
              </span>
            )}
            <CollapseButton isCollapsed={isOpen} />
          </div>
        </CollapseArea>
      </div>
    </div>
  );
}

ContractInfo.propTypes = {
  contractAddress: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func,
};

export default onClickOutside(ContractInfo);
