// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import * as yup from 'yup';
// import { useDispatch } from 'react-redux';
// import css from '../LoginPage/LoginPage.module.css';
// import { minCharPasswordValidation } from '../../utils/constant';
// import { apiLogin } from '../../redux/auth/operations';

// const loginUserSchema = yup.object().shape({
//   email: yup
//     .string()
//     .required("Email address is required!")
//     .email("You must enter valid email address!"),
//     password: yup
//     .string()
//     .required("Password is required!")
//     .min(
//       minCharPasswordValidation,
//       `Your password must be greater than ${minCharPasswordValidation} characters!`,
//     ),
// });
// const formInitialValues = {
//   email: "",
//   password: "",
// };

const HomePage = () => {
  //   const dispatch = useDispatch();
  // const handleSubmit = (values, actions) => {
  //   console.log('values: ', values);
  //   dispatch(apiLogin(values));
  //   actions.resetForm();
  // };
  return (
    <div>Hellow</div>
    // <Formik
    //   initialValues={formInitialValues}
    //   validationSchema={loginUserSchema}
    //   onSubmit={handleSubmit}
    // >
    //   <Form className={css.contactForm}>
    //     <label>
    //     <h2>Login user</h2>
    //       <span>Email:</span>
    //       <br />
    //       <Field
    //        type="email"
    //        name="email"
    //        placeholder="xxxxx@xx.ua"/>
    //       <ErrorMessage component="p" name="email" />
    //     </label>
    //     <br />
    //     <label>
    //       <span>Password:</span>
    //       <br />
    //       <Field
    //           type="password"
    //           name="password"
    //           placeholder="Enter your password"
    //           />
    //       <ErrorMessage component="p" name="password" />
    //     </label>
    //     <br />

    //     <button type="submit">Log in</button>
    //   </Form>
    // </Formik>
  );
};
export default HomePage;
