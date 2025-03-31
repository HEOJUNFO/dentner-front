import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import { getMonth, getYear } from 'date-fns';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

const BaseDatePicker = ({ minDate, value, locale, onChange, dateFormat }) => {
  //showYearDropdown showMonthDropdown dropdownMode="select"
  const YEARS = Array.from({ length: 2 }, (_, i) => getYear(new Date()) + 1 - i);
  const MONTHS = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    ko: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  };

  return (
    <DatePicker
      minDate={minDate}
      selected={value}
      locale={locale}
      onChange={onChange}
      dateFormat={dateFormat}
      onFocus={(e) => e.target.blur()}
      shouldCloseOnSelect
      // showYearDropdown
      // showMonthDropdown
      // dropdownMode="select"
      renderCustomHeader={({ date, changeYear, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
        <div>
          <div>
            <span>{MONTHS[locale.code][getMonth(date)]}</span>
            <select value={getYear(date)} onChange={({ target: { value } }) => changeYear(+value)}>
              {YEARS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select> 
          </div>
          <div>
            <button type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {/* <LeftArrow fill="#ffffff" /> */}
            </button>
            <button type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {/* <RightArrow fill="#ffffff" /> */}
            </button>
          </div>
        </div>
      )}
    />
  );
};

BaseDatePicker.propTypes = {
  minDate: PropTypes.instanceOf(Date),
  value: PropTypes.instanceOf(Date),
  locale: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  dateFormat: PropTypes.string,
};

BaseDatePicker.defaultProps = {
  minDate: new Date(),
  value: new Date(),
  locale: ko,
  dateFormat: 'yy.MM.dd.eee',
};

export default BaseDatePicker;
