import React from 'react';
import onClickOutside from 'react-onclickoutside';
import { Trans } from 'react-i18next';
import styles from './winNumberPopup.module.scss';
import IconArrow from '../../../components/Icons/IconArrow';
import contractImg from './contract.png';

function WinNumberPopup({ closeHandler }) {
  return (
    <div className={styles.container}>
      <span className={styles.title}>
        <Trans i18nKey="winNumberGeneration.title" />
      </span>
      <span className={styles.subtitle}>
        <Trans i18nKey="winNumberGeneration.subtitle" />
      </span>
      <p>
        <Trans i18nKey="winNumberGeneration.list" />
      </p>
      <span className={styles.title}>
        <Trans i18nKey="winNumberGeneration.imageTitle" />
      </span>
      <img className={styles.image} src={contractImg} alt="" />
      <button type="button" className={styles.closeBtn} onClick={closeHandler}>
        <IconArrow />
      </button>
    </div>
  );
}

export default onClickOutside(WinNumberPopup);
