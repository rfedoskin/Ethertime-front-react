import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import onClickOutside from 'react-onclickoutside';
import MenuItem from './MenuItem';
import styles from './menu.module.scss';

class Menu extends React.Component {
  state = {
    isOpened: false,
  };

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node]).isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        content: PropTypes.node,
      })
    ).isRequired,
    currentValue: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  };

  handleMenuClick = item => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(item);
    }

    this.handleClickOutside();
  };

  handleClose = () => {
    const { onClose = function() {} } = this.props;
    onClose();
  };

  handleButtonClick = event => {
    event.preventDefault();

    const { isOpened } = this.state;

    if (isOpened) {
      this.handleClose();
    }

    this.setState(prevState => ({
      isOpened: !prevState.isOpened,
    }));
  };

  handleClickOutside = () => {
    this.handleClose();
    this.setState({ isOpened: false });
  };

  render() {
    const {
      items,
      children,
      currentValue,
      itemStyle = {},
      style = {},
      onClick = function() {},
    } = this.props;
    const { isOpened } = this.state;

    return (
      <div className={styles.menu}>
        <button
          type="button"
          className={cn(styles.button, { [styles.active]: isOpened })}
          onClick={event => {
            onClick();
            this.handleButtonClick(event);
          }}
        >
          {children}
        </button>
        {isOpened && (
          <div className={styles.wrapper} style={style}>
            <div className={styles.list}>
              {items.map(item => (
                <MenuItem
                  className={styles.item}
                  key={item.key}
                  disabled={currentValue === item.value}
                  onClick={this.handleMenuClick}
                  value={item.value}
                  itemStyle={itemStyle}
                >
                  {item.content}
                </MenuItem>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default onClickOutside(Menu);
