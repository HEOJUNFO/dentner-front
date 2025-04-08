import { createContext } from 'react';

export const NotiContext = createContext({
  notiCnt: 0,
  setNotiCnt: () => {},
  isModalOpen: false,
  setIsModalOpen: () => {}
});