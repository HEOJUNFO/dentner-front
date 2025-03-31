import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation, useParams, useNavigationType } from 'react-router-dom';

const useNav = () => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const navigationType = useNavigationType();

  const handleNav = (url, params) => {
    navigate(url, { state: { ...params } });
  };

  return { handleNav, state, pathname, params, navigationType, navigate };
};

export default useNav;
