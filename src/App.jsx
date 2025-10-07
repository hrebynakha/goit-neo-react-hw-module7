import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Container from "./components/Container/Container";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactForm from "./components/ContactForm/ContactForm";
import AuthForm from "./components/AuthForm/AuthForm";
import {
  selectContactsError,
  selectContactsLoading,
} from "./redux/contactsSlice";
import { selectUser, selectToken } from "./redux/authSlice";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import "./App.css";
import { fetchContacts } from "./redux/contactsOps";

function App() {
  const contactError = useSelector(selectContactsError);
  const loading = useSelector(selectContactsLoading);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchContacts());
    }
  }, [user]);

  return (
    <Container>
      {!user ? (
        <AuthForm />
      ) : (
        <>
          <SearchBox />
          <h1>Phonebook</h1>
          {loading && <Loader />}
          {contactError && <ErrorMessage msg={contactError} />}
          <h2>Contacts</h2>
          <ContactList />
          <h2>Add Contact</h2>
          <ContactForm />
        </>
      )}
      <Toaster />
    </Container>
  );
}

export default App;
