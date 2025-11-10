import React from "react";
import { FaWhatsapp, FaViber } from "react-icons/fa";
import css from "./ModalBook.module.css";

const ModalBook = ({ isOpen, onClose, onMessengerClick }) => {
  if (!isOpen) return null; 

  return (
    <div className={css.modalOverlay}>
      <div className={css.modal}>
        <h3>Send booking via messenger:</h3>

        <div className={css.messengerRow}>
          <button
            type="button"
            onClick={() => onMessengerClick("whatsapp")}
            className={css.messengerBtn}
          >
            <FaWhatsapp size={40} color="#25D366" />
          </button>

          <button
            type="button"
            onClick={() => onMessengerClick("viber")}
            className={css.messengerBtn}
          >
            <FaViber size={40} color="#665CAC" />
          </button>
          <a
            href="https://t.me/TourerUaBot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegram size={30} color="#0088cc" />
          </a>
        </div>

        <button className={css.closeBtn} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalBook;
