import { useSelector } from "react-redux";

import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";
import Notification from "../Notification/Notification";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

function getFiltredContacts(contacts, value) {
  const validValue = value.trim().toLowerCase();
  if (validValue === "") return contacts;
  return contacts.filter((contact) =>
    contact.name.toLowerCase().includes(validValue)
  );
}

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const contactsFilter = useSelector(selectNameFilter);
  const filtredContacts = getFiltredContacts(contacts, contactsFilter);

  return filtredContacts.length > 0 ? (
    <ul className={css.contacts}>
      {filtredContacts.map((contact) => {
        return (
          <li key={contact.id}>
            <Contact
              id={contact.id}
              name={contact.name}
              number={contact.number}
            />
          </li>
        );
      })}
    </ul>
  ) : (
    <Notification />
  );
};

export default ContactList;
