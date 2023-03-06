import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Menu from '../../components/Menu';

const LanguageMenu = ({ className }) => {
  const { t: translation, i18n } = useTranslation();
  // TODO: need for move to store
  const [currentValue, setValue] = React.useState('en');

  const handleLangChange = lang => {
    i18n.changeLanguage(lang, () => {
      setValue(lang);
    });
  };

  // TODO: i think it would be better to set language by setting of state
  const list = [
    { value: 'en', key: 'en', content: translation('languageMenu.en') },
    // { value: 'ru', key: 'ru', content: translation('languageMenu.ru') },
  ];

  return (
    <div className={className}>
      <Menu items={list} currentValue={currentValue} onChange={item => handleLangChange(item)}>
        {currentValue}
      </Menu>
    </div>
  );
};

LanguageMenu.propTypes = {
  className: PropTypes.string,
};

export default LanguageMenu;
