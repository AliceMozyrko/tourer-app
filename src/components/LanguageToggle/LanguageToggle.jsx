import { useLocation } from "react-router-dom";
import clsx from "clsx";
import css from './LanguageToggle.module.css';

const LanguageToggle = ({ language, onLanguageChange }) => {
  const { pathname } = useLocation();
  const isBookPage = pathname === "/book";

  const makeLinkClass = () => {
    return clsx(
      css.toggle,
      isBookPage && css.beige  
    );
  };
  return (
      <button 
      className={makeLinkClass()}
      onClick={() => onLanguageChange(language === 'en' ? 'uk' : 'en')}
    >
      {language === 'en' ? '🇺🇦 UA' : '🇬🇧 EN'}
    </button>
  );
};

export default LanguageToggle;