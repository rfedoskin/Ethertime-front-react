import React from 'react';
import cn from 'classnames';
import scrollToComponent from 'react-scroll-to-component';
import { Trans } from 'react-i18next';

import PrizeProgressBar from '../PrizeProgressBar';
import DistributionSwitcher from '../DistributionSwithcer';

import IconArrow from '../../Icons/IconArrowFulfiled';
import IconWinner from '../../Icons/IconWinner';

import {
  swithcerOptions as options,
  distributionDescriptions,
  distributionShareByStrategy,
  distributionAmountByStrategy,
  mapColorWithPrizeStrategy,
} from './PrizeLayout.config';

import s from './PrizeLayout.module.scss';

const PrizeLayout = () => {
  const [currentWinStrategy, setStrategy] = React.useState('all');
  const ref = React.useRef();

  React.useEffect(() => {
    if (ref.current) {
      scrollToComponent(ref.current);
    }
  }, []);

  const playersNumbers = [7, 8, 9, 0, 1, 2, 3, 4, 5, 6];

  return (
    <div className={s.root} ref={ref}>
      <div className={s.header}>
        <div className={cn(s.title, s.playersCol)}>
          <Trans i18nKey="prizeLayout.playersColTitle" />
        </div>
        <div className={cn(s.title, s.winNumberCol)}>
          <Trans i18nKey="prizeLayout.winNumberColTitle" />
        </div>
        <div className={cn(s.title, s.resultsCol)}>
          {distributionDescriptions[currentWinStrategy]}
        </div>
      </div>
      <div className={s.subHeader}>
        <p className={cn(s.subTitle, s.playersCol)}>
          <Trans i18nKey="prizeLayout.zeroNumberExplanation" />
        </p>
        <p className={cn(s.subTitle, s.winNumberCol)} />
        <p className={cn(s.subTitle, s.resultsCol)}>
          <Trans i18nKey="prizeLayout.lotteryExample" />
        </p>
      </div>
      <div className={s.prizeDistribution}>
        <div className={cn(s.members, s.playersCol)}>
          {new Array(10).fill(true).map((el, idx) => (
            <PrizeProgressBar
              // TODO: maybe there is a better way to use keys
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              number={idx}
              title={`Player ${idx + 1} wallet`}
              className={s.member}
              barStyles={{ backgroundColor: '#EBE7E7' }}
              progress={100}
            />
          ))}
          <IconArrow className={s.arrow} />
        </div>
        <div className={cn(s.currentWinner, s.winNumberCol)}>
          <div className={s.winnerLabel}>
            <Trans i18nKey="prizeLayout.winnerLabel" />
          </div>
          <div className={s.firstResult}>
            <IconWinner className={s.iconWinner} />
            <span className={s.firstNumber}>7</span>
          </div>
          <IconArrow className={s.arrow} />
        </div>
        <div className={s.resultsCol}>
          <div className={s.distribution}>
            {playersNumbers.map((playerNumber, index) => {
              return (
                <PrizeProgressBar
                  // TODO: maybe there is a better way to use keys
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  number={playerNumber}
                  title={`Player ${playerNumber} wallet`}
                  progress={distributionShareByStrategy[currentWinStrategy][index]}
                  className={cn(s.member, { [s.currentWinner]: index === 0 })}
                  fill={mapColorWithPrizeStrategy[currentWinStrategy]}
                  capture={`${distributionAmountByStrategy[currentWinStrategy][index]} ETH`}
                />
              );
            })}
          </div>
          <div className={s.switcher}>
            <DistributionSwitcher
              currentValue={currentWinStrategy}
              options={options}
              onChange={option => setStrategy(option)}
            />
          </div>
        </div>
      </div>
      <p className={s.extraInfo}>
        <Trans i18nKey="prizeLayout.lotteryMath" />
      </p>
    </div>
  );
};

export default PrizeLayout;
