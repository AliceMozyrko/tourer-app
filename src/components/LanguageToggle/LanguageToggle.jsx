// import { useState } from 'react';
import css from './LanguageToggle.module.css';

const LanguageToggle = ({ language, onLanguageChange }) => {
  return (
    <button 
      className={css.toggle}
      onClick={() => onLanguageChange(language === 'en' ? 'uk' : 'en')}
    >
      {language === 'en' ? '🇺🇦 UA' : '🇬🇧 EN'}
    </button>
  );
};

export default LanguageToggle;