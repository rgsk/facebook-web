import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import styles from './Signup.module.scss';
const CREATE_USER_MUTATION = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      error
      message
      accessToken
      refreshToken
    }
  }
`;

// interface SignupValues {
//   email: string;
//   username: string;
//   password: string;
//   confirmPassword: string;
// }
// interface SignupProps {}
// abe oe fdfsmm
const Signup = () => {
  const history = useHistory();
  const [createUser, { error, loading }] = useMutation(CREATE_USER_MUTATION);
  if (loading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;
  const initialValues = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email addresss')
      .required('Email Required'),
    password: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Password required'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password')],
      'Passwords must match'
    ),
    username: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Userame required'),
  });
  return (
    <div className={styles.signup}>
      <h1>Signup</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const response = await createUser({
            variables: values,
          });
          // console.log(response);
          const accessToken = response.data.createUser.accessToken;
          const refreshToken = response.data.createUser.refreshToken;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          setSubmitting(false);
          history.push('/');
        }}
      >
        <Form>
          <Field name="email" type="text" placeholder="Email" />
          <ErrorMessage name="email" component={'div'} />
          <Field name="username" type="text" placeholder="Username" />
          <ErrorMessage name="username" component={'div'} />
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component={'div'} />
          <Field
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />
          <ErrorMessage name="confirmPassword" component={'div'} />
          <button type="submit">Signup</button>
        </Form>
      </Formik>
    </div>
  );
};
export default Signup;
