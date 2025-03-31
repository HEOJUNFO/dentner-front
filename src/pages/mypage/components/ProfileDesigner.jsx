import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pagenation, BaseButton } from '@components/common';
import useBlockCenter from '../hooks/useBlockCenter';

/**
 * 마이페이지 - 프로필 수정하기 - 치자이너인 경우
 * @returns
 */
const ProfileDesigner = () => {
  const { t } = useTranslation();
  const { isLoading, items, total, perPage, currentPage, setCurrentPage, handleImageError } = useBlockCenter();
  return <></>;
};

export default ProfileDesigner;
