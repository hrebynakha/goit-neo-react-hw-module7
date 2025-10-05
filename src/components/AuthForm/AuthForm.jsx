import MaskedInput from "react-text-mask";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { AiOutlineSafety, AiOutlineUser } from "react-icons/ai";

import { IconContext } from "react-icons";
import toast from "react-hot-toast";

import { loginUser } from "../../redux/authOps";
import css from "./AuthForm.module.css";

const AuthForm = () => {
  const dispatch = useDispatch();
  const onSubmit = async (form) => {
    toast.promise(dispatch(loginUser(form)).unwrap(), {
      loading: "Auth user...",
      success: "Sucess auth user",
      error: "Error auth user",
    });
  };

  const authFormState = {
    initialValues: {
      username: "",
      password: "",
    },
    schema: Yup.object({
      username: Yup.string().min(1).required("Required"),
      password: Yup.string().min(1).required("Required"),
    }),
    submit: (values) => {
      onSubmit(values);
    },
  };

  return (
    <Formik
      initialValues={authFormState.initialValues}
      onSubmit={authFormState.submit}
      validationSchema={authFormState.schema}
    >
      <Form className={css.form}>
        <div className={css.formField}>
          <label htmlFor="username">Username</label>
          <div className={css.inputWrap}>
            <Field
              id="username"
              name="username"
              type="username"
              placeholder="Username"
              autoComplete="on"
            ></Field>
            <IconContext.Provider value={{ className: "icon", size: 25 }}>
              <AiOutlineUser />
            </IconContext.Provider>
          </div>
          <ErrorMessage name="username">
            {(msg) => <div className={css.error}>{msg}</div>}
          </ErrorMessage>
        </div>
        <div className={css.formField}>
          <label htmlFor="password">Password</label>
          <div className={css.inputWrap}>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="on"
            ></Field>
            <IconContext.Provider value={{ className: "icon", size: 25 }}>
              <AiOutlineSafety />
            </IconContext.Provider>
          </div>
          <ErrorMessage name="password">
            {(msg) => <div className={css.error}>{msg}</div>}
          </ErrorMessage>
        </div>
        <button type="submit" className={css.btn}>
          Login
        </button>
      </Form>
    </Formik>
  );
};

export default AuthForm;
