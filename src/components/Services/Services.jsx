import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { TbArrowsTransferUpDown } from "react-icons/tb";
import { CiCamera } from "react-icons/ci";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdOutlineEmojiPeople } from "react-icons/md";
import Button from "../Button/Button";
import css from "./Services.module.css";

const Services = ({id}) => {
 const navigate = useNavigate();

 const guideList = [
  {
    name: "Arch of Freedom of the Ukrainian People",
    link: "https://en.wikipedia.org/wiki/People%27s_Friendship_Arch"
  },
  {
    name: "Park Bridge",
    link: "https://uk.wikipedia.org/wiki/Парковий_міст_через_Дніпро_(Київ)"
  },
  {
    name: "Kyiv Pechersk Lavra",
    link: "https://en.wikipedia.org/wiki/Kyiv_Pechersk_Lavra"
  },
  {
    name: "Saint Sophia Cathedral",
    link: "https://en.wikipedia.org/wiki/Saint_Sophia%27s_Cathedral,_Kyiv"
  },
  {
    name: "St. Michael's Golden-Domed Monastery",
    link: "https://en.wikipedia.org/wiki/St._Michael%27s_Golden-Domed_Monastery"
  },
  {
    name: "House with Chimaeras",
    link: "https://en.wikipedia.org/wiki/House_with_Chimaeras"
  },
  {
    name: "National Botanical Garden",
    link: "https://en.wikipedia.org/wiki/Hryshko_National_Botanical_Garden"
  },
  {
    name: "Motherland Monument",
    link: "https://en.wikipedia.org/wiki/Mother_Ukraine"
  },
  {
    name: "St. Andrew's Church",
    link: "https://en.wikipedia.org/wiki/St._Andrew%27s_Church,_Kyiv"
  },
  {
    name: "Andrew's Descent",
    link: "https://en.wikipedia.org/wiki/St_Andrew%27s_Church,_Kyiv"
  },
  {
    name: "Mariinsky Palace",
    link: "https://en.wikipedia.org/wiki/Mariinskyi_Palace"
  },
  {
    name: "Feofania Park",
    link: "https://en.wikipedia.org/wiki/Feofaniya"
  },
  {
    name: "National Academic Opera and Ballet Theatre of Ukraine",
    link: "https://en.wikipedia.org/wiki/National_Opera_of_Ukraine"
  },
  {
    name: "Kyiv Fortress",
    link: "https://en.wikipedia.org/wiki/Kyiv_Fortress"
  },
  {
    name: "Golden Gate Square",
    link: "https://en.wikipedia.org/wiki/Golden_Gate,_Kyiv"
  }
];

  
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? guideList : guideList.slice(0, 7);

  return (
    <div className={css.container} id={id}>
      <h1 className={css.title}><MdOutlineEmojiPeople size={35}/>Services & Sales</h1>
    <div className={css.cards}>
      <div className={css.card}>
        <div className={css.ribbon}>
            <h2><TbArrowsTransferUpDown size={20} /> Directions</h2>
            <h3>Ukraine all cities – Europe any destination</h3>
          </div>
        <ul className={css.list}>
          <li>Kyïv – Chișinău</li>
          <li>Kyïv – Warsaw, Kraków, Rzeszów</li>
          <li>Kyïv - Budapest</li>
          <li>Kyïv - Bucharest</li>
          <li>Kyïv - Vienna</li>
          <li>Kyïv - Iași</li>
          <li>Kyïv - Suceava</li>
          </ul>
          <p className={css.moreTxt}>And many more European cities</p>
      </div>

      <div className={css.card}>
        <div className={css.ribbon}>
            <h2><CiCamera size={25}/>Kyïv Guide-Tour</h2>
            <h3>Click on an attraction to learn more</h3>
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
                {item.name}
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
        <span className={css.cardLimited}>SALE</span>
        <h2 className={css.cardPrice}>Save 30%</h2>
      </div>
      <div className={css.cardBottom}>
        <h3 className={css.destination}>Kyïv - Warsaw</h3>
            <p className={css.date}>05/09/25</p>         
        </div>
      </div>
        <Button text="BOOK" className={css.btn} onClick={() => navigate("/book")} />
    </div>
      </div>
    </div>
  );
};

export default Services;
