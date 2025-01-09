import MaskedInput from "react-text-mask";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { IconContext } from "react-icons";
import toast from "react-hot-toast";

import { addContact } from "../../redux/contactsOps";
import css from "./ContactForm.module.css";

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
      name: "",
      number: "",
    },
    schema: Yup.object({
      name: Yup.string()
        .min(3, "too short")
        .max(30, "Must be 30 characters or less")
        .required("Required"),
      number: Yup.string()
        .required("Required")
        .matches(/\d{3}\s\d{2}\s\d{2}$/, "Number format must be XXX XX XX"),
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
          <div className={css.formField}>
            <label htmlFor="name">Name</label>
            <div className={css.inputWrap}>
              <Field id="name" name="name" placeholder="Name"></Field>
              <IconContext.Provider value={{ className: "icon", size: 25 }}>
                <AiOutlineUser />
              </IconContext.Provider>
            </div>
            <ErrorMessage name="name">
              {(msg) => <div className={css.error}>{msg}</div>}
            </ErrorMessage>
          </div>
          <div className={css.formField}>
            <label htmlFor="number">Phone</label>
            <div className={css.inputWrap}>
              <MaskedInput
                mask={[/\d/, /\d/, /\d/, " ", /\d/, /\d/, " ", /\d/, /\d/]}
                placeholder="XXX XX XX"
                value={values.number}
                id="number"
                onChange={(e) => {
                  setFieldValue("number", e.target.value);
                }}
              />
              <IconContext.Provider value={{ className: "icon", size: 25 }}>
                <AiOutlinePhone />
              </IconContext.Provider>
            </div>
            <ErrorMessage name="number">
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
