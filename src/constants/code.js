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
// 760	환불사유
// 766	가공방법
// 821  재제작사유

// 직업
export const jobs = {
  ko: [
    {
      name: '치과',
      id: 'A',
      value: 'A',
    },
    {
      name: '치과기공소',
      id: 'B',
      value: 'B',
    },
    {
      name: '밀링센터',
      id: 'C',
      value: 'C',
    },
    {
      name: '기타',
      id: 'D',
      value: 'D',
    },
  ],
  en: [
    {
      name: 'Dentistry',
      id: 'A',
      value: 'A',
    },
    {
      name: 'DentalLab',
      id: 'B',
      value: 'B',
    },
    {
      name: 'Milling center',
      id: 'C',
      value: 'C',
    },
    {
      name: 'etc',
      id: 'D',
      value: 'D',
    },
  ],
};

export const notis = {
  ko: [
    {
      name: 'talk_set',
      id: 'A',
      value: 'Y',
    },
    {
      name: 'off',
      id: 'B',
      value: 'N',
    },
  ],
  en: [
    {
      name: 'Messenger notification settings',
      id: 'A',
      value: 'Y',
    },
    {
      name: 'Messenger notifications not set',
      id: 'B',
      value: 'N',
    },
  ],
};

export const apps = {
  ko: [
    {
      name: 'Email',
      id: 'A',
      value: '2',
    },
    {
      name: 'mobile App',
      id: 'B',
      value: '1',
    },
  ],
  en: [
    {
      name: 'Email',
      id: 'A',
      value: '2',
    },
    {
      name: 'mobile App',
      id: 'B',
      value: '1',
    },
  ],
};

export const payUnit = {
  ko: [
    { title: '원화', value: 'A' },
    { title: '달러', value: 'B' },
  ],
  en: [
    { title: 'KRW', value: 'A' },
    { title: 'USD', value: 'B' },
  ],
};

export const paySe = {
  ko: [
    { title: '추가금 있음', value: 'Y' },
    { title: '추가금 없음', value: 'N' },
  ],
  en: [
    { title: 'Additional cost', value: 'Y' },
    { title: 'No additional cost', value: 'N' },
  ],
};

export const mileageChargingStatusFilter = {
  ko: [
    { title: '전체', value: '' },
    { title: '충전내역', value: 'A' },
    { title: '환불내역', value: 'C' },
  ],
  en: [
    { title: '전체', value: '' },
    { title: '충전내역', value: 'A' },
    { title: '환불내역', value: 'C' },
  ],
};

export const mileagePaymentStatusFilter = {
  ko: [
    { title: '전체', value: '' },
    { title: '결제내역', value: 'B' },
    { title: '환불내역', value: 'D' },
  ],
  en: [
    { title: '전체', value: '' },
    { title: '결제내역', value: 'B' },
    { title: '환불내역', value: 'D' },
  ],
};

export const mileageDepositStatusFilter = {
  ko: [
    { title: '전체', value: '' },
    { title: '원화 P(￦)', value: 'A' },
    { title: '달러 P($)', value: 'B' },
  ],
  en: [],
};

export const mileageSettleStatusFilter = {
  ko: [
    { title: '전체', value: '' },
    // { title: '정산요청', value: "N" },
    { title: '정산진행', value: 'A' },
    { title: '정산완료', value: 'B' },
  ],
  en: [],
};
