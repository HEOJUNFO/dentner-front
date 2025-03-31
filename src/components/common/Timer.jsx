import React, { useState, useEffect } from 'react';

/**
 * 사용: SMS 인증시
 * @param {*} param0
 * @returns
 */
const Timer = ({ secondsLeft, setSecondsLeft, setTimerEnd }) => {
  useEffect(() => {
    if (secondsLeft <= 0) return setTimerEnd(true);

    setTimerEnd(false);
    const intervalId = setInterval(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const pad = (num) => num.toString().padStart(2, '0');

  return (
    <em>
      {pad(minutes)}:{pad(seconds)}
    </em>
  );
};

export default Timer;
