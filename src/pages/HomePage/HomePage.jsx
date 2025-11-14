import Hero from "../../components/Hero/Hero"
import AboutUs from "../../components/AboutUs/AboutUs"
import OurCar from "../../components/OurCar/OurCar"
import Services from "../../components/Services/Services"
import Footer from "../../components/Footer/Footer"
import css from "./HomePage.module.css"

const HomePage = ({ language, setLanguage, t }) => {
  return (
    <div>
      <Hero language={language} setLanguage={setLanguage} t={t}/>
      <div className={css.container}>
        <AboutUs id="about" t={t}/>
        <OurCar id="car" t={t}/>
        <Services id="services" t={t}/>
      </div>
      <Footer t={t}/>
    </div>
  )
}

export default HomePage