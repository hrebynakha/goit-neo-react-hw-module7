import { useDispatch } from "react-redux";
import { IconContext } from "react-icons";
import toast from "react-hot-toast";
import {
  AiOutlinePhone,
  AiOutlineUser,
  AiOutlineCloseCircle,
} from "react-icons/ai";

import { removeContact } from "../../redux/contactsOps";
import css from "./Contact.module.css";

const Contact = ({ id, name, number, color = "#fff" }) => {
  const dispatch = useDispatch();

  const onDelete = async (contactId) => {
    toast.promise(dispatch(removeContact(contactId)).unwrap(), {
      loading: "Removing contact...",
      success: (data) => `Successfully deleted with ID: ${data.id}`,
      error: "Error fetching data",
    });
  };
  return (
    <div className={css.contact}>
      <div>
        <span className={css.title}>
          <IconContext.Provider value={{ color: color, size: "25px" }}>
            <AiOutlineUser />
          </IconContext.Provider>
          {name}
        </span>

        <span className={css.description}>
          <IconContext.Provider value={{ color: color, size: "25px" }}>
            <AiOutlinePhone />
          </IconContext.Provider>
          {number}
        </span>
      </div>
      <button
        className={css.btn}
        onClick={() => {
          onDelete(id);
        }}
      >
        <IconContext.Provider value={{ color: color, size: "30px" }}>
          <AiOutlineCloseCircle />
        </IconContext.Provider>
      </button>
    </div>
  );
};

export default Contact;
