import React, { useEffect, useState } from 'react';
import { deleteDesignerBlock } from '@api/Designer';
import { getMypageBlock } from '@api/Mypage';
import { useNav, useSnack } from '@components/hooks';
import sampleProfile from '@assets/images/no_user.png';
import { useTranslation } from 'react-i18next';

const useBlockDesigner = () => {
  const { t } = useTranslation();
  const { showSnackbar, showWarnSnackbar } = useSnack();

  const [isLoading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [params, setParams] = useState({
    startRow: 0,
    pageCnt: perPage,
  });

  const moreItems = [
    {
      name: t('disigner.block'),
      onClick: () => {
        setIsModal2(true);
      },
    },
    {
      name: t('disigner.report'),
      onClick: () => {
        setIsModal3(true);
      },
    },
  ];

  const handleImageError = (e) => {
    e.target.src = sampleProfile;
  };

  // 차단해제
  const handleUnblock = async (el) => {
    const r = await deleteDesignerBlock(el?.targetNo);
    if (Boolean(Number(r.data))) {
      fetchDentalLaboratories();
    } else {
      showWarnSnackbar(t('version2_1.text86'));
    }
  };

  const convertItem = (item, idx) => {
    const local = [item.memberAreaName] || [];
    let skill = [];
    if (item.fixProstheticsName) skill.push({ name: item.fixProstheticsName });
    if (item.removableProstheticsName) skill.push({ name: item.removableProstheticsName });
    if (item.correctName) skill.push({ name: item.correctName });
    if (item.allOnName) skill.push({ name: item.allOnName });

    return {
      memberNo: item.memberNo,
      title: item.memberNickName || item.memberDentistryName,
      contents: item.oneIntroduction,
      img: item.memberProfileImage || sampleProfile,
      local: local?.map((el) => ({ name: el })),
      skill: skill,
      detailUrl: `/designer/view/${item.memberNo}`,
      moreItems: moreItems,
      interest: item.interestYn === 'Y' ? true : false,
      menu: 'mypage',
      targetNo: item.targetNo,
    };
  };

  // 차단 치자이너 목록 조회
  const fetchDentalLaboratories = async () => {
    const r = await getMypageBlock({ pathValue: 'B', params });
    const { data, statusCode } = r;
    if (statusCode == 200) {
      const { cnt, list } = data;

      setItems(list.map((el) => convertItem(el)));
      setTotal(cnt);
      setLoading(false);
    }
  };

  useEffect(() => {
    const startRow = (currentPage - 1) * perPage;
    setParams((prevParams) => {
      if (prevParams.startRow !== startRow || prevParams.pageCnt !== perPage) {
        return {
          ...prevParams,
          startRow,
          pageCnt: perPage,
        };
      }
      return prevParams;
    });
  }, [currentPage, perPage]);

  useEffect(() => {
    fetchDentalLaboratories();
  }, [params]);

  return { isLoading, items, total, perPage, currentPage, setCurrentPage, handleImageError, handleUnblock };
};

export default useBlockDesigner;
