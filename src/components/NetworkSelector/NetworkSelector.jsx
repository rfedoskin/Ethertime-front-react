import React from 'react';
import PropTypes from 'prop-types';
import { Trans } from 'react-i18next';
import cn from 'classnames';
import styles from './networkSelector.module.scss';
import Menu from '../Menu';
import IconClose from '../Icons/IconClose';
import Popover from '../Popover';
import IconArrow from '../Icons/IconArrow';

class NetworkSelector extends React.Component {
  state = {
    isHintShowed: true,
    isPopoverVisible: true,
    isMenuShowed: false,
  };

  setPopoverVisibility = isPopoverVisible => {
    this.setState({
      isPopoverVisible,
    });
  };

  closeHint = () => {
    this.setState({
      isHintShowed: false,
    });
  };

  handleChange = networkId => {
    console.log('Changing network on ', networkId);
  };

  render() {
    const { isHintShowed, isPopoverVisible, isMenuShowed } = this.state;
    const { selectedNetwork } = this.props;

    const networks = [{ value: '1', key: '1', title: 'Main Ethereum network' }];

    const networksWithNodes = networks.map(network => {
      return {
        value: network.value,
        key: network.key,
        content: <span className={styles.networkItem}>{network.title}</span>,
      };
    });

    return (
      <div className={styles.networkSelectorContainer}>
        <Menu
          items={networksWithNodes}
          currentValue="1"
          align="left"
          onChange={network => this.handleChange(network)}
          itemStyle={{ textAlign: 'left' }}
          style={{ minWidth: '275px', left: 0, right: 'unset' }}
          onClick={() => {
            this.setPopoverVisibility(false);
            this.setState(prevState => ({
              isMenuShowed: !prevState.isMenuShowed,
            }));
          }}
          onClose={() => {
            this.setPopoverVisibility(true);
            this.setState({
              isMenuShowed: false,
            });
          }}
        >
          <Popover
            bodyClassName={styles.popoverBody}
            body={(
              <p className={styles.popoverInfo}>
                <Trans i18nKey="networkSelector.popoverInfo" />
              </p>
)}
            preferPlace="right"
            isVisible={isPopoverVisible}
          >
            <div
              className={styles.selectButton}
              onFocus={this.closeHint}
              onMouseOver={this.closeHint}
            >
              <div
                className={styles.colorId}
                style={{ backgroundColor: selectedNetwork.colorHex }}
              />
              <span className={styles.selectedNetworkName}>{selectedNetwork.name}</span>
              <div className={cn(styles.selectButton, { [styles.collapsed]: isMenuShowed })}>
                <IconArrow />
              </div>
            </div>
          </Popover>
        </Menu>

        {isHintShowed && (
          <div className={styles.selectionHint}>
            <span>Switch to the test network, to try how it works for free.</span>
            <button type="button" onClick={this.closeHint}>
              <IconClose />
            </button>
          </div>
        )}
      </div>
    );
  }
}

NetworkSelector.propTypes = {
  selectedNetwork: PropTypes.shape({
    name: PropTypes.string.isRequired,
    colorHex: PropTypes.string.isRequired,
  }),
};

export default NetworkSelector;
