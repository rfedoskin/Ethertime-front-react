import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import Menu from '../../components/Menu';
import PagesMenuIcon from '../../components/PagesMenuIcon';

const PagesMenu = ({ history, location, className }) => {
  const { t: translation } = useTranslation();

  const list = [
    { value: '/history', key: 'history', content: translation('pagesMenu.history') },
    { value: '/support', key: 'support', content: translation('pagesMenu.support') },
  ];
  const currentValue = location.pathname;

  return (
    <div className={className}>
      <Menu
        items={list}
        currentValue={currentValue}
        onChange={value => {
          history.push(value);
        }}
      >
        <PagesMenuIcon />
      </Menu>
    </div>
  );
};

PagesMenu.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }),
  className: PropTypes.string,
};

export default withRouter(PagesMenu);
