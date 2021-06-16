import React from 'react';
import styles from './Login.module.scss';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { ReactComponent as FBIcon } from '../assets/images/fb.svg';
import CardBox from '../components/shared/CardBox';
import Button from '../components/shared/Button';
const LOGIN_USER_MUTATION = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      error
      message
      accessToken
      refreshToken
    }
  }
`;
// interface LoginValues {
//   email: string;
//   password: string;
// }

const Login = () => {
  const history = useHistory();
  const [login, { error, loading }] = useMutation(LOGIN_USER_MUTATION);
  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email addresss')
      .required('Email Required'),
    password: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Password required'),
  });
  const commonSubmit = async (values) => {
    const response = await login({
      variables: values,
    });
    // console.log(response);
    // console.log(data);
    const accessToken = response.data.loginUser.accessToken;
    const refreshToken = response.data.loginUser.refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return response;
  };
  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    await commonSubmit(values);
    setSubmitting(false);
    history.push('/');
  };
  if (loading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.title}>
          <FBIcon />
        </div>
        <div className={styles.tag}>
          Facebook helps you connect and share with the people in your life.
        </div>
      </div>
      <div className={styles.right}>
        <Button
          btnType="info"
          style={{
            fontSize: '1rem',
            margin: '2rem auto',
          }}
          onClick={async () => {
            await commonSubmit({
              email: 'dummy@gmail.com',
              password: 'dummy',
            });
            history.push('/');
          }}
        >
          Sign In as Dummy user for testing
        </Button>
        <CardBox>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div className={styles.content}>
                <Field name="email" type="text" placeholder="Email address" />
                <ErrorMessage
                  name="email"
                  component={'div'}
                  className={styles.error}
                />

                <Field name="password" type="password" placeholder="Password" />
                <ErrorMessage
                  name="password"
                  component={'div'}
                  className={styles.error}
                />

                <Button type="submit" btnType="blue">
                  Log In
                </Button>
                <div className={styles.forgotPassword}>Forgotten Password?</div>
                <div className={styles.line}></div>
                <Button
                  type="submit"
                  btnType="green"
                  style={{
                    alignSelf: 'center',
                    fontSize: '1rem',
                  }}
                >
                  Create New Account
                </Button>
              </div>
            </Form>
          </Formik>
        </CardBox>
      </div>
    </div>
  );
};
export default Login;
