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
  { src: "/img/photos/IMG_20240702_164148-min.jpg", alt: "front-view", description: "Front view of the car" },
  { src: "/img/photos/IMG_20210604_160608-min.jpg", alt: "4-4", description: "4x4" },
  { src: "/img/photos/IMG_20220223_100816_1-min.jpg", alt: "seats", description: "Baby seats" },
  { src: "/img/photos/IMG_20240729_163145-min.jpg", alt: "norm-seats-placement", description: "Usual seats placement" },
  { src: "/img/photos/IMG_20210701_183906_1-min.jpg", alt: "face-to-face", description: "Face-to-face seating" },
  { src: "/img/photos/IMG_20210701_114923-min.jpg", alt: "trunk", description: "Trunk space" },
  { src: "/img/photos/IMG_20210604_160417-min.jpg", alt: "driver-row", description: "Driver row" },
  { src: "/img/photos/IMG_20240729_164038_1-min.jpg", alt: "2-row", description: "1st row seats" },
  { src: "/img/photos/IMG_20240621_174544-min.jpg", alt: "back-seats", description: "2nd row seats" },
  { src: "/img/photos/IMG_20240702_164457-min.jpg", alt: "door-entry", description: "Door entry" },
  { src: "/img/photos/IMG_20241022_164807-min.jpg", alt: "car", description: "Car exterior" },
  { src: "/img/photos/IMG_20241022_164815-min.jpg", alt: "car", description: "Another angle" }
];

const OurCar = ({id}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStartIndex, setModalStartIndex] = useState(0);

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
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
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
      <h1 className={css.title}><PiSteeringWheel size={35} /> Our Car</h1>
      <div className={css.descr}>
        <p className={css.txt}>Everything is prepared for your comfort and safety</p>
        <div className={css.icons}>
          <IoWaterOutline size={45} className={css.icon}/>
            <IoWifiOutline size={45} className={css.icon}/>
            <PiSnowflakeLight size={45} className={css.icon}/>
            <PiBabyLight size={45} className={css.icon}/>
            <PiBatteryChargingVerticalLight size={45} className={css.icon}/>
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
      <div className={css.description}>{photo.description}</div>
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
            <div className={css.modalDescription}>{photo.description}</div>
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
