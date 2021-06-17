import React, { useRef } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Redirect } from 'react-router';
import { useLoggedInUserState } from '../state/userState';

const IS_LOGGED_IN = gql`
  query me {
    me {
      id
      username
    }
  }
`;
const REFRESH_TOKEN_MUTATION = gql`
  mutation refreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      error
      message
      accessToken
      refreshToken
    }
  }
`;

// cases
// accessToken is present -> data.me will be fetched user will be logged in directly
// accessToken is not present or is expired -> refreshToken will be used to get new access token
// and both accessToken and refreshToken will be renewed in localStorage
// if new refreshToken generated, it will invalidate other refresh tokens
// in that case if we have accessToken then we will login
// when accessToken gets expired then this refresh token will not work
// so while accessing refreshToken and accessToken from response
// we will get null for both
// refreshToken will be null if refresh token is invalid
// so upon page refresh user will be redirected to login page

const IsAuthenticated = ({ children }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  const [refreshToken] = useMutation(REFRESH_TOKEN_MUTATION);
  const requestMadeForRefreshingToken = useRef(false);
  const { setLoggedInUser } = useLoggedInUserState();
  if (loading) {
    return <p>Loading</p>;
  } else if (error || !data || !data.me) {
    const localRefreshToken = localStorage.getItem('refreshToken');
    // console.log(localRefreshToken);
    if (localRefreshToken && localRefreshToken !== 'null') {
      if (!requestMadeForRefreshingToken.current) {
        requestMadeForRefreshingToken.current = true;
        refreshToken({
          variables: {
            refreshToken: localRefreshToken,
          },
        }).then((response) => {
          console.log(response);

          localStorage.setItem(
            'accessToken',
            response.data.refreshToken.accessToken
            // accessToken will be null if refresh token is invalid
          );
          localStorage.setItem(
            'refreshToken',
            response.data.refreshToken.refreshToken
            // refreshToken will be null if refresh token is invalid
            // so upon page refresh user will be redirected to login page
          );
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        });
      }

      return <p>Renewing access token</p>;
    } else {
      return <Redirect to={{ pathname: '/login' }} />;
    }
  }
  setLoggedInUser(data.me);
  return <>{children}</>;
};
export default IsAuthenticated;
