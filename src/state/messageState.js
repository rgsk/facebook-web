import { atom, useRecoilState } from 'recoil';
const currentRoomInfoState = atom({
  key: 'currentRoomInfoState',
  default: null,
});
export const useCurrentRoomInfoState = () => {
  const [currentRoomInfo, setCurrentRoomInfo] =
    useRecoilState(currentRoomInfoState);
  return {
    currentRoomInfo,
    setCurrentRoomInfo,
  };
};
