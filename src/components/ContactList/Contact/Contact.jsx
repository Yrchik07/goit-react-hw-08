import { useDispatch } from 'react-redux';
import css from '../Contact/Contact.module.css';
import { deleteContact } from '../../../redux/contactsOps';

export default function Contact({contact}) {
  const dispatch = useDispatch();
  const { id, name, number } = contact;

  return (
    <>
      <li className={css.contactItemBox} key={id}>
        <section className={css.contactItem}>
          <p>👤 {name}</p>
          <p>📞 {number}</p>
        </section>
        <section className={css.contactButtonDelete}>
          <button
            className={css.buttonDelete}
            type="button"
            onClick={() => dispatch(deleteContact(id))}
            id={id}
              >
            Delete
          </button>
        </section>
      </li>
    </>
  );
}

