import React from 'react';
import { BaseButton } from '@components/common';
import { withCommas, dateFormat } from '@utils/common';

const Table = ({ colgroup, head, items = [] }) => {
  return (
    <table>
      {colgroup}

      <thead>{head}</thead>
      <tbody>
        {items}

        {/* <tr>
          <td>
            <em>충전</em>
          </td>
          <td>+ 1,000 P(￦)</td>
          <td>1,000원</td>
          <td>마일리지 충전</td>
          <td>2024.05.01</td>
          <td>
            <BaseButton label={'환불요청'} onClick={() => setIsModal5(true)} />
          </td>
        </tr> */}
        {/* {items.length === 0 && <tr>{empty}</tr>} */}

        {/* <tr>
          <td colSpan={6} className='noList search'>검색 결과가 없습니다.</td>
      </tr>
      <tr>
          <td colSpan={6} className='noList'>충전내역이 없습니다.</td>
      </tr> */}
      </tbody>
    </table>
  );
};

export default Table;
