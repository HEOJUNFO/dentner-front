import React, { useEffect, useRef, useState } from 'react';

const useRequestTimePicker = ({ defaultTime, onSelected, date }) => {
  const [visible, setVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(defaultTime);

  const now = new Date();
  const isToday = date && new Date(date).toDateString() === now.toDateString();

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeValue = `${currentHour < 10 ? `0${currentHour}` : currentHour}:${currentMinute < 30 ? '00' : '30'}`;

  const times = Array.from({ length: 24 * 2 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    const period = hour < 12 ? 'AM' : 'PM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return {
      value: `${hour < 10 ? `0${hour}` : hour}:${minute}`,
      label: `${period} ${displayHour}:${minute}`,
    };
  }).filter((time) => {
    return !isToday || time.value > currentTimeValue;
  });

  const handleClick = (time) => {
    setSelectedTime(time);
    setVisible(false);
    if (onSelected) {
      onSelected(time);
    }
  };

  // useEffect(() => {
  //   console.log('defaultTime', defaultTime);
  //   setSelectedTime(defaultTime);
  // }, [defaultTime]);

  return { visible, setVisible, selectedTime, setSelectedTime, times, handleClick };
};

export default useRequestTimePicker;
