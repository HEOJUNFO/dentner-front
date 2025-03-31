import React, { useEffect, useRef, useState } from 'react';
import { useNav } from '@components/hooks';
import UserStore from '@store/UserStore';
import { putMemberOut } from '@api/Mypage';

export const useJoinEnd = () => {
  const { handleNav, state } = useNav();
  const { user, logout } = UserStore();
  const [memberApprovalSe, setMemberApprovalSe] = useState(null);
  
  const fetchPutMemberOut = async() => {
    const r = await putMemberOut();
    if (Boolean(Number(r.data))) {
      logout();
    }
  }


  useEffect(() => {
    if (!state?.memberApprovalSe) {
      if (!user) handleNav('/');
    } else {

      /**
       * TODO: 회원거절당한 회원 로그인시
       * 첫 진입은 보여주고 회원탈퇴 및 로그아웃 처리
       * 그 이후 로그인 안되도록 일단 처리
       * 추후에 버튼을 누를경우 처리해야할수도있음
       */
      if(state.memberApprovalSe === 'C') {
        fetchPutMemberOut();
      }

      setMemberApprovalSe(state?.memberApprovalSe);
    }
  }, []);

  return { user, memberApprovalSe };
};
