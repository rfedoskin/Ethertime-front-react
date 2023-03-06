import React from 'react';
import { Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Popover from '../Popover';
import IconButton from '../IconButton';
import IconCopy from '../Icons/IconCopy';
import styles from './copyButton.module.scss';

class CopyButton extends React.Component {
  copyInput = React.createRef();

  state = {
    isCopySucceed: false,
  };

  timerId = null;

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  copyToClipboard = () => {
    clearTimeout(this.timerId);
    if (this.copyInput.current) {
      this.copyInput.current.select();
    }

    document.execCommand('copy');
    this.setState({
      isCopySucceed: true,
    });
    this.timerId = setTimeout(() => {
      this.setState({
        isCopySucceed: false,
      });
    }, 1500);
  };

  render() {
    const { isCopySucceed } = this.state;
    const { textToCopy, popoverText } = this.props;

    const popoverBody = (
      <>
        <input
          type="text"
          readOnly
          className={styles.copyInput}
          value={textToCopy}
          ref={this.copyInput}
        />
        {popoverText}
        <span className={cn(styles.success, { [styles.active]: isCopySucceed })}>
          <Trans i18nKey="contractInfo.copySuccess" />
        </span>
      </>
    );

    return (
      <Popover body={popoverBody} preferPlace="above">
        <IconButton onClick={this.copyToClipboard} onMouseLeave={this.handleMouseLeave}>
          <IconCopy />
        </IconButton>
      </Popover>
    );
  }
}

CopyButton.propTypes = {
  popoverText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  textToCopy: PropTypes.string.isRequired,
};

export default CopyButton;
