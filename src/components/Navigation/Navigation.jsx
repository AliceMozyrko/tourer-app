// import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import logo from "../../../public/img/logo.png";
import { HashLink } from "react-router-hash-link";
// import burger from "../../../assets/images/burger.png"
import clsx from "clsx";
import css from "./Navigation.module.css"

const makeLinkClass = ({isActive}) => {
  return clsx(css.link, isActive && css.active)
}

const Navigation = () => {
  
  return (
    // <Navbar expand="md" className={clsx(css.maindiv)}>
    //   {/* <Container fluid className="d-flex justify-content-between align-items-center"> */}
    //     {/* <NavLink to="/">
    //       <img src={logo} alt="Gren Logo" width={100} height={90} className={css.logo} />
    //     </NavLink> */}

    //     {/* <Navbar.Toggle aria-controls="main-navbar-nav" className="me-2">
    //       <img src={burger} alt="Menu" className={css.burgerIcon}/>
    //     </Navbar.Toggle> */}

    //     <Navbar.Collapse id="main-navbar-nav" className={css.burger}>
    //       <Nav className={clsx("ms-auto", css.navCollapseMobile)}>
    //       </Nav>
    //     </Navbar.Collapse>
    //   {/* </Container> */}
    // </Navbar>
    <nav className={css.container}>
      <NavLink to="/">
        <img
          src={logo}
          alt="logo"
          className={css.logo} />
      </NavLink>      
      <div className={css.links}>
        <NavLink to="/" className={makeLinkClass}>HOME</NavLink>

        <HashLink smooth to="/#about" className={css.link}>ABOUT US</HashLink>
        <HashLink smooth to="/#car" className={css.link}>OUR CAR</HashLink>
        <HashLink smooth to="/#services" className={css.link}>SERVICES</HashLink>

        <NavLink to="/book" className={makeLinkClass}>BOOK</NavLink>    
      </div>     
    </nav>
    
  );
}

export default Navigation
