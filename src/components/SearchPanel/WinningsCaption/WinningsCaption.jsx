import React from 'react';
import { withTranslation } from 'react-i18next';
import { convertFromWei, getMethodCallData } from '../../../services/web3Service';
import styles from './WinningsCaption.module.scss';
import CopyButton from '../../CopyButton';
import ProgressBar from '../../ProgressBar';

const WinningsCaption = props => {
  const { t: translation, id, prize, isPaid, isPaying, onClick } = props;

  if (isPaid) {
    return (
      <>
        <span>{convertFromWei(prize)}</span>
        <br />
        <span className={styles.paleText}>{translation('searchPanelTable.paidOut')}</span>
      </>
    );
  }

  if (isPaying) {
    return (
      <ProgressBar
        width="40"
        height="40"
        spinner
        idSpacename="search-payOut"
        idKey={`getting_prize_from_${id}`}
      />
    );
  }

  const copyData = getMethodCallData('payOut', id);

  return (
    <div className={styles.hintWrapper}>
      <div className={styles.hint}>
        <div className={styles.copyWrapper}>
          <CopyButton
            popoverText={translation('searchPanelTable.copyData')}
            textToCopy={copyData}
          />
          <span>{translation('searchPanelTable.copyData')}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="11" viewBox="0 0 7 11">
          <g>
            <g>
              <path
                fill="none"
                stroke="#a8a8a8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="20"
                d="M6.249.47v0L1.138 5.58v0l5.111 5.112v0"
              />
            </g>
          </g>
        </svg>
        <div className={styles.hintText}>{translation('searchPanelTable.getWinningsHint')}</div>
      </div>
      <div className={styles.unpayedWinning}>{convertFromWei(prize)}</div>
      <button type="button" className={styles.button} onClick={() => onClick(id)}>
        {translation('searchPanelTable.getWinningsButton')}
      </button>
    </div>
  );
};

export default withTranslation()(WinningsCaption);
