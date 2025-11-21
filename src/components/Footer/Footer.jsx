import { NavLink } from "react-router-dom";
import logo from "../../../public/img/logo.png";
import { FaWhatsapp, FaTelegram, FaViber } from "react-icons/fa";
import { SiSignal, SiWechat } from "react-icons/si";
import { useNavigate } from "react-router-dom";

import css from "./Footer.module.css"

const Footer = ({t}) => {
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
      <p className={css.txt}>{t.footer.copyright}</p>
      <div className={css.socials}>
        <div className={css.links}>
          <a onClick={handleClick}><FaWhatsapp size={30} color="#25D366" /></a>
          <a onClick={handleClick}><FaViber size={30} color="#665CAC" /></a>
          <a
            href="https://t.me/TourerUaBot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegram size={30} color="#0088cc" />
          </a>
        </div>     
        <a href="tel:+380634943230" className={css.phone}>
          +38 (063) 494 32 30
        </a>
      </div>
    </div>
  )
}

export default Footer