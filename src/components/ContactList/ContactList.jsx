import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import Notification from "../Notification/Notification";
import {
  selectContactsLoading,
  selectVisibleContacts,
} from "../../redux/contactsSlice";
import css from "./ContactList.module.css";

const ContactList = () => {
  const loading = useSelector(selectContactsLoading);
  const filtredContacts = useSelector(selectVisibleContacts);
  return filtredContacts.length > 0 ? (
    <ul className={css.contacts}>
      {filtredContacts.map((contact) => {
        return (
          <li key={contact.id}>
            <Contact
              id={contact.id}
              name={contact.first_name + " " + contact.last_name}
              number={contact.phone}
            />
          </li>
        );
      })}
    </ul>
  ) : (
    !loading && <Notification />
  );
};

export default ContactList;
