import { NavLink } from "react-router-dom";
import logo from "../../../public/img/logo.png";
import { FaWhatsapp, FaTelegram, FaViber } from "react-icons/fa";
import { SiSignal, SiWechat } from "react-icons/si";
import { useNavigate } from "react-router-dom";

import css from "./Footer.module.css"

const Footer = () => {
  const navigate = useNavigate()

  const handleClick = () => {
      navigate("/book");
  };

  return(
    <div className={css.container}>
      <NavLink to="/">
        <img
          src={logo}
          alt="logo"
          className={css.logo} />
      </NavLink>
      <p className={css.txt}>© 2025 Tourer. All rights reserved.</p>
      <div className={css.socials}>
        <a onClick={handleClick}><FaWhatsapp size={30} color="#25D366" /></a>
        <a onClick={handleClick}><FaViber size={30} color="#665CAC" /></a>
        <a onClick={handleClick}><FaTelegram size={30} color="#0088cc" /></a>
        <a onClick={handleClick}><SiSignal size={30} color="#3A76F0" /></a>
        <a onClick={handleClick}><SiWechat size={30} color="#7BB32E" /></a>
      </div>
    </div>
  )
}

export default Footer