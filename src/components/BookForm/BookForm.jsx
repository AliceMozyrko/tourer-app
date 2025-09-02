import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { HashLink } from "react-router-hash-link";

import { TbCircleLetterAFilled, TbCircleLetterBFilled } from "react-icons/tb";
import { IoCalendarClearOutline } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import { RxPerson } from "react-icons/rx";
import { BsLuggage } from "react-icons/bs";
import { MdOutlinePets } from "react-icons/md";
import { PiSeatLight } from "react-icons/pi";

import css from "./BookForm.module.css";

const BookForm = () => {
  const initialValues = {
    departure: "",
    destination: "",
    departureDate: "",
    departureTime: "",
    desirableDate: "",
    desirableTime: "",
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
    pickupSign: "",
    seats: "usual",
  };

  const bookSchema = Yup.object().shape({
    departure: Yup.string().trim().required("Departure is required"),
    destination: Yup.string().trim().required("Destination is required"),
    departureDate: Yup.date().required("Departure date is required"),
    departureTime: Yup.string().required("Departure time is required"),
    desirableDate: Yup.date(),
    desirableTime: Yup.string(),
    returnRide: Yup.boolean(),
    returnDate: Yup.date().when("returnRide", {
      is: true,
      then: Yup.date(),
    }),
    returnTime: Yup.string().when("returnRide", {
      is: true,
      then: Yup.string(),
    }),
    adults: Yup.number()
      .typeError("Enter a number")
      .min(1, "At least 1 adult")
      .required("Number of adults is required"),
    kids: Yup.number()
      .typeError("Enter a number")
      .min(0, "Cannot be negative")
      .required("Number of adults is required"),
    babySeats: Yup.string().nullable().required("Choose a baby seat"),
    suitcases: Yup.number()
      .typeError("Enter a number")
      .min(0, "Cannot be negative")
      .required("Number of suitcases is required"),
    info: Yup.string().max(500, "Too long"),
    animals: Yup.string().oneOf(["yes", "no"]).required(),
    animalType: Yup.string().when("animals", {
      is: "yes",
      then: Yup.string().required("Breed is required"),
    }),
    animalWeight: Yup.number().when("animals", {
      is: "yes",
      then: Yup.number()
        .typeError("Enter a number")
        .required("Weight is required"),
    }),
    pickupSign: Yup.string().max(100, "Too long"),
    seats: Yup.string().oneOf(["usual", "face"]).required(),
  });

  const handleSubmit = (values, options) => {
    console.log(values);
    toast.success("Form submitted!");
    options.resetForm();
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
              <TbCircleLetterAFilled />
              <Field name="departure">
                {({ field, meta }) => (
                  <input
                    {...field}
                    type="text"
                    className={`${css.field} ${
                      meta.touched && meta.error ? css.errorField : ""
                    }`}
                    placeholder="From: address, airport, hotel"
                  />
                )}
              </Field>
              <ErrorMessage name="departure" className={css.error} component="div" />
            </label>

            {/* Destination */}
            <label className={css.label}>
              <TbCircleLetterBFilled />
              <Field name="destination">
                {({ field, meta }) => (
                  <input
                    {...field}
                    type="text"
                    className={`${css.field} ${
                      meta.touched && meta.error ? css.errorField : ""
                    }`}
                    placeholder="To: address, airport, hotel"
                  />
                )}
              </Field>
              <ErrorMessage name="destination" className={css.error} component="div" />
            </label>

            {/* Departure Date & Time */}
            <label className={css.label}>
              <IoCalendarClearOutline /> Ride date
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
              <AiOutlineClockCircle /> Pick-up time
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
                type="button"
                onClick={() => {
                  const now = new Date();
                  setFieldValue(
                    "departureTime",
                    now.toTimeString().slice(0, 5)
                  );
                }}
              >
                Now
              </button>
              <ErrorMessage name="departureTime" className={css.error} component="div" />
            </label>

            {/* Desirable arrival date & time */}
            <label className={css.label}>
              <IoCalendarClearOutline /> Desirable arrival date
              <Field name="desirableDate">
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
              <ErrorMessage name="desirableDate" className={css.error} component="div" />
            </label>

            <label className={css.label}>
              <AiOutlineClockCircle /> Desirable arrival time
              <Field name="desirableTime">
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
              <ErrorMessage name="desirableTime" className={css.error} component="div" />
            </label>

            {/* Return ride */}
            <label className={css.label}>
              Add return ride
              <button
                type="button"
                onClick={() => setFieldValue("returnRide", !values.returnRide)}
              >
                {values.returnRide ? "Remove return" : "Add return"}
              </button>
            </label>

            {values.returnRide && (
              <>
                <label className={css.label}>
                  <IoCalendarClearOutline /> Return date
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
                  <AiOutlineClockCircle /> Return time
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

            {/* Passengers */}
            <label className={css.label}>
              <RxPerson /> Number of passengers 150+ cm
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
              <RxPerson /> Number of passengers up to 150 cm
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

            {/* Baby seats */}
            <label className={css.label}>
              <Field name="babySeats">
                {({ field, meta }) => (
                  <select
                    {...field}
                    className={`${css.field} ${
                      meta.touched && meta.error ? css.errorField : ""
                    }`}
                  >
                    <option value="">--Select a baby seat--</option>
                    <option value="infant">Infant carrier (up to 10 kg)</option>
                    <option value="child">Convertible seat (10–21 kg)</option>
                    <option value="booster">Booster seat (22–36 kg)</option>
                  </select>
                )}
              </Field>
              <ErrorMessage name="babySeats" className={css.error} component="div" />
            </label>

            {/* Luggage */}
            <label className={css.label}>
              <BsLuggage /> Number of suitcases (excluding hand luggage)
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

            {/* Comments */}
            <label className={css.label}>
              Comments
              <Field name="info">
                {({ field, meta }) => (
                  <textarea
                    {...field}
                    className={`${css.field} ${
                      meta.touched && meta.error ? css.errorField : ""
                    }`}
                    placeholder="Any wishes, special needs or tasks"
                  />
                )}
              </Field>
              <ErrorMessage name="info" className={css.error} component="div" />
            </label>

            {/* Animals */}
            <label className={css.label}>
              <MdOutlinePets /> Animals
              <Field name="animals">
                {({ field, meta }) => (
                  <select
                    {...field}
                    className={`${css.field} ${
                      meta.touched && meta.error ? css.errorField : ""
                    }`}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                )}
              </Field>
              <ErrorMessage name="animals" className={css.error} component="div" />
            </label>

            {values.animals === "yes" && (
              <>
                <label className={css.label}>
                  Breed
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
                  Weight (kg)
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

            {/* Pickup sign */}
            <label className={css.label}>
              Pickup sign
              <Field name="pickupSign">
                {({ field, meta }) => (
                  <input
                    {...field}
                    type="text"
                    className={`${css.field} ${
                      meta.touched && meta.error ? css.errorField : ""
                    }`}
                    placeholder="Enter any information you would like to have written on the table"
                  />
                )}
              </Field>
              <ErrorMessage name="pickupSign" className={css.error} component="div" />
            </label>

            {/* Seats */}
            <label className={css.label}>
              <PiSeatLight /> Seats placement
              <HashLink smooth to="/#car">
                (click here to know more)
              </HashLink>
              <Field name="seats">
                {({ field, meta }) => (
                  <select
                    {...field}
                    className={`${css.field} ${
                      meta.touched && meta.error ? css.errorField : ""
                    }`}
                  >
                    <option value="usual">Usual placement</option>
                    <option value="face">Face-to-face</option>
                  </select>
                )}
              </Field>
              <ErrorMessage name="seats" className={css.error} component="div" />
            </label>

            {/* Submit */}
            <button type="submit" className={css.submitBtn}>
              Book
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookForm;
