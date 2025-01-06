import { ToastContainer } from "react-toastify";

import Container from "./components/Container/Container";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactForm from "./components/ContactForm/ContactForm";
import "./App.css";

function App() {
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
      <ToastContainer />
    </Container>
  );
}

export default App;
