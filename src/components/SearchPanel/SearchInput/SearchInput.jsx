import React from 'react';
import cx from 'classnames';

import IconClear from '../../Icons/IconClear';

import s from './SearchInput.module.scss';

const SearchInput = ({
  id,
  name,
  placeholder,
  value,
  onChange,
  matched = false,
  collapsed = false,
  className,
  rightContainer = null,
  onKeyDown,
  onClear,
  isConnected,
}) => {
  const inputRef = React.useRef(null);
  const [mathchedVisible, setMatchedVisible] = React.useState(false);

  const handleClear = React.useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    if (onClear) {
      onClear();
    }
  }, [onClear]);

  const handleKeyDown = React.useCallback(
    event => {
      if (onKeyDown) {
        onKeyDown(event);
      }
    },
    [onKeyDown]
  );

  const handleMouseEnter = React.useCallback(() => {
    setMatchedVisible(false);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setMatchedVisible(true);
  }, []);

  return (
    <div className={s.root}>
      <div
        className={cx(s.container, { [s.matched]: matched || isConnected })}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <input
          ref={inputRef}
          id={id}
          name={name}
          className={cx(
            s.input,
            { [s.matched]: matched || isConnected, [s.collapsed]: collapsed },
            className
          )}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          readOnly={isConnected}
        />
        <div className={s.rightContainer}>{rightContainer}</div>
      </div>
      {matched && !collapsed && mathchedVisible && !isConnected && (
        <div className={s.mathcedBlock} onClick={handleClear}>
          <IconClear />
        </div>
      )}
    </div>
  );
};

export default SearchInput;
