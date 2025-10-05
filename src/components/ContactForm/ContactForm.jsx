import MaskedInput from "react-text-mask";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { IconContext } from "react-icons";
import toast from "react-hot-toast";

import { addContact } from "../../redux/contactsOps";
import css from "./ContactForm.module.css";

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate() - 1).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const ContactForm = () => {
  const dispatch = useDispatch();
  const onSubmit = async (contact) => {
    toast.promise(dispatch(addContact(contact)).unwrap(), {
      loading: "Adding contact...",
      success: (data) => `Successfully added ${data.name}`,
      error: "Error when fetching",
    });
  };

  const contactForm = {
    initialValues: {
      firstName: "Test",
      lastName: "Test",
      email: "test@mail.com",
      phone: "+380501234567",
      birthday: getCurrentDate(),
      description: "Desc",
    },
    schema: Yup.object({
      firstName: Yup.string()
        .min(3, "too short")
        .max(30, "Must be 30 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .min(3, "too short")
        .max(30, "Must be 30 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      phone: Yup.string()
        .required("Required")
        .matches(/\+\d{12}$/, "Number format must be +XXXXXXXXXX"),
      birthday: Yup.date().required("Required"),
      description: Yup.string().max(100, "Must be 100 characters or less"),
    }),
    submit: (values) => {
      onSubmit(values);
    },
  };

  return (
    <Formik
      initialValues={contactForm.initialValues}
      onSubmit={contactForm.submit}
      validationSchema={contactForm.schema}
    >
      {({ values, setFieldValue }) => (
        <Form className={css.form}>
          <div className={css.nameWrap}>
            <div className={css.formField}>
              <label htmlFor="firstName">First Name</label>
              <div className={css.inputWrap}>
                <Field
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                ></Field>
                <IconContext.Provider value={{ className: "icon", size: 25 }}>
                  <AiOutlineUser />
                </IconContext.Provider>
              </div>
              <ErrorMessage name="firstName">
                {(msg) => <div className={css.error}>{msg}</div>}
              </ErrorMessage>
            </div>
            <div className={css.formField}>
              <label htmlFor="lastName">Last Name</label>
              <div className={css.inputWrap}>
                <Field
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                ></Field>
                <IconContext.Provider value={{ className: "icon", size: 25 }}>
                  <AiOutlineUser />
                </IconContext.Provider>
              </div>
              <ErrorMessage name="firstName">
                {(msg) => <div className={css.error}>{msg}</div>}
              </ErrorMessage>
            </div>
          </div>
          <div className={css.formField}>
            <label htmlFor="email">Email</label>
            <div className={css.inputWrap}>
              <Field
                id="email"
                name="email"
                placeholder="email@example.com"
              ></Field>
              <IconContext.Provider value={{ className: "icon", size: 25 }}>
                <AiOutlineUser />
              </IconContext.Provider>
            </div>
            <ErrorMessage name="email">
              {(msg) => <div className={css.error}>{msg}</div>}
            </ErrorMessage>
          </div>
          <div className={css.formField}>
            <label htmlFor="phone">Phone</label>
            <div className={css.inputWrap}>
              <MaskedInput
                mask={[/\+/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]} 
                placeholder="+XXXXXXXXXX"
                value={values.phone}
                id="phone"
                onChange={(e) => {
                  setFieldValue("phone", e.target.value);
                }}
              />
              <IconContext.Provider value={{ className: "icon", size: 25 }}>
                <AiOutlinePhone />
              </IconContext.Provider>
            </div>
            <ErrorMessage name="phone">
              {(msg) => <div className={css.error}>{msg}</div>}
            </ErrorMessage>
          </div>
          <div className={css.formField}>
            <label htmlFor="birthday">Birthday</label>
            <div className={css.inputWrap}>
              <Field
                id="birthday"
                name="birthday"
                placeholder="YYYY-MM-DD"
              ></Field>
              <IconContext.Provider value={{ className: "icon", size: 25 }}>
                <AiOutlineUser />
              </IconContext.Provider>
            </div>
            <ErrorMessage name="birthday">
              {(msg) => <div className={css.error}>{msg}</div>}
            </ErrorMessage>
          </div>
          <div className={css.formField}>
            <label htmlFor="description">Description</label>
            <div className={css.inputWrap}>
              <Field
                id="description"
                name="description"
                placeholder="Description"
                type="text"
              ></Field>
              <IconContext.Provider value={{ className: "icon", size: 25 }}>
                <AiOutlineUser />
              </IconContext.Provider>
            </div>
            <ErrorMessage name="description">
              {(msg) => <div className={css.error}>{msg}</div>}
            </ErrorMessage>
          </div>

          <button type="submit" className={css.btn}>
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
