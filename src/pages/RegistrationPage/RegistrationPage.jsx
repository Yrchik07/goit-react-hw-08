import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import css from '../RegistrationPage/RegistrationPage.module.css';
import { useDispatch } from 'react-redux';
import {
  maxCharNameValidation,
  minCharPasswordValidation,
} from '../../utils/constant';
import { apiRegister } from '../../redux/auth/operations';

const registerUserSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required!')
    .max(
      maxCharNameValidation,
      `Your user name must be less than ${maxCharNameValidation} characters!`,
    ),
  email: yup
    .string()
    .required('Email address is required!')
    .email('You must enter valid email address!'),
  password: yup
    .string()
    .required('Password is required!')
    .min(
      minCharPasswordValidation,
      `Your password must be greater than ${minCharPasswordValidation} characters!`,
    ),
});
const formInitialValues = {
  name: '',
  email: '',
  password: '',
};
const RegistrationPage = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    console.log('values: ', values);
    dispatch(apiRegister(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={registerUserSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.contactForm}>
        <label>
          <h2>Register user</h2>
          <span>Name:</span>
          <br />
          <Field type="text" name="name" placeholder="Jon" />
          <ErrorMessage component="p" name="name" />
        </label>
        <br />
        <label>
          <span>Email:</span>
          <br />
          <Field type="email" name="email" placeholder="xxxxx@xx.ua" />
          <ErrorMessage component="p" name="email" />
        </label>
        <br />
        <label>
          <span>Password:</span>
          <br />
          <Field
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <ErrorMessage component="p" name="password" />
        </label>
        <br />

        <button type="submit">Log in</button>
      </Form>
    </Formik>
  );
};

export default RegistrationPage;
