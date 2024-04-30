import { createSelector } from '@reduxjs/toolkit';
import {selectPhoneBookContacts } from '../contacts/selectors';
export const selectNameFilter = state => state.filters.name;

export const selectVisibleContacts = createSelector(
  [selectPhoneBookContacts, selectNameFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  },
);
