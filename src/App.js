import './App.css';
import React, { useState, useEffect } from 'react';
import { Form } from 'components/Form/Form';
import { Filter } from 'components/Filter/Filter';
import { Contacts } from 'components/Contacts/Contacts';
import { nanoid } from 'nanoid';
import useLocalStorage from 'hooks/useLocalStorage';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  });

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const findMap = contacts.find(contact => contact.name === name);

    findMap
      ? alert(`${name} is already in contacts!`)
      : setContacts(prevContacts => [...prevContacts, contact]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId),
    );
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
  const visibleContacts = getVisibleContacts();

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  return (
    <div className="App">
      <Form onSubmit={addContact} />
      <Filter value={filter} onChange={changeFilter} />
      <Contacts contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
}

export default App;
