import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { immer } from 'zustand/middleware/immer';

const codeStore = (set, get) => ({
  codeList: [], // [{name:705, value:[]}]
  pageItems: {},

  sampleList: [],
  sampleItem: null,

  getters: {
    getFilterCode: (name) => {
      return get().codeList.find((code) => code.name === name);
    },
    getFilterPageItem: (name) => {
      return get().pageItems[name];
    },

    getFilteredSampleList: () => {
      return get().sampleList.filter((item) => item.type === 'sample');
    },
  },

  actions: {
    setCodeInit: (code) => {
      set({ codeList: code });
    },
    setCodeList: (code) => {
      set({ codeList: [...get().codeList, code] });
    },
    setPageItems: (k, v) => {
      set({ pageItems: { ...get().pageItems, [k]: v } });
    },

    ///////////////////////////////////END
    setSampleList: (list) => {
      set({ sampleList: list });
    },

    updateSampleItemType: (index, type) => {
      set((state) => {
        state.sampleList[index].type = type;
      });
    },
  },
});

const store = immer((set, get) => codeStore(set, get));
export default create(devtools(store), { name: 'CodeStore' });
