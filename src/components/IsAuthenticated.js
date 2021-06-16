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
          );
          localStorage.setItem(
            'refreshToken',
            response.data.refreshToken.refreshToken
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
