import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FiMenu, FiX } from "react-icons/fi";
import clsx from "clsx";
import logo from "../../../public/img/logo.png";
import css from "./Navigation.module.css";

const makeLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

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
          HOME
        </NavLink>
        <HashLink smooth to="/#about" className={css.link} onClick={closeMenu}>
          ABOUT US
        </HashLink>
        <HashLink smooth to="/#car" className={css.link} onClick={closeMenu}>
          OUR CAR
        </HashLink>
        <HashLink smooth to="/#services" className={css.link} onClick={closeMenu}>
          SERVICES
        </HashLink>
        <NavLink to="/book" className={makeLinkClass} onClick={closeMenu}>
          BOOK
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
