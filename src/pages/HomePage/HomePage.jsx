import Hero from "../../components/Hero/Hero"
import AboutUs from "../../components/AboutUs/AboutUs"
import OurCar from "../../components/OurCar/OurCar"
import Services from "../../components/Services/Services"
import Footer from "../../components/Footer/Footer"
import css from "./HomePage.module.css"

const HomePage = () => {
  return (
    <div className={css.container}>
      <Hero/>
      <AboutUs id="about"/>
      <OurCar id="car"/>
      <Services id="services" />
      <Footer/>
    </div>
  )
}

export default HomePage