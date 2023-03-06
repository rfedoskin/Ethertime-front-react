import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { Trans } from 'react-i18next';
import Hero from '../../components/Hero';
import NetworkSelector from '../../components/NetworkSelector';
import SearchPanel from '../../components/SearchPanel';
import LanguageMenu from '../LanguageMenu';
import Metamask from '../Metamask';
import ContractInfo from '../../components/ContractInfo';
import MetamaskDownloadLink from '../../components/MetamaskDownloadLink';
import styles from './header.module.scss';
import Container from '../Container';
import CollapseButton from '../../components/CollapseButton';
import CollapseArea from '../../components/CollapseArea/CollapseArea';
import IconYoutube from '../../components/Icons/IconYoutube';

class Header extends React.Component {
  state = {
    isOpen: false,
    isContractInfoOpen: false,
    // TODO: move to Redux store
    loaded: false,
    bottomVisible: true,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  static getDerivedStateFromProps = props => {
    if (props.isHintShown) {
      return {
        isOpen: true,
        bottomVisible: true,
      };
    }
    return null;
  };

  handleButtonClick = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  handleScroll = () => {
    const { isContractInfoOpen } = this.state;

    const currentScrollPos = window.pageYOffset;
    const bottomVisible = currentScrollPos < 100;
    const contractInfoVisible = isContractInfoOpen && bottomVisible;

    this.setState({
      isContractInfoOpen: contractInfoVisible,
      bottomVisible,
    });
  };

  setContractInfoOpen = isOpen => {
    this.setState({
      isContractInfoOpen: isOpen,
    });
  };

  render() {
    const { isOpen, loaded, bottomVisible, isContractInfoOpen } = this.state;
    const {
      isConnected,
      isConnecting,
      accountAddress,
      isHintShown,
      layout,
      contractAddress,
    } = this.props;

    const mockNetwork = {
      name: 'Main',
      colorHex: '#29B6AF',
    };

    const isCompact = layout === 'L';

    return (
      <header className={cn(styles.mainHeader)}>
        <div className={styles.headerContainer}>
          {isHintShown && <div className={styles.hintOverlay} />}
          <Container>
            <div className={styles.navRow}>
              <div className={styles.heroContainer}>
                <Hero />
                <NetworkSelector selectedNetwork={mockNetwork} />
              </div>
              <div className={styles.flexContainer}>
                <SearchPanel
                  loaded={loaded}
                  isConnected={isConnected}
                  accountAddress={accountAddress}
                  onLoad={() => {
                    // TODO: only for demo
                    this.setState({ loaded: true });
                  }}
                  onReset={() => {
                    // TODO: only for demo
                    this.setState({ loaded: false });
                  }}
                />
                <Metamask
                  isOpen={isOpen && bottomVisible}
                  isConnected={isConnected}
                  isConnecting={isConnecting}
                />
                <LanguageMenu className={styles.languageMenu} />
              </div>
            </div>
          </Container>
        </div>
        <div
          className={cn(styles.panel, {
            [styles.hidden]: !bottomVisible && !isHintShown,
            [styles.collapsed]: isOpen,
          })}
        >
          {isOpen && (
            <div className={styles.mainPanel}>
              <Container>
                <div className={styles.panelRow}>
                  <div className={styles.colFirst}>
                    <ContractInfo
                      contractAddress={contractAddress}
                      isOpen={isContractInfoOpen}
                      handleOpen={() => this.setContractInfoOpen(true)}
                      handleClose={() => this.setContractInfoOpen(false)}
                      handleClickOutside={() => this.setContractInfoOpen(false)}
                    />
                    {isCompact ? (
                      <div className={styles.or} />
                    ) : (
                      <span>
                        <Trans i18nKey="metamaskPanel.text1" />
                      </span>
                    )}
                    <div className={styles.howto}>
                      <p className={styles.mainPanelText}>
                        <Trans i18nKey="metamaskPanel.text2" />
                      </p>
                      {isCompact && <MetamaskDownloadLink isCompact={isCompact} />}
                      <a href="/">
                        <IconYoutube className={styles.buttonIcon} />
                        <Trans i18nKey="metamaskPanel.howto" />
                      </a>
                    </div>
                  </div>
                  {!isCompact && (
                    <div className={styles.colSecond}>
                      <MetamaskDownloadLink isCompact={isCompact} />
                    </div>
                  )}
                </div>
              </Container>
            </div>
          )}
          <div className={styles.collapseAreaWrapper}>
            {isHintShown && <div className={styles.hintOverlay} />}
            <CollapseArea
              className={cn(styles.collapseButton, { [styles.collapsed]: isOpen })}
              onClick={this.handleButtonClick}
            >
              <Container>
                <div className={styles.infoRow}>
                  {!isOpen && (
                    <>
                      <span className={styles.infoText}>
                        <Trans i18nKey="metamaskPanel.infoText" />
                      </span>
                      <span>
                        <Trans i18nKey="metamaskPanel.buttonClose" />
                      </span>
                    </>
                  )}
                  <CollapseButton isCollapsed={isOpen} />
                </div>
              </Container>
            </CollapseArea>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ accountReducer, appReducer, contractReducer }) => {
  return {
    isConnected: accountReducer.isConnected,
    isConnecting: accountReducer.isConnecting,
    accountAddress: accountReducer.accountAddress,
    isHintShown: appReducer.isHintShown,
    layout: appReducer.mediaSize,
    contractAddress: contractReducer.contract.options.address,
  };
};

export default connect(mapStateToProps)(Header);
