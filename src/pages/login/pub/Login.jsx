import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BaseInput, BaseButton } from '@components/common';
import { useLogin } from '../hooks/useLogin';
const Login = () => {
  const { user, handleChange, handleSubmit, params } = useLogin();
  if (user) return <></>;
  return (
    <section className="memberLayout">
      <h2>로그인</h2>
      <article>
        <div className="login">
          <p className="subT">
            반갑습니다.
            <br />
            <strong>DENTNER</strong>를 시작해보세요!
          </p>
          <form>
            <div>
              <BaseInput type="text" value={params?.memberEmail} placeholder="이메일 주소를 입력하세요." onChange={(e) => handleChange('memberEmail', e.target.value)} />
              <BaseInput type="password" value={params?.memberPassword} placeholder="비밀번호를 입력하세요." onChange={(e) => handleChange('memberPassword', e.target.value)} />

              {/* <input type="text" placeholder="이메일 주소를 입력하세요." />
              <input type="password" placeholder="비밀번호를 입력하세요." />
              <p className="errorP" style={{ display: 'block' }}>
                이메일 또는 비밀번호를 잘못 입력했습니다.
                <br />
                입력하신 내용을 다시 확인해주세요.
              </p> */}
            </div>
            <BaseButton type="submit" className="btnB sm" disabled={!params?.memberEmail || !params?.memberPassword} label={'로그인'} onClick={handleSubmit} />
          </form>
          <div className="goFindJoin">
            <Link to="/findId">아이디 찾기</Link>
            <Link to="/findPw">비밀번호 찾기</Link>
            <Link to="/login/join">이메일 회원가입</Link>
          </div>
          <button className="btnW sm">Google로 로그인</button>
        </div>
      </article>
    </section>
  );
};

export default Login;
