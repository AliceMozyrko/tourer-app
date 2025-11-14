import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { IoWaterOutline } from "react-icons/io5";
import { PiSteeringWheel } from "react-icons/pi";
import { IoWifiOutline } from "react-icons/io5";
import { PiSnowflakeLight } from "react-icons/pi";
import { PiBabyLight } from "react-icons/pi";
import { PiBatteryChargingVerticalLight } from "react-icons/pi";
import css from "./OurCar.module.css";

const photos = [
  { src: "/img/photos/IMG_20240702_164148-min.jpg", alt: "front-view", key: "frontView" },
  { src: "/img/photos/IMG_20210604_160608-min.jpg", alt: "4-4", key: "4x4" },
  { src: "/img/photos/IMG_20220223_100816_1-min.jpg", alt: "baby-seats", key: "babySeats" },
  { src: "/img/photos/IMG_20240729_163145-min.jpg", alt: "seats-placement", key: "seatsPlacement" },
  { src: "/img/photos/IMG_20210701_114923-min.jpg", alt: "trunk", key: "trunk" },
  { src: "/img/photos/IMG_20210604_160417-min.jpg", alt: "driver-row", key: "driverRow" },
  { src: "/img/photos/IMG_20240729_164038_1-min.jpg", alt: "2-row", key: "row1" },
  { src: "/img/photos/IMG_20240621_174544-min.jpg", alt: "back-seats", key: "row2" },
  { src: "/img/photos/IMG_20240702_164457-min.jpg", alt: "door-entry", key: "doorEntry" },
  { src: "/img/photos/IMG_20241022_164807-min.jpg", alt: "car", key: "carExterior" },
  { src: "/img/photos/IMG_20241022_164815-min.jpg", alt: "car", key: "carAngle" }
];

const OurCar = ({id, t}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStartIndex, setModalStartIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth <= 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 1158) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    updateSlides(); 
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const sliderRef = useRef(null);
  const modalSliderRef = useRef(null);

  const openModal = (index) => {
    setModalStartIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1158, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ],
  };

  const modalSliderSettings = {
    initialSlide: modalStartIndex,
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };

    useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        if (isModalOpen && modalSliderRef.current) {
          modalSliderRef.current.slickNext();
        } else if (sliderRef.current) {
          sliderRef.current.slickNext();
        }
      } else if (e.key === "ArrowLeft") {
        if (isModalOpen && modalSliderRef.current) {
          modalSliderRef.current.slickPrev();
        } else if (sliderRef.current) {
          sliderRef.current.slickPrev();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <div className={css.container} id={id}>
      <h1 className={css.title}><PiSteeringWheel size={35} />{t.car.title}</h1>
      <div className={css.descr}>
        <p className={css.txt}>{t.car.subtitle}</p>
          
          <div className={css.icons}>
            <div className={css.iconBox}>
              <IoWaterOutline size={45} className={css.icon}/>
              <span className={css.label}>{t.car.water}</span>
            </div>
            <div className={css.iconBox}>
              <IoWifiOutline size={45} className={css.icon}/>
              <span className={css.label}>{t.car.wifi}</span>
            </div>
            <div className={css.iconBox}>
              <PiSnowflakeLight size={45} className={css.icon}/>
              <span className={css.label}>{t.car.ac}</span>
            </div>
            <div className={css.iconBox}>
              <PiBabyLight size={45} className={css.icon}/>
              <span className={css.label}>{t.car.babySeat}</span>
            </div>
            <div className={css.iconBox}>
              <PiBatteryChargingVerticalLight size={45} className={css.icon}/>
              <span className={css.label}>{t.car.charger}</span>
            </div>
          </div>     
      </div>
      

  <Slider ref={sliderRef} {...sliderSettings} className={css.gallery}>
  {photos.map((photo, index) => (
    <div  
      key={index} 
      className={css.photoCard}
      onClick={() => openModal(index)}
    >
      <img src={photo.src} alt={photo.alt} className={css.photo} />
      <div className={css.description}>{t.gallery[photo.key]}</div>
    </div>
  ))}
</Slider>

{isModalOpen && (
  <div className={css.modal} onClick={closeModal}>
    <span className={css.close} onClick={closeModal}>&times;</span>
    <div onClick={(e) => e.stopPropagation()} className={css.modalSliderWrapper}>
      <Slider ref={modalSliderRef} {...modalSliderSettings} className={css.modalSlider}>
        {photos.map((photo, index) => (
          <div key={index}>
            <img src={photo.src} alt={photo.alt} className={css.modalImage} />
            <div className={css.modalDescription}>{t.gallery[photo.key]}</div>
          </div>
        ))}
      </Slider>
    </div>
  </div>
)}
    </div>
  );
};


export default OurCar;
