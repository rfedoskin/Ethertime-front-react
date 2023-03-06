import React from 'react';
import { Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import styles from './lottery.module.scss';
import ProgressBar from '../ProgressBar';
import ExpandableAddress from './ExpandableAddress';
import { convertFromWei } from '../../services/web3Service';
import { cycleStatus as status } from '../../services/lotteryService';

const StatusSection = ({ cycleStatus, possiblePayments, winners }) => {
  switch (cycleStatus) {
    case status.active: {
      const [firstPrize, secondPrize, thirdPrize] = possiblePayments;

      return (
        <>
          <div className={styles.row}>
            <span>
              <Trans i18nKey="lottery.first" />
            </span>
            <span>{`${convertFromWei(firstPrize)} ETH`}</span>
          </div>
          <div className={styles.row}>
            <span>
              <Trans i18nKey="lottery.second" />
            </span>
            <span>{`${convertFromWei(secondPrize)} ETH`}</span>
          </div>
          <div className={styles.row}>
            <span>
              <Trans i18nKey="lottery.third" />
            </span>
            <span>{`${convertFromWei(thirdPrize)} ETH`}</span>
          </div>
        </>
      );
    }
    case status.finished: {
      const winnersToIterate = winners.slice(0, 3);
      const emptyPlaceholder = '-';

      return (
        <table className={styles.resultsTable}>
          <tbody>
            {[0, 1, 2].map((_, idx) => {
              const winner = winnersToIterate[idx];
              return (
                // TODO: maybe there is a better way to use keys
                // eslint-disable-next-line react/no-array-index-key
                <tr key={idx}>
                  <td className={styles.prizeNumber}>
                    {winner ? winner.number : emptyPlaceholder}
                  </td>
                  <td>
                    {winner ? <ExpandableAddress address={winner.address} /> : emptyPlaceholder}
                  </td>
                  <td className={styles.prizeAmount}>
                    {winner ? `${convertFromWei(winner.prize)} ETH` : emptyPlaceholder}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    case status.pending:
      return (
        <div className={styles.calculationWrapper}>
          <span>
            <Trans i18nKey="lottery.waitingPayment" />
          </span>
          <ProgressBar spinner width="26" height="38" />
        </div>
      );
    case status.calculation:
    default:
      return (
        <span>
          <Trans i18nKey="lottery.waitingWinningNumber" />
        </span>
      );
  }
};

StatusSection.propTypes = {
  cycleStatus: PropTypes.oneOf([
    status.active,
    status.calculation,
    status.finished,
    status.pending,
  ]),
  possiblePayments: PropTypes.arrayOf(PropTypes.number),
};

export default StatusSection;
