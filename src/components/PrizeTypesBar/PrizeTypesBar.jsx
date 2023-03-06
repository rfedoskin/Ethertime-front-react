import React from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import PrizeLayout from './PrizeLayout';
import styles from './prizeTypesBar.module.scss';
import Container from '../../containers/Container';
import CollapseButton from '../CollapseButton';
import CollapseArea from '../CollapseArea/CollapseArea';

const PrizeTypesBar = () => {
  const { t: translation } = useTranslation();
  const [isOpened, setOpened] = React.useState(false);

  const onClick = React.useCallback(() => {
    setOpened(!isOpened);
  }, [isOpened]);

  return (
    <footer className={styles.footer}>
      <CollapseArea
        onClick={onClick}
        className={cx(styles.collapseButton, { [styles.collapsed]: isOpened })}
      >
        <Container>
          <div className={cx(styles.row, { [styles.expanded]: isOpened })}>
            <div className={styles.inner}>
              <span className={styles.infoText}>{translation('footer.text')}</span>
              <div className={styles.icons} />
            </div>
            <div>
              <span className={styles.buttonLabel}>{translation('footer.buttonClose')}</span>
              <CollapseButton isCollapsed={isOpened} />
            </div>
          </div>
        </Container>
      </CollapseArea>
      {isOpened && (
        <div className={styles.content}>
          <Container>
            <PrizeLayout />
          </Container>
        </div>
      )}
    </footer>
  );
};

export default PrizeTypesBar;
