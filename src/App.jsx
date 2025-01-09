import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import Container from "./components/Container/Container";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactForm from "./components/ContactForm/ContactForm";
import { fetchContacts } from "./redux/contactsOps";
import {
  selectContactsError,
  selectContactsLoading,
  selectVisibleContacts,
} from "./redux/contactsSlice";
import Notification from "./components/Notification/Notification";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import "./App.css";

function App() {
  const error = useSelector(selectContactsError);
  const loading = useSelector(selectContactsLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const filtredContacts = useSelector(selectVisibleContacts);

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {loading && <Loader />}
      {error && <ErrorMessage msg={error} />}
      {filtredContacts.length > 0 ? (
        <ContactList contacts={filtredContacts} />
      ) : (
        !loading && <Notification />
      )}
      <Toaster />
    </Container>
  );
}

export default App;
