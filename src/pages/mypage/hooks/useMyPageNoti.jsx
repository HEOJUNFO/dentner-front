import { getAlarm, putAlarm, putAlarmAll } from '@api/Mypage';
import { useSnack } from '@components/hooks';
import ModalStore from '@store/ModalStore';
import { useEffect, useState } from 'react';
import i18n from "@utils/i18n.js";
import UserStore from "@store/UserStore.js";

const useMyPageNoti = () => {
  const { actions } = ModalStore();
  const { showSnackbar, showWarnSnackbar } = useSnack();
  const [isLoading, setLoading] = useState(true);

  const [items, setItems] = useState([]);

  const { user } = UserStore();

  const fetchAlarm = async () => {
    try {
      const r = await getAlarm({type: i18n.language === 'ko' ? 'A' : 'B'});
      if (r?.data) {
        setItems(r.data);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (alarmCodeNo, e) => {
    try {
      if (e.target.checked) {
        const r = await putAlarm({ alarmCodeNo, state: 'Y' });
        // console.log(r);
      } else {
        const r = await putAlarm({ alarmCodeNo, state: 'N' });
        // console.log(r);
      }
    } catch {
      showWarnSnackbar('네트워크 오류');
    } finally {
      fetchAlarm();
    }
  };

  const handleChangeAll = async (alarmCode, e) => {
    try {
      if (e.target.checked) {
        const r = await putAlarmAll({ alarmCode, state: 'Y' });
        // console.log(r);
      } else {
        const r = await putAlarmAll({ alarmCode, state: 'N' });
        // console.log(r);
      }
    } catch {
      showWarnSnackbar('네트워크 오류');
    } finally {
      fetchAlarm();
    }
  };

  useEffect(() => {
    fetchAlarm();
  }, [i18n.language]);

  // /api/v1/mypage/alarm

  return { isLoading, items, handleChange , handleChangeAll , user};
};

export default useMyPageNoti;
