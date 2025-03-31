import React, { useEffect, useState } from 'react';
import { deleteLaboratoryInterest, postLaboratoryBlock } from '@api/Center';
import { getMypageInterest } from '@api/Mypage';
import ModalStore from '@store/ModalStore';

const useInterestedCenter = () => {
  const { actions } = ModalStore();

  const [isLoading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [params, setParams] = useState({
    // memberAreaFilter: '',
    // fixProstheticsFilter: '',
    // removableProstheticsFilter: '',
    // correctFilter: '',
    // allOnFilter: '',
    // interestFilter: 'Y',
    // latestFilter: 'Y',
    // keyword: '',
    startRow: 0,
    pageCnt: perPage,
  });

  const [isModal2, setIsModal2] = useState({ visible: false, value: '' });
  const [isModal3, setIsModal3] = useState({ visible: false, value: '' });

  const moreItems = (item) => {
    return [
      {
        name: '차단하기',
        onClick: () => {
          setIsModal2({ visible: true, value: { onBlock: () => handleAddBlock(item.targetNo) } });
        },
      },
      {
        name: '신고하기',
        onClick: () => {
          setIsModal3({ visible: true, value: { target: { memberNo: item.targetNo, profileImage: item.memberProfileImage, memberName: item.memberDentistryName } } });
        },
      },
    ];
  };

  // 치기공소 차단
  const handleAddBlock = async (memberNo) => {
    const r = await postLaboratoryBlock(memberNo);

    const { data: dt } = r;
    if (Boolean(Number(dt))) {
      setIsModal2({ visible: false, value: null });
      actions.setDoneAlert({ isVisible: true, title: '알림', contents: '차단되었습니다.', btnName: '확인' });
      fetchDentalLaboratories();
    }
  };

  // 관심취소
  const handleRemoveInterest = async (memberNo) => {
    const r = await deleteLaboratoryInterest(memberNo);
    const dt = Number(r.data);
    if (Boolean(dt)) {
      fetchDentalLaboratories();
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
      memberNo: item.targetNo,
      title: item.memberDentistryName,
      contents: item.oneIntroduction,
      img: item.memberProfileImage,
      local: local?.map((el) => ({ name: el })),
      skill: skill,
      detailUrl: `/centerView/${item.targetNo}`,
      moreItems: moreItems(item),
      onRemoveInterest: (e) => handleRemoveInterest(item.targetNo),
      interest: item.interestYn === 'Y' ? true : false,
      menu: 'mypage',
    };
  };

  const fetchDentalLaboratories = async () => {
    const r = await getMypageInterest({ pathValue: 'A', params });
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

  return { isLoading, isModal2, setIsModal2, isModal3, setIsModal3, items, total, perPage, currentPage, setCurrentPage };
};

export default useInterestedCenter;
