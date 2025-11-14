import React from "react";
import { useState } from "react";
import { TbArrowsTransferUpDown } from "react-icons/tb";
import { CiCamera } from "react-icons/ci";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdOutlineEmojiPeople } from "react-icons/md";
import Button from "../Button/Button";
import ModalBook from "../ModalBook/ModalBook";
import css from "./Services.module.css";

const Services = ({id, t}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

 const guideList = [
  {
    name: "attraction1",
    link: "https://en.wikipedia.org/wiki/People%27s_Friendship_Arch"
  },
  {
    name: "attraction2",
    link: "https://uk.wikipedia.org/wiki/Парковий_міст_через_Дніпро_(Київ)"
  },
  {
    name: "attraction3",
    link: "https://en.wikipedia.org/wiki/Kyiv_Pechersk_Lavra"
  },
  {
    name: "attraction4",
    link: "https://en.wikipedia.org/wiki/Saint_Sophia%27s_Cathedral,_Kyiv"
  },
  {
    name: "attraction5",
    link: "https://en.wikipedia.org/wiki/St._Michael%27s_Golden-Domed_Monastery"
  },
  {
    name: "attraction6",
    link: "https://en.wikipedia.org/wiki/House_with_Chimaeras"
  },
  {
    name: "attraction7",
    link: "https://en.wikipedia.org/wiki/Hryshko_National_Botanical_Garden"
  },
  {
    name: "attraction8",
    link: "https://en.wikipedia.org/wiki/Mother_Ukraine"
  },
  {
    name: "attraction9",
    link: "https://en.wikipedia.org/wiki/St._Andrew%27s_Church,_Kyiv"
  },
  {
    name: "attraction10",
    link: "https://en.wikipedia.org/wiki/St_Andrew%27s_Church,_Kyiv"
  },
  {
    name: "attraction11",
    link: "https://en.wikipedia.org/wiki/Mariinskyi_Palace"
  },
  {
    name: "attraction12",
    link: "https://en.wikipedia.org/wiki/Feofaniya"
  },
  {
    name: "attraction13",
    link: "https://en.wikipedia.org/wiki/National_Opera_of_Ukraine"
  },
  {
    name: "attraction14",
    link: "https://en.wikipedia.org/wiki/Kyiv_Fortress"
  },
  {
    name: "attraction15",
    link: "https://en.wikipedia.org/wiki/Golden_Gate,_Kyiv"
  }
];
  
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? guideList : guideList.slice(0, 7);

  return (
    <div className={css.container} id={id}>
      <h1 className={css.title}><MdOutlineEmojiPeople size={35}/>{t.services.title}</h1>
    <div className={css.cards}>
      <div className={css.card}>
        <div className={css.ribbon}>
            <h2><TbArrowsTransferUpDown size={20} />{t.services.directionsTitle}</h2>
            <h3>{t.services.directionsSubtitle}</h3>
          </div>
        <ul className={css.list}>
          <li>{t.services.route1}</li>
          <li>{t.services.route2}</li>
          <li>{t.services.route3}</li>
          <li>{t.services.route4}</li>
          <li>{t.services.route5}</li>
          <li>{t.services.route6}</li>
          <li>{t.services.route7}</li>
          <p className={css.moreTxt}>{t.services.route8}</p>
          </ul>
      </div>

      <div className={css.card}>
        <div className={css.ribbon}>
            <h2><CiCamera size={25}/>{t.services.tourTitle}</h2>
            <h3>{t.services.tourSubtitle}</h3>
        </div>
        <ul className={css.list}>
            {visibleItems.map((item, idx) => (
              <li key={idx}>
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={css.link}
                >                
                {t.services[item.name]}
              </a>
            </li>
          ))}
        </ul>
        {guideList.length > 7 && (
          <button
            className={css.toggleBtn}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                <FaChevronUp />
              </>
            ) : (
              <>
                <FaChevronDown />
              </>
            )}
          </button>
        )}
        </div>
        <div className={css.sales}>
      <div className={css.shocoinCard}>
      <div className={css.cardTop}>
        <span className={css.cardLimited}>{t.services.saleBadge}</span>
        <h2 className={css.cardPrice}>{t.services.saleDiscount}</h2>
      </div>
      <div className={css.cardBottom}>
        <h3 className={css.destination}>{t.services.saleRoute}</h3>
            <p className={css.date}>{t.services.saleDate}</p>         
        </div>
      </div>
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
      </div>
    </div>
  );
};

export default Services;
