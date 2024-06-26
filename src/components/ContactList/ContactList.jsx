import { useSelector } from 'react-redux';
import Contact from './Contact/Contact';
import css from './ContactList.module.css';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from '../../redux/contacts/selectors';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { selectVisibleContacts } from '../../redux/filters/selectors';
export default function ContactList() {
  const details = useSelector(selectContacts);
  const contactsData = useSelector(selectVisibleContacts);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  return (
    <ul className={css.contactList}>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {Array.isArray(details) &&
        contactsData.map(contact => (
          <Contact key={contact.id} contact={contact} />
        ))}
    </ul>
  );
}
