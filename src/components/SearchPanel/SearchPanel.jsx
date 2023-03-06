import React from 'react';
import cx from 'classnames';
import { withTranslation } from 'react-i18next';
import onClickOutside from 'react-onclickoutside';
import SearchIcon from '../Icons/SearchIcon';
import IconClear from '../Icons/IconClear';
import SearchPanelTable from './SearchPanelTable';

import styles from './searchPanel.module.scss';
import CollapseButton from '../CollapseButton';

class SearchPanel extends React.Component {
  state = {
    isCollapsed: false,
    inputValue: '',
    isFixed: false,
  };

  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.isConnected) {
      return {
        isFixed: newProps.isConnected,
        inputValue: newProps.accountAddress,
      };
    }
    return prevState;
  }

  handleSubmit = () => {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.inputValue === '') {
      return;
    }

    // eslint-disable-next-line react/destructuring-assignment
    this.props.onLoad();
    this.setState({
      isFixed: true,
      isCollapsed: true,
    });
  };

  toggleCollapsed = () => {
    const { isFixed } = this.state;
    if (!isFixed) {
      return;
    }

    this.setState(prevState => ({
      isCollapsed: !prevState.isCollapsed,
    }));
  };

  handleClickOutside = () => {
    this.setState({
      isCollapsed: false,
    });
  };

  onInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  onKeyDown = event => {
    if (event.keyCode === 13) {
      this.handleSubmit();
    }
  };

  onClear = () => {
    this.setState({
      isFixed: false,
      isCollapsed: false,
      inputValue: '',
    });
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onReset();
  };

  render() {
    const { isCollapsed, inputValue, isFixed } = this.state;
    const {
      t: translation,
      // loaded,      QUESTION: WHAT IS THAT?
      isConnected,
    } = this.props;

    return (
      <div
        className={cx(styles.wrapper, { [styles.fixed]: isFixed, [styles.collapsed]: isCollapsed })}
      >
        <div className={styles.absoluteContainer}>
          <div className={styles.form}>
            <div className={cx(styles.container)} onClick={this.toggleCollapsed}>
              <input
                type="text"
                className={cx(styles.input, {
                  [styles.fixed]: isFixed,
                  [styles.collapsed]: isCollapsed,
                })}
                value={inputValue}
                readOnly={isFixed}
                placeholder={translation('searchPanel.inputPlaceholder')}
                onChange={this.onInputChange}
                onKeyDown={this.onKeyDown}
              />
              <div className={styles.rightContainer}>
                <div className={styles.searchButton}>
                  {isFixed ? (
                    <CollapseButton isCollapsed={isCollapsed} className={styles.collapseButton} />
                  ) : (
                    <div onClick={this.handleSubmit}>
                      <SearchIcon className={styles.searchIcon} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {isFixed && !isCollapsed && !isConnected && (
              <div className={styles.mathcedBlock} onClick={this.onClear}>
                <IconClear />
              </div>
            )}
          </div>
          {isCollapsed && (
            <div className={styles.results}>
              <SearchPanelTable accountAddress={inputValue} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withTranslation()(onClickOutside(SearchPanel));
