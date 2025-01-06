import { useDispatch, useSelector } from "react-redux";

import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";
import Notification from "../Notification/Notification";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { fetchContacts } from "../../redux/operations";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function getFiltredContacts(contacts, value) {
  const validValue = value.trim().toLowerCase();
  if (validValue === "") return contacts;
  return contacts.filter((contact) =>
    contact.name.toLowerCase().includes(validValue)
  );
}

const ContactList = () => {
  const { error, loading, items } = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const contactsFilter = useSelector(selectNameFilter);
  const filtredContacts = getFiltredContacts(items, contactsFilter);
  return (
    <>
      {loading && <Loader />}
      {error && <ErrorMessage />}

      {filtredContacts.length > 0 ? (
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
        !loading && <Notification />
      )}
    </>
  );
};

export default ContactList;
