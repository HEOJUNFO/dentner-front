import { deleteLaboratoryInterest, getDentalLaboratory, postLaboratoryBlock, postLaboratoryInterest } from '@api/Center';
import sampleProfile from '@assets/images/sample/sample3.png';
import { useNav } from '@components/hooks';
import ModalStore from '@store/ModalStore';
import UserStore from '@store/UserStore';
import { useEffect, useState } from 'react';

const useCenterViewPage = () => {
  const { user } = UserStore();
  const { actions } = ModalStore();
  const { handleNav, params } = useNav();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [id, setId] = useState(null);
  const [isMine, setMine] = useState(false);

  const [isModal2, setIsModal2] = useState(false);

  const [interest, setInterest] = useState(false);
  const [skills, setSkills] = useState([]);
  const [data, setData] = useState({
    aboutUs: '',
    allOnName: '',
    correctName: '',
    employeeCntName: '',
    establishYear: '',
    fixProstheticsName: '',
    imageList: [],
    interestYn: '',
    memberAddress: '',
    memberAreaName: '',
    memberBusinessName: '',
    memberDentistryName: '',
    memberDetailAddress: '',
    memberNo: '',
    memberProfileImage: '',
    oneIntroduction: '',
    registerDt: '',
    removableProstheticsName: '',
  });

  const handleImageError = (e) => {
    e.target.src = sampleProfile;
  };

  // 관심등록
  const handleAddInterest = async () => {
    const r = await postLaboratoryInterest(id);
    const dt = Number(r.data);
    if (Boolean(dt)) {
      setInterest(true);
    }
  };

  // 관심해제
  const handleRemoveInterest = async () => {
    const r = await deleteLaboratoryInterest(id);
    const dt = Number(r.data);
    if (Boolean(dt)) {
      setInterest(false);
    }
  };

  const handleInterestChange = (e) => {
    if (e.target.checked) handleAddInterest();
    else handleRemoveInterest();
  };

  // 치기공소 차단
  const handleAddBlock = async (e) => {
    const r = await postLaboratoryBlock(data.memberNo);

    const { data: dt } = r;
    if (Boolean(Number(dt))) {
      setIsModal2(false);
      actions.setDoneAlert({ isVisible: true, title: t('base.noti'), contents: t('version2_1.text1'), btnName: t('base.confirm') }); // 알림, 차단되었습니다., 확인
      handleNav('/center');
    }
  };

  // 치기공소 상세 조회
  const fetchDentalLaboratory = async () => {
    const r = await getDentalLaboratory(id);

    const { data, statusCode } = r;
    if (data) {
      setData({ ...data });

      if (data?.memberNo === user.memberNo) setMine(true);
      else setMine(false);
    } else {
      alert('탈퇴한 회원입니다.')
      handleNav('/center');
    }
  };

  useEffect(() => {
    if (data.interestYn === 'Y') setInterest(true);
    else setInterest(false);

    let skill = [];
    if (data.fixProstheticsName) skill.push(data.fixProstheticsName);
    if (data.removableProstheticsName) skill.push(data.removableProstheticsName);
    if (data.correctName) skill.push(data.correctName);
    if (data.allOnName) skill.push(data.allOnName);
    if (skill.length > 0)
      setSkills(
        skill
          .join(',')
          ?.split(',')
          .map((el) => ({ name: el }))
      );
  }, [data]);

  useEffect(() => {
    if (!id) return;
    fetchDentalLaboratory();
  }, [id]);

  useEffect(() => {
    if (params?.id) setId(params?.id);
  }, []);

  return { user, data, interest, skills, handleImageError, handleInterestChange, handleAddBlock, isModal2, setIsModal2, isMine };
};

export default useCenterViewPage;
