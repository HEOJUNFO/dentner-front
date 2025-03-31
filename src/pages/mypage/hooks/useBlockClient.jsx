import React, { useEffect, useState } from 'react';
import { deleteLaboratoryInterest, deleteLaboratoryBlock } from '@api/Center';
import { getMypageBlock } from '@api/Mypage';
import sampleProfile from '@assets/images/no_user.png';
import { deleteRequestBlock } from '../../../api/Request';

const useBlockClient = () => {
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
      name: '차단하기',
      onClick: () => {
        setIsModal2(true);
      },
    },
    {
      name: '신고하기',
      onClick: () => {
        setIsModal3(true);
      },
    },
  ];

  // 차단해제
  const handleUnblock = async (el) => {
    const r = await deleteRequestBlock(el?.memberNo);
    if (Boolean(Number(r.data))) {
        fetchRequestBlock();
    } else {
      showWarnSnackbar('네트워크 오류');
    }
  };

  const handleImageError = (e) => {
    e.target.src = sampleProfile;
  };

  const convertItem = (item, idx) => {
    // console.log(item);
    const local = [item.memberAreaName] || [];
    let skill = [];
    if (item.fixProstheticsName) skill.push({ name: item.fixProstheticsName });
    if (item.removableProstheticsName) skill.push({ name: item.removableProstheticsName });
    if (item.correctName) skill.push({ name: item.correctName });
    if (item.allOnName) skill.push({ name: item.allOnName });

    return {
      memberNo: item.targetNo,
      title: item.memberNickName,
      contents: item.oneIntroduction,
      img: item.memberProfileImage || sampleProfile,
      local: local?.map((el) => ({ name: el })),
      skill: skill,
      detailUrl: `/centerView/${item.memberNo}`,
      moreItems: moreItems,
      onRemoveInterest: (e) => handleRemoveInterest(item.memberNo),
      interest: item.interestYn === 'Y' ? true : false,
      menu: 'mypage',
    };
  };

  const fetchRequestBlock = async () => {
    const r = await getMypageBlock({ pathValue: 'C', params });
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
    fetchRequestBlock();
  }, [params]);

  return { isLoading, items, total, perPage, currentPage, setCurrentPage, handleImageError, handleUnblock };
};

export default useBlockClient;
