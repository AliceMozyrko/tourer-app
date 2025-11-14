import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SlPeople } from "react-icons/sl";
import css from "./AboutUs.module.css";


const AboutUs = ({id, t}) => {
  return (
    <div className={css.container} id={id}>
      <div className={css.text}>
        <h1 className={css.title}><SlPeople size={30} />{t.about.title}</h1>
        <ul className={css.descr}>
          <li>{t.about.license}</li>
          <li>{t.about.experience}</li>
          <li>{t.about.payment}</li>
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