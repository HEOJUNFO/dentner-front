import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { immer } from 'zustand/middleware/immer';

const modalStore = (set, get) => ({
  isLoading: false,
  isAlertPresent: false,
  doneAlert: null,
  callback: null,
  isBlockDoneAlert: false,
  isProgress: false,
  received: 0,

  // getters: {
  //   getFilteredSampleList: () => {
  //     return get().sampleList.filter((item) => item.type === 'sample');
  //   },
  // },

  actions: {
    setLoading: (isVisible) => {
      set({ isLoading: isVisible });
    },
    setProgress: (isVisible) => {
      set({ received: !isVisible ? 0 : get().received, isProgress: isVisible });
    },
    setReceived: (received) => {
      if (received === 100) {
        set({ received: 0, isProgress: false });
      } else {
        set({ received: received, isProgress: true });
      }
    },
    setDoneAlert: ({ isVisible, title, contents, btnName, callback }) => {
      set({ isAlertPresent: isVisible, doneAlert: isVisible ? { title, contents, btnName } : null, callback });
    },
    resetDoneAlert: () => {
      set({ isAlertPresent: false, doneAlert: null });
    },
    resetCallback: () => {
      set({ callback: null });
    },
    setBlockDoneAlert: (isVisible) => {
      set({ isAlertPresent: isVisible, isBlockDoneAlert: isVisible });
    },
  },
});

const store = immer((set, get) => modalStore(set, get));
export default create(devtools(store), { name: 'ModalStore' });
