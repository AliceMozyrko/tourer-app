import Navigation from "../Navigation/Navigation"
import ModalBook from "../ModalBook/ModalBook"
import { useState } from "react"
import Button from "../Button/Button"
import css from "./Hero.module.css"

const Hero = ({ language, setLanguage, t }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div className={css.hero}>
      <Navigation language={language} setLanguage={setLanguage} t={t} />
      <h1 className={css.title}>{t.hero.title}<br />{t.hero.title_2}</h1>
      <p className={css.subtitle}>{t.hero.subtitle}</p>
      <Button 
        text={t.services.saleCta} 
        className={css.btn}
        onClick={() => setIsModalOpen(true)}
      />
      <ModalBook
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMessengerClick={(messenger) => {
          console.log("Selected messenger:", messenger);
        }}
      />
    </div>
  )
}

export default Hero