import { atom, useRecoilState } from 'recoil';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
const loggedInUserState = atom({
  key: 'loggedInUserState',
  default: {
    id: '',
    username: '',
    __typename: '',
  },
});
const LOGOUT_USER_MUTATION = gql`
  mutation logoutUser($refreshToken: String!) {
    logoutUser(refreshToken: $refreshToken) {
      message
      error
    }
  }
`;
export const useLoggedInUserState = () => {
  const history = useHistory();
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [logoutMutaion, { error, loading }] = useMutation(LOGOUT_USER_MUTATION);
  const logoutUser = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await logoutMutaion({
      variables: {
        refreshToken,
      },
    });
    // console.log(response);
    localStorage.setItem('refreshToken', null);
    localStorage.setItem('accessToken', null);
    history.push('/login');
  };

  return {
    loggedInUser,
    setLoggedInUser,
    logoutUser,
  };
};
