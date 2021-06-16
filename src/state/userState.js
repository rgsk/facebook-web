import { atom, useRecoilState } from 'recoil';
const loggedInUserState = atom({
  key: 'loggedInUserState',
  default: {
    id: '',
    username: '',
    __typename: '',
  },
});
export const useLoggedInUserState = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);

  return {
    loggedInUser,
    setLoggedInUser,
  };
};
