import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import Switch from '../../components/Switch';
import styles from './lotteriesPage.module.scss';
import Container from '../Container';
import LotteryResultSwitch from '../../components/LotteryResultSwitch';
import CompletedLotteriesList from './CompletedLotteriesList';
import UpcomingLotteriesList from './UpcomingLotteriesList/UpcomingLotteriesList';
import IconAngle from './IconAngle';
import WinNumberPopup from './WinNumberPopup/WinNumberPopup';

const LotteriesPage = () => {
  const { t: translation } = useTranslation();
  const [isFilterFinished, changeFilter] = useState(false);
  const [isNumberPopupOpened, setNumberPopupOpened] = useState(false);

  const handleSwitchChange = () => changeFilter(!isFilterFinished);

  const pageContent = isNumberPopupOpened ? (
    <WinNumberPopup
      closeHandler={() => setNumberPopupOpened(false)}
      handleClickOutside={() => setNumberPopupOpened(false)}
    />
  ) : (
    <>
      <section className={styles.wrapper}>
        <LotteryResultSwitch />
        <div className={styles.switchContainer}>
          <div className={styles.col1}>
            <span className={cn({ [styles.active]: !isFilterFinished })}>
              {translation('resultTypeSwitch.previous')}
            </span>
          </div>
          <div className={styles.col2}>
            <Switch
              checked={isFilterFinished}
              color="secondary"
              doubleSide
              onChange={handleSwitchChange}
              id="result_switcher"
            />
          </div>
          <div className={styles.col3}>
            <span className={cn({ [styles.active]: isFilterFinished })}>
              {translation('resultTypeSwitch.upcoming')}
            </span>
          </div>
        </div>
        <button
          type="button"
          className={styles.supportLink}
          onClick={() => setNumberPopupOpened(true)}
        >
          {translation('resultTypeSwitch.supportLink')}
          <IconAngle className={styles.angle} />
        </button>
      </section>
      {isFilterFinished ? <UpcomingLotteriesList /> : <CompletedLotteriesList />}
    </>
  );

  return <Container>{pageContent}</Container>;
};

export default LotteriesPage;
