import dayjs from 'dayjs';

export const dateFormat = (date) => {
  return dayjs(date || new Date()).format('YYYY.MM.DD');
};

export const dateFormatUse = (date, format) => {
  return dayjs(date || new Date()).format(format);
};

export const getDate = () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
};

export const getTodayFormat = (format) => {
  return dayjs().format(format);
};

export const getTodayAdd = (add, format) => {
  return dayjs().add(add, 'month').format(format);
};

export const getTodaySubstract = (sub, format) => {
  return dayjs().subtract(sub, 'month').format(format)
}

export const timeFormat = (date) => {
  return dayjs(date || new Date()).format('HH:mm');
}