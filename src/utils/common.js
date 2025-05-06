import moment from 'moment';

const checkNull = (str) => {
  if (typeof str == 'undefined' || str == null || str == '') return true;
  else return false;
};

/**
 * 시간 계산
 * @param {*} startDate
 * @param {*} endDate
 * @returns
 */
export const betweenTime = (startDate, endDate) => {
  const startTime = moment(startDate);
  const endTime = moment(endDate);
  return moment.duration(endTime.diff(startTime)).asHours();
};

/**
 * 날짜 포맷
 * @param date
 * @param format
 * @returns
 */
export const formatDate = (date, format) => {
  const momentDate = moment(date);
  return momentDate.format(format) === 'Invalid date' ? '-' : momentDate.format(format);
};

/**
 * 시간 포맷
 * @param totalSeconds
 * @param locale
 * @returns
 */
export const formatTime = (totalSeconds, locale) => {
  if (totalSeconds === '') return '';

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  let formattedTime = null;

  if (locale === 'HH:mm:ss') {
    formattedTime = `${hours ? `${pad(hours)}시 ` : ``}${hours || minutes ? `${pad(minutes)}분 ` : ``}${pad(seconds)}초`;
  } else if (locale === 'mm') {
    formattedTime = `${minutes ? `${pad(minutes)}분 ` : ``}`;
  } else if (locale === 'mm:ss') {
    formattedTime = `${pad(minutes)}:${pad(seconds)}`;
  } else {
    formattedTime = (hours ? pad(hours) + ':' : '') + pad(minutes) + ':' + pad(seconds);
  }

  function pad(value) {
    return value < 10 ? '0' + value : value;
  }
  return formattedTime;
};

/**
 * 금액 포맷
 * @param num
 * @returns
 */
export const withCommas = (num) => {
  num = Number(num);
  return num !== 0 ? `${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : `0`;
};

/**
 * 전화번호 포맷
 * @param {*} str
 * @returns
 */
export const setPhoneBar = (str) => {
  str = str.replace(/[^0-9]/g, '').replace(/(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g, '$1-$2-$3');
  return str;
};

/**
 * 생년월일 검증
 * @param str
 * @returns
 */
export const isValidateDateOfBirth = (str) => {
  const dateRegex = /^\d{4}\d{2}\d{2}$/; //? YYYYMMDD 형식의 정규식
  const dateRegex2 = /^\d{4}-\d{2}-\d{2}$/; //? YYYY-MM-DD 형식의 정규식
  const dateRegex3 = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/; //? 230613 kty YYYYMMDD 각 자리에 유효한 생년월일인지 확인
  const dateRegex4 = /^(19|20)\d{2}-(0[1-9]|1[0-2])-([0-2][1-9]|3[01])$/; //? 230613 kty YYYY-MM-DD 각 자리에 유효한 생년월일인지 확인

  if (dateRegex.test(str) || dateRegex2.test(str)) {
    if (dateRegex3.test(str) || dateRegex4.test(str)) return true;
    else return false;
  }
  return false;
};

/**
 * NULL 검증
 * @param {*} str
 * @returns
 */
export const isValidateIsNull = (str) => {
  return str == null || str == undefined || str.length == 0;
};

/**
 * 이름 검증
 * @param {*} str
 * @returns
 */
export const isValidateName = (str) => {
  const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,8}$/;
  return regex.test(str);
};

/**
 * 전화번호 검증
 * @param str
 * @returns
 */
export const isValidatePhone = (str, type = 1) => {
  console.log(type)
  // 타입이 1이면 내국인(한국), 2이면 외국인
  if (type === 1) {
    // 한국 휴대폰 번호 검증 (기존 로직 유지)
    const koreaRegex = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;
    return koreaRegex.test(str);
  } else {
    // 해외 전화번호 검증 (7-15자리 숫자)
    const foreignRegex = /^\d{7,15}$/;
    return foreignRegex.test(str);
  }
};

/**
 * 사업자번호 검증
 * @param {*} number
 * @returns
 */
export const isValidateBusinessNumber = (number) => {
  if (!number || number.length !== 10) return false;

  const weights = [1, 3, 7, 1, 3, 7, 1, 3, 5, 1];
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += parseInt(number[i], 10) * weights[i];
  }

  const checkSum = sum + Math.floor((parseInt(number[8], 10) * 5) / 10);
  const checkDigit = (10 - (checkSum % 10)) % 10;

  return checkDigit === parseInt(number[9], 10);
};

/**
 * 인증번호 검증
 * @param {*} str
 * @returns
 */
export const isValidateAuthCode = (str) => {
  const regex = /^[0-9]{6}$/;
  return regex.test(str);
};

/**
 * 이메일 검증
 * @param str
 * @returns
 */
export const isValidateEmail = (str) => {
  // 간단한 이메일 유효성 검사를 위한 정규 표현식 사용
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regex.test(str);
};

/**
 * 비밀번호 검증(영어,숫자,특수문자 포함 8자이상)
 * @param password
 * @returns
 */
export const isValidPassword = (str) => {
  let regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return regex.test(str);
};

/**
 * 휴대폰 번호 마스킹
 * @param str
 * @returns
 */
export const maskingPhoneNumber = (str) => {
  return str.replaceAll('-', '').replace(/^(\d{3})(\d{2})(\d{2})(\d{2})(\d{2})$/, '010-$2**-**$4');
};

/**
 * 카드번호 마스킹
 * @param {*} str
 * @returns
 */
export const maskCardNumber = (str) => {
  // 카드번호가 문자열로 되어있는지 확인하고, 숫자만 남기기 위해 공백과 하이픈 제거
  let cardNumber = str.replace(/[\s-]+/g, '');

  // 카드번호의 길이가 16자리인지 확인
  if (cardNumber.length === 16) {
    // 앞 4자리, 마지막 4자리와 중간의 두 그룹을 마스킹
    const firstFour = cardNumber.slice(0, 4);
    const lastFour = cardNumber.slice(-4);
    const maskedSection = '****-****';

    // 마스킹된 카드번호 반환
    return `${firstFour}-${maskedSection}-${lastFour}`;
  } else if (cardNumber.length === 15) {
    // 앞 4자리, 마지막 4자리와 중간의 두 그룹을 마스킹
    const firstFour = cardNumber.slice(0, 4);
    const lastFour = cardNumber.slice(-3);
    const maskedSection = '*******';

    // 마스킹된 카드번호 반환
    return `${firstFour}-${maskedSection}-${lastFour}`;
  } else {
    throw new Error('Invalid card number length');
  }
};

/**
 * 이메일 마스킹
 * @param str
 * @returns
 */
export const maskingEmail = (str) => {
  let originStr = str;
  let emailStr = originStr.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  let strLength;

  if (checkNull(originStr) == true || checkNull(emailStr) == true) {
    return originStr;
  } else {
    strLength = emailStr ? emailStr.toString().split('@')[0].length - 3 : 0;

    // ex1) abcdefg12345@naver.com => ab**********@naver.com
    // return originStr.toString().replace(new RegExp('.(?=.{0,' + strLength + '}@)', 'g'), '*');

    // ex2) abcdefg12345@naver.com => ab**********@nav******
    return originStr
      .toString()
      .replace(new RegExp('.(?=.{0,' + strLength + '}@)', 'g'), '*')
      .replace(/.{6}$/, '******');
  }
};

/**
 * 바이트 계산
 * @param {*} str
 * @returns
 */
export const getByte = (str) => {
  return str
    .split('')
    .map((s) => s.charCodeAt(0))
    .reduce((prev, c) => prev + (c === 10 ? 2 : c >> 7 ? 2 : 1), 0);
};

export const getByteSize = (size) => {
  const byteUnits = ['KB', 'MB', 'GB', 'TB'];

  for (let i = 0; i < byteUnits.length; i++) {
    size = Math.floor(size / 1024);

    if (size < 1024) return size.toFixed(1) + byteUnits[i];
  }
};

// 두자리 수 0추가
export const addZero = (value) => (value.toString().length === 1 ? `0${value}` : value);

// 날짜 포맷
export const dateFormat = (format, date = Date.now()) => {
  const allowForm = date;
  const _date = new Date(allowForm);

  return format.replace(/(yyyy|mm|dd|YY|MM|DD|H|i|s)/g, (t) => {
    switch (t) {
      case 'yyyy':
        return _date.getFullYear();
      case 'YY':
        return addZero((_date.getFullYear() % 100).toFixed(0));
      case 'mm':
        return _date.getMonth() + 1;
      case 'dd':
        return _date.getDate();
      case 'MM':
        return addZero(_date.getMonth() + 1);
      case 'DD':
        return addZero(_date.getDate());
      case 'H':
        return addZero(_date.getHours());
      case 'i':
        return addZero(_date.getMinutes());
      case 's':
        return addZero(_date.getSeconds());
      default:
        return '';
    }
  });
};

// 금액 포맷
export const priceCommaFormat = (price, fx) => {
  if (!price) return '0';
  if (!fx) price = parseInt(price.toFixed());

  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 이름 마스킹
export const nameMaskingFormat = (name) => {
  if (!name) return '';

  return name.replace(/(?<=.{1})./gi, '*');
};

// br변경
export const replaceToBr = (str) => {
  return str && str.replace(/(?:\r\n|\r|\n)/g, '<br />');
};

// str check
export const strToLength = (str) => {
  if (str) return str.toString().trim().length;
  else return 0;
};

// 평점 문구
export const ratingToMessage = (value) => {
  switch (value) {
    case 0.5:
      return '마음에 들지 않았어요.';
    case 1:
      return '많이 아쉬워요.';
    case 1.5:
      return '아쉬워요.';
    case 2:
      return '그럭저럭이예요.';
    case 2.5:
      return '그럭저럭 괜찮았어요.';
    case 3:
      return '아쉬운 부분이 있지만 괜찮았어요!';
    case 3.5:
      return '괜찮았어요!';
    case 4:
      return '좋았어요!';
    case 4.5:
      return '너무 좋았어요!';
    case 5:
      return '너무 좋았어요, 감사합니다!';
    default:
      return '';
  }
};

/**
 * 닉네임 검증(영어,숫자,특수문자 포함 2~10자이상)
 * @param 닉네임
 * @returns
 */
export const isValidNickName = (str) => {
  const regex = /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,10}$/;
  return regex.test(str);
};
