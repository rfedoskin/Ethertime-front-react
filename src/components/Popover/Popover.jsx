import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import ReactPopover from 'react-popover';
import styles from './popover.module.scss';

class Popover extends React.Component {
  state = {
    isOpened: false,
  };

  handleMouseEnter = () => this.setState({ isOpened: true });

  handleMouseLeave = () => this.setState({ isOpened: false });

  render() {
    const { children, body, bodyClassName = '', isVisible = true, ...props } = this.props;
    const { isOpened } = this.state;

    const popoverBody = <div className={cn(bodyClassName, styles.wrapper)}>{body}</div>;

    return (
      <ReactPopover
        {...props}
        body={popoverBody}
        isOpen={isVisible && isOpened}
        tipSize={0.01}
        style={{ zIndex: '12000' }}
      >
        <div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
          {children}
        </div>
      </ReactPopover>
    );
  }
}

Popover.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Popover;
