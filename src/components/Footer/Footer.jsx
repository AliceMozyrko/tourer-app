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
        <FaWhatsapp size={30} color="#25D366" onClick={handleClick} />
        <FaViber size={30} color="#665CAC" onClick={handleClick} />
        <FaTelegram size={30} color="#0088cc" onClick={handleClick} />
        <SiSignal size={30} color="#3A76F0" onClick={handleClick} />
        <SiWechat size={30} color="#7BB32E" onClick={handleClick} />
      </div>
    </div>
  )
}

export default Footer