import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  apiGetContacts,
  apiRemoveContact,
} from '../../redux/contacts/operations';
import {
  selectPhoneBookContacts,
  selectPhoneBookIsError,
  selectPhoneBookIsLoading,
} from '../../redux/contacts/selectors';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import AddContactForm from '../../components/AddContactForm/AddContactForm';
import css from '../ContactsPage/ContactsPage.module.css';
const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectPhoneBookIsLoading);
  const isError = useSelector(selectPhoneBookIsError);
  const contacts = useSelector(selectPhoneBookContacts);

  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);

  const onDeleteContact = contacId => {
    dispatch(apiRemoveContact(contacId));
  };

  return (
    <div>
      <h2>Add new contact</h2>
      <AddContactForm />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <ul className={css.contactList}>
        {Array.isArray(contacts) && contacts.length === 0 && (
          <li>You don&apos;t have any added contacts yet!</li>
        )}
        {Array.isArray(contacts) &&
          contacts.map(item => (
            <li key={item.id} className={css.contactItemBox}>
              <section className={css.contactItem}>
                <p>👤 {item.name}</p>
                <p>📞 {item.number}</p>
              </section>
              <section className={css.contactButtonDelete}>
                <button
                  className={css.buttonDelete}
                  onClick={() => onDeleteContact(item.id)}
                  type="button"
                >
                  Delete
                </button>
              </section>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ContactsPage;
