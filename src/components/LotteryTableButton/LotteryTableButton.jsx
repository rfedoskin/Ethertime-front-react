import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './lotteryTableButton.module.scss';
import MetamaskHint from '../MetamaskHint/MetamaskHint';
import { setHintShown } from '../../redux/actions/appActions';

const LotteryTableButton = ({ onClick, isHintShown, isHintSource, setHintSource, hideHint }) => {
  const clickOutsideHandler = () => {
    hideHint();
    setHintSource(false);
  };

  const isHighlighted = isHintShown && isHintSource;

  return (
    <div className={styles.buttonContainer}>
      {isHighlighted && (
        <MetamaskHint className={styles.hint} clickOutsideHandler={clickOutsideHandler} />
      )}
      <button
        className={cn(styles.button, { [styles.highlighted]: isHighlighted })}
        onClick={onClick}
        type="button"
        disabled={isHighlighted}
      >
        Play
      </button>
    </div>
  );
};

LotteryTableButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isHintShown: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ appReducer }) => {
  return {
    isHintShown: appReducer.isHintShown,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideHint: () => dispatch(setHintShown(false)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LotteryTableButton);
