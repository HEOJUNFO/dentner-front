import React, { useEffect, useRef, useState } from 'react';
import { useNav, useSnack } from '@components/hooks';
import { postChatRoom } from '@api/Chat';
import { getDentalDesigner } from '@api/Designer';
import { getDentalLaboratory } from '@api/Center';
import { getRequestProfile } from '@api/Request';
import UserStore from '@store/UserStore';

const useChat = () => {
  const { user } = UserStore();
  const { handleNav, params } = useNav();
  const { showSnackbar, showWarnSnackbar } = useSnack();

  const handleRoom = async (targetNo, memberSe, state) => {
    try {
      let _state = { targetNo, targetSe: memberSe, targetType: memberSe };
      if (memberSe === 'C') {
        const r = await getDentalDesigner(targetNo);
        //console.log('aaaaaaa---> ' , r)
        const { data, statusCode } = r;
        if (data) {
          _state = { ..._state, memberNickName: data?.memberNickName, memberProfileImage: data?.memberProfileImage, prostheticsName: data?.prostheticsName, interestYn: data?.interestYn };
        } else {
          _state = { ..._state, memberOutAt:'Y' };
        }
      } else if (memberSe === 'B') {
        const r = await getDentalLaboratory(targetNo);
        const { data, statusCode } = r;
        if (data) {
          _state = { ..._state, memberNickName: data?.memberDentistryName, memberProfileImage: data?.memberProfileImage, memberAreaName: data?.memberAreaName, interestYn: data?.interestYn };
        } else {
          _state = { ..._state, memberOutAt:'Y' };
        }
      } else if (memberSe === 'A') {
        const r = await getRequestProfile(targetNo);
        const { data, statusCode } = r;
        if (data) {
          _state = { ..._state, memberNickName: data?.memberNickName, memberProfileImage: data?.memberProfileImage, swName: data?.memberSwName, swEtc: data?.swEtc, targetNo: data?.memberNo };
        } else {
          _state = { ..._state, memberOutAt:'Y' };
        }
      }

      if (user?.memberSe === 'B') {
        memberSe = 'B';
      } else if (user?.memberSe === 'C') {
        memberSe = 'C';
      }

      const r = await postChatRoom({ targetNo, memberSe });
      if (Number(r?.data) > 0) {
        if (user?.memberSe === 'A') {
          handleNav(`/chat/view/${r.data}`, { ..._state, roomNo: r.data });
        } else if (user?.memberSe === 'B') {
          handleNav(`/centerchat/view/${r.data}`, { ..._state, roomNo: r.data });
        } else if (user?.memberSe === 'C') {
          if (user?.multiProfileCnt === 2) {
            handleNav(`/centerchat/view/${r.data}`, { ..._state, roomNo: r.data });
          } else {
            handleNav(`/designerchat/view/${r.data}`, { ..._state, roomNo: r.data });
          }
        }
      } else {
        showWarnSnackbar('네트워크 오류');
      }
    } catch (e) {}
  };

  return { handleRoom };
};
export default useChat;
