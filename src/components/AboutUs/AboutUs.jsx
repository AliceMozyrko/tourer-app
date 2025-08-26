import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SlPeople } from "react-icons/sl";
import css from "./AboutUs.module.css";

const AboutUs = ({id}) => {
  return (
    <div className={css.container} id={id}>
      <div className={css.text}>
        <h1 className={css.title}><SlPeople size={30}/> About Us</h1>
        <ul className={css.descr}>
          <li>A transfer company from Kyiv, licensed for international and domestic passenger transportation by car, License No. 492 dated July 3, 2024.</li>
          <li>Our experience will help you plan your departure time correctly to arrive on time.</li>
          <li>Payment by card or cash</li>
        </ul>
      </div>
        <Swiper 
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className={css.slider}
        >
        <SwiperSlide>
          <img src="/img/license/eng-license.jpg" alt="eng-license" className={css.image} />            
          </SwiperSlide>          
        <SwiperSlide>
          <img src="/img/license/ua-license.jpg" alt="ua-license" className={css.image} />           
        </SwiperSlide> 
        </Swiper>
    </div>
    
  );
};

export default AboutUs