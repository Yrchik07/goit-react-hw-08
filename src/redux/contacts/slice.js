import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { apiAddContact, apiGetContacts, apiRemoveContact } from "./operations";


const INITIAL_STATE = {
  contacts : null,
  isLoading: false,
  isError: false,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: INITIAL_STATE,
  extraReducers: builder => 
    builder
    .addCase(apiGetContacts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contacts = action.payload;
    })
    .addCase(apiAddContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contacts = [...state.contacts, action.payload];
    })
    .addCase(apiRemoveContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload.id
      );
    })

    .addMatcher(
      isAnyOf(
        apiGetContacts.pending,
        apiAddContact.pending,
        apiRemoveContact.pending
      ),
      (state) => {
        state.isLoading = true;
        state.isError = false;
      }
    )
    .addMatcher(
      isAnyOf(
        apiGetContacts.rejected,
        apiAddContact.rejected,
        apiRemoveContact.rejected
      ),
      (state) => {
        state.isLoading = false;
        state.isError = true;
      }
    ),
});

export const contactsReducer = contactsSlice.reducer;
