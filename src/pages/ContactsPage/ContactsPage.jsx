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
      <AddContactForm />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <ul>
        {Array.isArray(contacts) && contacts.length === 0 && (
          <li>You don&apos;t have any added contacts yet!</li>
        )}
        {Array.isArray(contacts) &&
          contacts.map(item => (
            <li key={item.id}>
              <h3>
                Name: {item.name}{' '}
                <button onClick={() => onDeleteContact(item.id)} type="button">
                  ❌
                </button>
              </h3>
              <p>Number: {item.number}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ContactsPage;
