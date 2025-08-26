import Navigation from "../Navigation/Navigation"
import Button from "../Button/Button"
import { useNavigate } from "react-router-dom"
import css from "./Hero.module.css"

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <div className={css.hero}>
      <Navigation/>
      <h1 className={css.title}>On Time. Safe. <br />Comfortable.</h1>
      <p className={css.subtitle}>We’ll get you right where you need to be.</p>
      <Button text="BOOK" className={css.btn} onClick={() => navigate("/book")}/>
    </div>
  )
}

export default Hero