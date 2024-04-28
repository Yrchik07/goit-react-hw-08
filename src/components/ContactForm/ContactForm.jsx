import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import {
  formInitialValues,
  maxCharNameValidation,
  maxCharNumberValidation,
  minCharNameValidation,
  minCharNumberValidation,
} from '../../utils/constant';

import css from '../ContactForm/ContactForm.module.css';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addContact } from '../../redux/contactsOps';

const ContactFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('User name is required!')
    .min(
      minCharNameValidation,
      `Your user name must be greater than ${minCharNameValidation} characters!`,
    )
    .max(
      maxCharNameValidation,
      `Your user name must be less than ${maxCharNameValidation} characters!`,
    ),
  number: yup
    .string()
    .required('Phone number is required!')
    .min(
      minCharNumberValidation,
      `Your phone number must be greater than ${minCharNumberValidation} characters!`,
    )
    .max(
      maxCharNumberValidation,
      `Your phone number must be less than ${maxCharNumberValidation} characters long!`,
    ),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    values.id = nanoid();
    dispatch(addContact(values));
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={ContactFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.contactForm}>
        <label>
          <span>Name</span>
          <br />
          <Field type="text" name="name" />
          <ErrorMessage component="p" name="name" />
        </label>
        <br />
        <label>
          <span>Number</span>
          <br />
          <Field type="text" name="number" />
          <ErrorMessage component="p" name="number" />
        </label>
        <br />

        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}

