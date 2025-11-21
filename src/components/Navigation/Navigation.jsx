import { useState } from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FiMenu, FiX } from "react-icons/fi";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import clsx from "clsx";
import logo from "../../../public/img/logo.png";
import css from "./Navigation.module.css";

const Navigation = ({ language, setLanguage, t }) => {
  const { pathname } = useLocation();
  const isBookPage = pathname === "/book";
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

   const makeLinkClass = ({ isActive }) => {
    return clsx(
      css.link,
      isActive && css.active,
      isBookPage && css.beige  
    );
   };
  const hashLinkClass = clsx(css.link, isBookPage && css.beige);

  return ( 
    <nav className={css.container}>
      <NavLink to="/" onClick={closeMenu}>
        <img src={logo} alt="logo" className={css.logo} />
      </NavLink>
      
      <div className={css.burger} onClick={toggleMenu}>
        {isOpen ? <FiX size={28} className={css.cross} /> : <FiMenu size={28} />}
      </div>

      <div className={clsx(css.links, isOpen && css.showMenu)}>
          <NavLink to="/" className={makeLinkClass} onClick={closeMenu}>
          {t.nav.home}
        </NavLink>
        <HashLink smooth to="/#about" className={hashLinkClass} onClick={closeMenu}>
          {t.nav.about}
        </HashLink>
        <HashLink smooth to="/#car" className={hashLinkClass} onClick={closeMenu}>
          {t.nav.car}
        </HashLink>
        <HashLink smooth to="/#services" className={hashLinkClass} onClick={closeMenu}>
          {t.nav.services}
        </HashLink>
        <NavLink to="/book" className={makeLinkClass} onClick={closeMenu}>
          {t.nav.book}
        </NavLink>  
         <LanguageToggle 
          language={language} 
          onLanguageChange={setLanguage} 
          className={css.langBtn}
      />
      </div>
    </nav>
  );
};

export default Navigation;
