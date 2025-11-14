import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { HashLink } from "react-router-hash-link";
import { useState } from "react";
import { TbCircleLetterAFilled, TbCircleLetterBFilled } from "react-icons/tb";
import { IoCalendarClearOutline } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import { RxPerson } from "react-icons/rx";
import { BsLuggage } from "react-icons/bs";
import { MdOutlinePets } from "react-icons/md";
import { FaWhatsapp, FaViber, FaTelegram } from "react-icons/fa";

import css from "./BookForm.module.css";


const PHONE = "+380638717366";

const BookForm = ({t}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);


  const initialValues = {
    departure: "",
    destination: "",
    departureDate: "",
    departureTime: "",
    returnRide: false,
    returnDate: "",
    returnTime: "",
    adults: "",
    kids: "",
    babySeats: "",
    suitcases: "",
    info: "",
    animals: "no",
    animalType: "",
    animalWeight: "",
  };

  const bookSchema = Yup.object().shape({
  departure: Yup.string().trim().required("Departure is required"),
  destination: Yup.string().trim().required("Destination is required"),
  departureDate: Yup.date().required("Departure date is required"),
  departureTime: Yup.string().required("Departure time is required"),
  returnRide: Yup.boolean(),
  returnDate: Yup.date().when("returnRide", {
    is: true,
    then: (schema) => schema.required("Return date is required"), // ⬅️ ВИПРАВЛЕНО
    otherwise: (schema) => schema.nullable(), // ⬅️ ДОДАНО
  }),
  returnTime: Yup.string().when("returnRide", {
    is: true,
    then: (schema) => schema.required("Return time is required"), // ⬅️ ВИПРАВЛЕНО
    otherwise: (schema) => schema.nullable(), // ⬅️ ДОДАНО
  }),
  adults: Yup.number()
    .typeError("Enter a number")
    .min(1, "At least 1 adult")
    .required("Number of adults is required"),
  kids: Yup.number()
    .typeError("Enter a number")
    .min(0, "Cannot be negative")
    .required("Number is required"),
  babySeats: Yup.string().required("Choose a baby seat"), // ⬅️ ВИПРАВЛЕНО (прибрав nullable)
  suitcases: Yup.number()
    .typeError("Enter a number")
    .min(0, "Cannot be negative")
    .required("Number of suitcases is required"),
  info: Yup.string().max(500, "Too long"),
  animals: Yup.string().oneOf(["yes", "no"]).required(),
  animalType: Yup.string().when("animals", {
    is: "yes",
    then: (schema) => schema.required("Breed is required"), // ⬅️ ВИПРАВЛЕНО
    otherwise: (schema) => schema.nullable(), // ⬅️ ДОДАНО
  }),
  animalWeight: Yup.number().when("animals", {
    is: "yes",
    then: (schema) => schema
      .typeError("Enter a number")
      .required("Weight is required"), // ⬅️ ВИПРАВЛЕНО
    otherwise: (schema) => schema.nullable(), // ⬅️ ДОДАНО
  }),
});

  const handleSubmit = (values) => {
  setFormData(values);
  setIsModalOpen(true);
  toast.success("Almost done! Choose a messenger 👇");
};

  const formatMessage = (data) => {
    return `🚖 New Booking Request:
    From: ${data.departure}
    To: ${data.destination}
    Departure: ${data.departureDate} ${data.departureTime}
    ${data.returnRide ? `Return: ${data.returnDate} ${data.returnTime}` : ""}
    Adults: ${data.adults}, Kids: ${data.kids}
    Baby seat: ${data.babySeats}
    Suitcases: ${data.suitcases}
    Animals: ${data.animals}${data.animals === "yes" ? ` (${data.animalType}, ${data.animalWeight}kg)` : ""}
    Pickup sign: ${data.pickupSign || "—"}
    Comments: ${data.info || "—"}`;
  };

  const handleMessengerClick = (type) => {
    if (!formData) return;
    const text = encodeURIComponent(formatMessage(formData));

    let url = "";
    switch (type) {
      case "whatsapp":
        url = `https://wa.me/${PHONE}?text=${text}`;
        break;
      case "viber":
        url = `viber://chat?number=${PHONE}?text=${text}`;
        break;
      case "telegram":
        url = `https://t.me/MozyrkoYevhen?text=${text}`
        break;
      default:
        return;
    }
    window.open(url, "_blank");
    setIsModalOpen(false);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={bookSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className={css.container} autoComplete="off">
            {/* Departure */}
            <label className={css.label}>
              <div>
                <TbCircleLetterAFilled size={30}/>
                <Field name="departure">
                  {({ field, meta }) => (
                    <input
                      {...field}
                      type="text"
                      className={`${css.field} ${
                        meta.touched && meta.error ? css.errorField : ""
                      }`}
                      placeholder={t.booking.from}
                    />
                  )}
                </Field>
                <ErrorMessage name="departure" className={css.error} component="div" />
              </div>            
            </label>

            {/* Destination */}
            <label className={css.label}>
              <div>
                <TbCircleLetterBFilled size={30}/>
                <Field name="destination">
                  {({ field, meta }) => (
                    <input
                      {...field}
                      type="text"
                      className={`${css.field} ${
                        meta.touched && meta.error ? css.errorField : ""
                      }`}
                      placeholder={t.booking.to}
                    />
                  )}
                </Field>
                <ErrorMessage name="destination" className={css.error} component="div" />
              </div>             
            </label>
          
            <div className={css.dateTime}>
            {/* Departure Date & Time */}
            <label className={css.label}>
              <div><IoCalendarClearOutline size={20}/>{t.booking.date}</div>
              <Field name="departureDate">
                {({ field, meta }) => (
                  <input
                    {...field}
                    type="date"
                    className={`${css.field} ${
                      meta.touched && meta.error ? css.errorField : ""
                    }`}
                  />
                )}
              </Field>
              <ErrorMessage name="departureDate" className={css.error} component="div" />
            </label>

            <label className={css.label}>
              <div><AiOutlineClockCircle size={20} />{t.booking.time}</div>
              <div>
              <Field name="departureTime">
                {({ field, meta }) => (
                  <input
                    {...field}
                    type="time"
                    className={`${css.field} ${
                      meta.touched && meta.error ? css.errorField : ""
                    }`}
                  />
                )}
              </Field>
                  <button
                    className={css.bookBtn}
                    type="button"
                    onClick={() => {
                  const now = new Date();
                  setFieldValue(
                    "departureTime",
                    now.toTimeString().slice(0, 5)
                  );
                }}
              >
                {t.booking.now}
              </button>
                <ErrorMessage name="departureTime" className={css.error} component="div" />
              </div>
              </label>
            </div>

            {/* Return ride */}
            <label className={css.returnLabel}>
              <input
                type="checkbox"
                className={css.returnCheckbox}
                checked={values.returnRide}
                onChange={() => setFieldValue("returnRide", !values.returnRide)}
              />
              <span className={css.returnText}>{t.booking.return}</span>
            </label>
          
            <div className={css.dateTime}>
            {values.returnRide && (
              <>
                <label className={css.label}>
                  <div><IoCalendarClearOutline size={20}/>{t.booking.date}</div>
                  <Field name="returnDate">
                    {({ field, meta }) => (
                      <input
                        {...field}
                        type="date"
                        className={`${css.field} ${
                          meta.touched && meta.error ? css.errorField : ""
                        }`}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="returnDate" className={css.error} component="div" />
                </label>
                
                <label className={css.label}>
                  <div><AiOutlineClockCircle size={20}/>{t.booking.time}</div>
                  <Field name="returnTime">
                    {({ field, meta }) => (
                      <input
                        {...field}
                        type="time"
                        className={`${css.field} ${
                          meta.touched && meta.error ? css.errorField : ""
                        }`}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="returnTime" className={css.error} component="div" />
                </label>
              </>
            )}
            </div>

            {/* Passengers */}
          <div>
            <label className={css.label}>
              <div><RxPerson size={20}/>{t.booking.passengers}</div>
              <Field name="adults">
                {({ field, meta }) => (
                  <input
                    {...field}
                    type="number"
                    className={`${css.field} ${
                      meta.touched && meta.error ? css.errorField : ""
                    }`}
                  />
                )}
              </Field>
              <ErrorMessage name="adults" className={css.error} component="div" />
            </label>

            <label className={css.label}>
              <div><RxPerson size={20}/>{t.booking.kids}</div>
              <Field name="kids">
                {({ field, meta }) => (
                  <input
                    {...field}
                    type="number"
                    className={`${css.field} ${
                      meta.touched && meta.error ? css.errorField : ""
                    }`}
                  />
                )}
              </Field>
              <ErrorMessage name="kids" className={css.error} component="div" />
              </label>
            </div>
            
            {/* Baby seats */}
            <label className={css.label}>
              <div>
                {t.booking.babySeat}
                <HashLink smooth to="/#car">{t.booking.gallery}</HashLink>
              </div>
              
              <Field name="babySeats">
                {({ field, meta }) => (
                  <select
                    {...field}
                    className={`${css.field} ${
                      meta.touched && meta.error ? css.errorField : ""
                    }`}
                  >
                    <option value="default">Select</option>
                    <option value="infant">Infant carrier (up to 10 kg)</option>
                    <option value="child">Convertible seat (10–21 kg)</option>
                    <option value="booster">Booster seat (22–36 kg)</option>
                    <option value="no">No need</option>
                  </select>
                )}
              </Field>
              <ErrorMessage name="babySeats" className={css.error} component="div" />
            </label>

            {/* Luggage */}
            <label className={css.label}>
              <div><BsLuggage size={20}/>{t.booking.luggage}</div>
              <Field name="suitcases">
                {({ field, meta }) => (
                  <input
                    {...field}
                    type="number"
                    className={`${css.field} ${
                      meta.touched && meta.error ? css.errorField : ""
                    }`}
                  />
                )}
              </Field>
              <ErrorMessage name="suitcases" className={css.error} component="div" />
            </label>

            {/* Animals */}
            <label className={css.label}>
              <div><MdOutlinePets size={20}/>{t.booking.animals}</div>
              <Field name="animals">
                {({ field, meta }) => (
                  <select
                    {...field}
                    className={`${css.field} ${
                      meta.touched && meta.error ? css.errorField : ""
                    }`}
                  >
                    <option value="no">{t.booking.no}</option>
                    <option value="yes">{t.booking.yes}</option>
                  </select>
                )}
              </Field>
              <ErrorMessage name="animals" className={css.error} component="div" />
            </label>

            <div className={css.dateTime}>
            {values.animals === "yes" && (
              <>
                <label className={css.label}>
                  {t.booking.animalType}
                  <Field name="animalType">
                    {({ field, meta }) => (
                      <input
                        {...field}
                        type="text"
                        className={`${css.field} ${
                          meta.touched && meta.error ? css.errorField : ""
                        }`}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="animalType" className={css.error} component="div" />
                </label>

                <label className={css.label}>
                  {t.booking.animalWeight}
                  <Field name="animalWeight">
                    {({ field, meta }) => (
                      <input
                        {...field}
                        type="number"
                        className={`${css.field} ${
                          meta.touched && meta.error ? css.errorField : ""
                        }`}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="animalWeight" className={css.error} component="div" />
                </label>
              </>
              )}
            </div>

            {/* Comments */}
            <label className={css.label}>
              {t.booking.message}
              <Field name="info">
                {({ field, meta }) => (
                  <textarea
                    {...field}
                    className={`${css.field} ${
                      meta.touched && meta.error ? css.errorField : ""
                    }`}
                    placeholder={t.booking.wishes}
                  />
                )}
              </Field>
              <ErrorMessage name="info" className={css.error} component="div" />
              </label>

            {/* Submit */}
            <button type="submit" className={css.bookBtn}>
              {t.booking.submit}
            </button>
          </Form>
        )}
      </Formik>

      {/* Modal */}
      {isModalOpen && (
        <div className={css.modalOverlay}>
          <div className={css.modal}>
            <h3>Send booking via messenger:</h3>
            <div className={css.messengerRow}>
              <a onClick={() => handleMessengerClick("whatsapp")}>
                <FaWhatsapp size={40} color="#25D366" />
              </a>
              <a onClick={() => handleMessengerClick("viber")}>
                <FaViber size={40} color="#665CAC" />
              </a>
            </div>
            <button className={css.closeBtn} onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookForm;
