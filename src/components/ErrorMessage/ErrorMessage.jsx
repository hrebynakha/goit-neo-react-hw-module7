import css from "./ErrorMessage.module.css";

const ErrorMessage = ({ msg = "Opps...something going wrong :(" }) => {
  return <div className={css.error}> {msg}</div>;
};

export default ErrorMessage;
