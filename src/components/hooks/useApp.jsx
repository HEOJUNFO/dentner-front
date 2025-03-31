import { getCommonCode } from '@api/Common';
import CodeStore from '@store/CodeStore';
import UserStore from '@store/UserStore';
import { useEffect, useState } from 'react';
// import { onMessageListener } from '../../../firebase';
import ChannelService from '../../ChannelService';
import { useTranslation } from 'react-i18next';

const useApp = () => {
  const { user } = UserStore();
  const { codeList, actions, getters } = CodeStore();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [login, setLogin] = useState(false);
  const [isChannel, setChannel] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (user) setLogin(true);
    else setLogin(false);
  }, [user]);

  useEffect(() => {
    if (isChannel) {
      if (login) {
        const customerType = user?.memberSe === 'A' ? '의뢰인' : user?.memberSe === 'B' ? '치기공소' : '치자이너';
        const userObject = {
          language: 'ko',
          tags: [],
          profile: {
            email: user?.memberEmail,
            mobileNumber: user?.memberHp,
            name: user?.memberName,
          },
          profileOnce: {
            customerType: customerType,
            registeredAt: user?.registerDt,
          },
          unsubscribeEmail: false,
          unsubscribeTexting: true,
        };

        ChannelService.updateUser(userObject, (e) => {
          console.log(e);
        });
      } else {
        const userObject = {
          language: 'ko',
          tags: [],
          profile: null,
          profileOnce: null,
          unsubscribeEmail: false,
          unsubscribeTexting: true,
        };
        ChannelService.updateUser(userObject);
        // ChannelService.shutdown();
      }
    }
  }, [login, isChannel]);

  // DB 공통코드
  // 1	전화번호
  // 249	GMT
  // 641	은행
  // 704	지역
  // 705	고정성 보철물
  // 706	가철성 보철물
  // 707	교정
  // 708	ALL ON x
  // 709	치과 기공사 수
  // 710	CAD S/W
  // 759	신고사유
  // 760	환불사유(마일리지 충전내역)
  // 766	가공방법
  // 814  환불사유(마일리지 결제내역)
  // 821  재제작사유
  // 910  거래취소요청사유(거래중-의뢰서 수령전)
  // 915  거래취소요청사유(거래중-의뢰서 수령후)
  // 945  팝빌은행
  const code = [710, 704, 709, 759, 760, 821, 641, 910, 915, 945, 814];

  const fetchCode = async () => {
    try {
      const results = await Promise.all(
        code.map(async (el) => {
          const r = await getCommonCode(el, i18n.language);
          const { data } = r;
          return { name: el, value: data };
        })
      );
      actions.setCodeInit(results);
    } catch (error) {
      setError('서버점검');
      console.error('Error fetching codes:', error);
    } finally {
      setLoading(false);
    }
  };

  const useChannel = () => {
    ChannelService.loadScript();

    //3. 부트하기
    ChannelService.boot(
      {
        pluginKey: 'a668ab8d-37a4-451b-bc16-bf8d5740827f',
      },
      () => {
        setChannel(true);
      }
    );
  };

  useEffect(() => {
    useChannel();

    // const initFCM = async () => {
    //   const token = await requestPermissionAndGetToken();
    //   if (token) {
    //     console.log('FCM Token:', token);
    //   }
    // };
    // initFCM();

    // const messageListener = onMessageListener();
    // console.log('messageListener', messageListener);
    // if (messageListener) {
    //   messageListener.then((payload) => {
    //     console.log('Foreground 알림 수신:', payload);
    //   });
    // }
  }, []);

  useEffect(() => {
    fetchCode();
  }, [i18n.language]);

  return { isLoading, error };
};

export default useApp;
