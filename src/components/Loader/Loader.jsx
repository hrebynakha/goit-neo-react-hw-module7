import { ThreeDots } from "react-loader-spinner";
import css from "./Loader.module.css";
const Loader = () => {
  return (
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#f9faf5"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperClass={css.loader}
    />
  );
};

export default Loader;
