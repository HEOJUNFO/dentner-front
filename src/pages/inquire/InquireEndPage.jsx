import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const InquirePage = () => {
  return (
    <>
      <section>
        <div className="inquireEnd">
            <h2>의뢰서 저장완료</h2>
            <p>의뢰서 바구니에 저장되었습니다</p>
            <div className='btn'>
                <Link to="" className="btnL">의뢰서 바구니 가기</Link>
                <Link to="" className="btnL">저장된 의뢰서 보기</Link>
                <Link to="/request/public/write" className="btnB">의뢰서 추가 작성하기</Link>
            </div>
        </div>
      </section>
    </>
  );
};

export default InquirePage;
