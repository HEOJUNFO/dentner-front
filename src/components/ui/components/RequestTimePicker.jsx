import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useRequestTimePicker from '@components/hooks/useRequestTimePicker';

const RequestTimePicker = ({ id, defaultTime, onSelected, date }) => {
  const { visible, setVisible, selectedTime, setSelectedTime, times, handleClick } = useRequestTimePicker({ defaultTime, onSelected, date });

  return (
    <>
      <input type="text" value={selectedTime} readOnly onClick={() => setVisible(!visible)} />
      {visible && (
        <div className="pTimeChoice" style={{ display: 'flex' }}>
          <div className="back">
            <strong>AM 오전</strong>
            <div>
              {times
                .filter((time) => time.label.startsWith('AM'))
                .map((time) => (
                  <span key={time.value}>
                    <input type="radio" name="time" value={time.value} checked={selectedTime === time.value} onChange={() => handleClick(time.value)} />
                    <label onClick={() => handleClick(time.value)}>{time.label.split(' ')[1]}</label>
                  </span>
                ))}
            </div>
          </div>
          <div className="back">
            <strong>PM 오후</strong>
            <div>
              {times
                .filter((time) => time.label.startsWith('PM'))
                .map((time) => (
                  <span key={time.value}>
                    <input type="radio" name="time" value={time.value} checked={selectedTime === time.value} onChange={() => handleClick(time.value)} />
                    <label onClick={() => handleClick(time.value)}>{time.label.split(' ')[1]}</label>
                  </span>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

RequestTimePicker.propTypes = {
  id: PropTypes.string,
  defaultTime: PropTypes.string,
  onSelected: PropTypes.func,
};

RequestTimePicker.defaultProps = {
  defaultTime: '',
};

export default RequestTimePicker;
