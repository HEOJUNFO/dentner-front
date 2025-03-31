import { create } from 'zustand';
import { devtools, createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import CryptoJS from 'crypto-js';

// 암호화 및 해독 함수
const encryptState = (state) => CryptoJS.AES.encrypt(JSON.stringify(state), `${import.meta.env.VITE_SECRET_KEY}`).toString();
const decryptState = (encryptedState) => {
  const bytes = CryptoJS.AES.decrypt(encryptedState, `${import.meta.env.VITE_SECRET_KEY}`);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// memberSe A 의뢰자 C 치자이너
// memberApprovalSe 승인 구분 (A:신청완료, B:승인, C:거절)
const UserStore = (set, get) => ({
  user: null,
  mileage: 0,
  designerMileage: 0,
  message: false,
  // user: {id:1, name:'test'},
  // getUser: () => get().user,
  permissions: [],
  login: ({ userData, userPermissions }, callback) => {
    set({ user: userData, permissions: userPermissions, mileage: userData.memberMileage, designerMileage: userData.memberMileage });

    if (callback) callback();
  },
  logout: () => set({ user: null, mileage: 0, designerMileage: 0, message: false, permissions: [] }),
  setPhone: (newPhone) => {
    set((state) => {
      state.user = { ...state.user, memberHp: newPhone };
    });
  },
  setMessage: (b) => {
    set((state) => {
      state.message = b;
    });
  },
  setMileage: (newMileage) => {
    set((state) => {
      state.mileage = Number(newMileage);
    });
  },
  setDesignerMileage: (newMileage) => {
    set((state) => {
      state.designerMileage = newMileage;
    });
  },
  setUserData: ({ swNo, swNoName, swEtc, memberNickName, memberProfileImage }) => {
    console.log('setUserData=====>', swNo, swNoName, swEtc, memberNickName);
    set((state) => {
      state.user = { ...state.user, swNo, swNoName, swEtc, memberNickName, memberProfileImage: memberProfileImage || state.user?.memberProfileImage };
    });
  },
});

const store = persist(
  immer((set, get) => UserStore(set, get)),
  {
    name: 'UserStore',
    storage: createJSONStorage(() => localStorage, {  // sessionStorage에서 localStorage로 변경
      reviver: (key, value) => {
        return decryptState(value);
        // return value;
      },
      replacer: (key, value) => {
        return encryptState(value);
        // return value;
      },
    }),
  }
);
export default create(devtools(store));