import React, { useEffect, useRef, useState } from 'react';

const useNotiTalkSetting = ({ onChange }) => {
  const [talkOk, setTalkOk] = useState(false);
  const [params, setParams] = useState({
    memberAlarmAt: { value: 'Y' },
    memberAlarmSe: { value: [] },
  });

  const handleChange = (name, value) => {
    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], value },
    }));
  };

  const handleAlarmSet = (type) => {
    let list = [...params.memberAlarmSe.value]
    if(!list.includes(type)){
      list.push(type)
      handleChange('memberAlarmSe', list)
    } else {
      handleChange('memberAlarmSe', list.filter((e) => e !== type))
    }
  }


  useEffect(() => {
    if (onChange) onChange(params);
  }, [params]);

  return { talkOk, params, handleChange, handleAlarmSet };
};

export default useNotiTalkSetting;
