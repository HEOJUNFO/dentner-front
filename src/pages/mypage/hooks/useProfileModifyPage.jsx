import React, { useEffect, useState } from 'react';
import { useNav, useSnack } from '@components/hooks';
import { getMyinfo, putMyinfo, putProfileShowType } from '@api/Mypage';
import { getDentalLaboratory } from '@api/Center';
import { getCommonCode } from '@api/Common';
import { getDupNickname } from '@api/Login';
import { strToLength, isValidNickName } from '@utils/common';
import CodeStore from '@store/CodeStore';
import UserStore from '@store/UserStore';
import ModalStore from '@store/ModalStore';
import { useTranslation } from 'react-i18next';

const useProfileModifyPage = () => {
  const { t, i18n } = useTranslation();

  const { actions: mActions } = ModalStore();
  const { user, setUserData } = UserStore();
  const { codeList, getters, actions } = CodeStore();
  const { handleNav, pathname } = useNav();

  const [isUploadModal, setUploadModal] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const { showSnackbar, showWarnSnackbar } = useSnack();

  // 보철종류
  const codeParentNo = [
    { id: 'fixProstheticsNo', value: '705' },
    { id: 'removableProstheticsNo', value: '706' },
    { id: 'correctNo', value: '707' },
    { id: 'allOnNo', value: '708' },
  ];
  const [prosthesistype, setProsthesistype] = useState({
    fixProstheticsNo: [],
    removableProstheticsNo: [],
    correctNo: [],
    allOnNo: [],
  });

  const [items, setItems] = useState({
    705: { name: 'version2_1.text4', value: [] },
    706: { name: 'version2_1.text5', value: [] },
    707: { name: 'version2_1.text6', value: [] },
    708: { name: 'All on X', value: [] },
  });

  const [region, setRegion] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [years, setYears] = useState([]);

  const [profileImg, setProfileImg] = useState();
  const [data, setData] = useState({
    memberNickName: { value: '', originalValue: '', isRequired: true, error: '', check: 1, success: 0, maxLength: 50, placeholder: '닉네임을 입력하세요.' },
    photo: { value: '', isRequired: false },
    swNo: { value: [], type: 'array', isRequired: true, target: ['A', 'C'] },
    // imageList: { value: [], type: 'array', isRequired: true },
    swEtc: { value: '', isRequired: false, disabled: true },
    memberSe: { value: '', isRequired: true },
    modifyCnt: { value: '', type: 'select', isRequired: false, error: '', check: 0, success: 0, target: ['C'], errorMessage: '수정 가능 횟수를 선택해주세요.' },
    modifyWarrantyDay: { value: '', type: 'select', isRequired: false, error: '', check: 0, success: 0, target: ['C'], errorMessage: '수정 보증 기간을 선택해주세요.' },
    oneIntroduction: {
      value: '',
      isRequired: false,
      error: '',
      check: 0,
      success: 0,
      maxLength: 200,
      placeholder: '한줄소개를 입력해주세요. (최대 200자)',
      target: ['B', 'C'],
      errorMessage: '한줄소개를 입력해주세요.',
    },
    note: {
      value: '',
      isRequired: false,
      error: '',
      check: 0,
      success: 0,
      maxLength: 300,
      placeholder: '참고사항을 입력해주세요. (최대 300자)',
      target: ['C'],
      errorMessage: '참고사항을 입력해주세요.',
    },
    memberAreaNo: { value: '', isRequired: false, error: '', check: 0, success: 0, target: ['B'] },
    employeeCnt: { value: '', isRequired: false, error: '', check: 0, success: 0, target: ['B'] },
    establishYear: { value: '', isRequired: false, error: '', check: 0, success: 0, target: ['B'] },
    aboutUs: { value: '', isRequired: false, error: '', check: 0, success: 0, maxLength: 300, placeholder: '회사 소개를 해주세요. (최대 300자)', target: ['B'] },
    showAt: { value: 'N', isRequired: false, error: '' },
  });
  const [isDupClick, setIsDupClick] = useState(false);
  const [isDollar, setIsDollar] = useState(false);

  useEffect(() => {
    setData((prev) => {
      const memberNickName = prev.memberNickName;
      memberNickName['placeholder'] = t('version2_1.text62');
      memberNickName['error'] = '';

      const modifyCnt = prev.modifyCnt;
      modifyCnt['errorMessage'] = t('version2_4.text80');
      modifyCnt['error'] = '';

      const modifyWarrantyDay = prev.modifyWarrantyDay;
      modifyWarrantyDay['errorMessage'] = t('version2_4.text81');
      modifyWarrantyDay['error'] = '';

      const oneIntroduction = prev.oneIntroduction;
      oneIntroduction['placeholder'] = t('version2_4.text83');
      oneIntroduction['errorMessage'] = t('version2_4.text82');
      oneIntroduction['error'] = '';

      const aboutUs = prev.aboutUs;
      aboutUs['placeholder'] = t('version2_4.text84');
      aboutUs['error'] = '';

      return { ...prev, memberNickName, modifyCnt, modifyWarrantyDay, oneIntroduction, aboutUs };
    });
  }, [i18n.language]);

  const [files, setFiles] = useState([]);
  const [delFiles, setDelFiles] = useState([]); // 삭제된 파일

  const maxFile = 10;
  const fileTypes = ['pdf', 'jpg', 'png', 'zip'];
  const maxSize = 500;

  const [cadfiles, setCadfiles] = useState([]);
  const [stlFiles, setStlFiles] = useState([]);
  const maxCadfilesFile = 10;

  const [isModal, setModal] = useState({ isVisible: false });

  // 포트폴리오 데이터
  const handlePot = (cad) => {
    setCadfiles((prev) => [...prev, ...cad]);
    setUploadModal(false);
  };

  // 포트폴리오 삭제
  const handlePotRemoveFile = (index) => {
    if (cadfiles[index]?.type === 'server') {
      setDelFiles([...(delFiles.length > 0 ? delFiles : []), cadfiles[index].fileNo]);
    }

    const files = cadfiles.filter((el, idx) => idx !== index);
    setCadfiles(files);
  };

  // 3d 상세보기
  const handleThreeDView = (file) => {
    setModal({ isVisible: true, fileList: file?.cadFile });
  };

  //cad 변경
  const handleCheck = (e) => {
    if (e.target.type === 'radio') {
      // 752, 754
      const isEq = ['752', '754'];
      const arr = data.swNo.value.filter((el) => isEq.includes(el));
      const sw = [...arr, e.target.value];
      handleChange('swNo', sw);
    } else {
      if (e.target.checked) {
        if (!data.swNo.value.includes(e.target.value)) {
          const sw = [...data.swNo.value, e.target.value];
          handleChange('swNo', sw);

          if (e.target.id === '754') {
            setData((prev) => ({ ...prev, ['swEtc']: { ...prev['swEtc'], disabled: false } })); //9.2 추가
          }
        }
      } else {
        const sw = data.swNo.value.filter((el) => el != e.target.value);
        handleChange('swNo', sw);
        if (e.target.id === '754') {
          handleChange('swEtc', '');
          setData((prev) => ({ ...prev, ['swEtc']: { ...prev['swEtc'], disabled: true } })); //9.2 추가
        }
      }
    }
  };

  const handleRest = (e) => {
    if (!e.target.checked) {
      const arr = e.target.value.split(',');
      const sw = data.swNo.value.filter((el) => !arr.includes(el));
      handleChange('swNo', sw);
    }
  };

  const handleFilesChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfileImg(reader.result);
      handleChange('photo', file);
    };
  };

  const handleChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, success: 0, error: '' },
    }));
  };

  const handleValidChange = (name, error, value) => {
    let success = 0;
    if (!error) {
      success = 1;
    }

    setData((prev) => ({
      ...prev,
      [name]: { ...prev[name], error, value: value || prev[name].value, success },
    }));
  };

  const handleDupClick = async (e) => {
    try {
      const re = isValidNickName(data.memberNickName.value);
      if (!re) {
        handleValidChange('memberNickName', t('version2_1.text91')); //'닉네임은 2~10자리 영문/숫자/한글 로 입력하세요'
        return;
      }

      const r = await getDupNickname({ memberNickName: data.memberNickName.value });
      const dt = r?.data;

      if (Boolean(Number(dt))) {
        // console.log('중복된 닉네임 입니다');
        handleValidChange('memberNickName', t('version2_1.text92'));
      } else {
        handleValidChange('memberNickName');
      }
    } catch ({ data, message, statusCode }) {
      // handleValidErrorChange('memberNickName', message);
    }
  };

  // 내정보 조회
  const fetchMyInfo = async () => {
    try {
      const r = await getMyinfo();
      const { data } = r;

      if (data) {
        setData((prev) => ({
          ...prev,
          memberNickName: { ...prev['memberNickName'], value: data.memberNickName, originalValue: data.memberNickName, success: 0, error: '' },
          swNo: { ...prev['swNo'], value: data.swNo?.split(',') || [] },
          // imageList: { ...prev['imageList'], value: data.imageList || [] },
          swEtc: { ...prev['swEtc'], value: data.swEtc || '', disabled: data.swEtc ? false : true },
          memberSe: { ...prev['memberSe'], value: data.memberSe },
          modifyCnt: { ...prev['modifyCnt'], isRequired: data.memberSe === 'C' ? true : false, value: data?.modifyCnt },
          modifyWarrantyDay: { ...prev['modifyWarrantyDay'], isRequired: data.memberSe === 'C' ? true : false, value: data?.modifyWarrantyDay },
          oneIntroduction: { ...prev['oneIntroduction'], isRequired: data.memberSe === 'C' ? true : false, value: data?.oneIntroduction },
          note: { ...prev['note'], isRequired: data.memberSe === 'C' ? true : false, value: data?.note },
          showAt: { ...prev['showAt'], value: data?.showAt },
        }));

        if (data?.memberSe === 'B') {
          const center = await fetchDentalLaboratory(data?.memberNo);

          if (center) {
            setData((prev) => ({
              ...prev,
              memberAreaNo: { ...prev['memberAreaNo'], value: data.memberAreaNo, success: 0, error: '' },
              employeeCnt: { ...prev['employeeCnt'], value: data.employeeCnt, success: 0, error: '' },
              aboutUs: { ...prev['aboutUs'], value: center.aboutUs, success: 0, error: '' },
              establishYear: { ...prev['establishYear'], value: center.establishYear, success: 0, error: '' },
            }));

            setProsthesistype({
              fixProstheticsNo: data?.fixProstheticsNo?.split(',') || [],
              removableProstheticsNo: data?.removableProstheticsNo?.split(',') || [],
              correctNo: data?.correctNo?.split(',') || [],
              allOnNo: data?.allOnNo?.split(',') || [],
            });

            const files = center?.imageList?.map((el) => {
              return {
                fileName: el.fileRealName,
                fileSize: el.fileSize,
                type: 'server',
                fileNo: el.fileNo,
                fileUrl: el.fileUrl,
              };
            });
            setFiles(files);
            setProfileImg(center.memberProfileImage);
          }
        } else {
          const files = data?.imageList?.map((el) => {
            return {
              fileName: el.fileRealName,
              fileSize: el.fileSize,
              type: 'server',
              fileNo: el.fileNo,
              fileUrl: el.fileUrl,
            };
          });
          setFiles(files);

          setProfileImg(data.memberProfileImage);

          const cads =
            data?.fileList?.map((el) => {
              return {
                fileName: el.fileRealName,
                fileSize: el.fileSize,
                type: 'server',
                fileNo: el.fileNo,
                fileUrl: el.fileUrl,
                cadFile: el?.cadList,
              };
            }) || [];

          setCadfiles(cads);
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const fileProgress = (p) => {
    mActions.setReceived(p);
  };

  // 수정하기
  const handleSumbit = async () => {
    let inProgress = true;
    let msg = '';
    const p = { ...data };

    const formData = new FormData();

    for (const key in p) {
      if (p[key].error) {
        inProgress = false;
      }

      if (key === 'memberNickName') {
        if (strToLength(p[key].value) === 0) {
          if (!msg) msg = t('version2_1.text62'); // 닉네임을 입력하세요
          handleValidChange(key, p[key].placeholder);
          inProgress = false;
        }

        if (p[key].value !== p[key].originalValue) {
          if (p[key].success !== 1) {
            inProgress = false;
            handleValidChange('memberNickName', t('version2_4.text58')); // 중복 확인해주세요.
          }
        }
      }

      if (p[key].isRequired) {
        if (p[key]?.type === 'array') {
          if (p[key].value.length === 0) {
            if (p[key].target.includes(data.memberSe.value)) {
              if (!msg) msg = t('version2_4.text59'); // '선호CAD S/W를 선택하세요.';
              inProgress = false;
            }
          } else {
            if (key === 'swNo') {
              if (p[key].value.length > 2) {
                if (!msg) msg = t('version2_4.text60'); // '선호CAD S/W는 최대 2개까지 선택가능합니다. ';
                inProgress = false;
              } else {
                // 기타선택시 직접입력 체크
                if (p[key].value.includes('754')) {
                  if (strToLength(p['swEtc'].value) === 0) {
                    if (!msg) msg = t('version2_4.text61'); //'기타 CAD를 입력해주세요.';
                    inProgress = false;
                  }
                }
              }
            }
          }
        } else if (p[key]?.type === 'select') {
          if (p[key].value === 0) {
            inProgress = false;
            if (!msg) msg = p[key]?.errorMessage;
            handleValidChange(key, p[key]?.errorMessage);
          }
        } else {
          if (strToLength(p[key].value) === 0) {
            inProgress = false;

            if (p[key].placeholder) {
              if (!msg) msg = p[key].errorMessage || p[key].placeholder;
              handleValidChange(key, p[key].placeholder);
            }
          }
        }
      } else {
        if (data.memberSe.value === 'B') {
          if (key === 'oneIntroduction') {
            if (strToLength(p['oneIntroduction'].value) === 0) {
              if (!msg) msg = t('version2_4.text62'); // '한줄소개를 입력하세요.';

              handleValidChange(key, p[key].placeholder);
              inProgress = false;
            }
          }

          if (key === 'memberAreaNo') {
            if (strToLength(p['memberAreaNo'].value) === 0) {
              if (!msg) msg = t('version2_4.text63'); // '지역을 선택하세요.';
              inProgress = false;
            }
          }

          if (key === 'employeeCnt') {
            if (strToLength(p['employeeCnt'].value) === 0) {
              if (!msg) msg = t('version2_4.text64'); // '치기공사 수를 선택하세요.';
              inProgress = false;
            }
          }

          if (key === 'establishYear') {
            if (strToLength(p['establishYear'].value) === 0) {
              if (!msg) msg = t('version2_4.text65'); // '설립년도를 선택하세요.';
              inProgress = false;
            }
          }

          if (key === 'aboutUs') {
            if (strToLength(p['aboutUs'].value) === 0) {
              if (!msg) msg = t('version2_4.text66'); // '회사소개를 입력하세요.';
              handleValidChange(key, p[key].placeholder);
              inProgress = false;
            }
          }
        } else if (data.memberSe.value === 'C') {
          if (key === 'oneIntroduction') {
            if (strToLength(p['oneIntroduction'].value) === 0) {
              if (!msg) msg = t('version2_4.text62'); // '한줄소개를 입력하세요.';
              handleValidChange(key, p[key].placeholder);
              inProgress = false;
            }
          }

          if (key === 'note') {
            if (strToLength(p['note'].value) === 0) {
              if (!msg) msg = t('version2_4.text67'); // '참고사항을 입력하세요.';
              handleValidChange(key, p[key].placeholder);
              inProgress = false;
            }
          }
        }
      }

      // if (key === 'marketing') {
      //   formData.append('memberMarketingAt', p[key].value ? 'Y' : 'N');
      // } else {
      // }

      if (p[key].target) {
        if (p[key].target.includes(data.memberSe.value)) {
          formData.append(key, p[key].value);
        }
      } else {
        formData.append(key, p[key].value);
      }
    }

    // 치자이너인 경우
    if (['B', 'C'].includes(user.memberSe)) {
      if (files.length === 0) {
        inProgress = false;
      }

      if (files.length === 0) {
        showWarnSnackbar(t('version2_3.text111'));
        // showWarnSnackbar('첨부파일을 올려주세요.');
        return;
      }
      files.forEach((f) => {
        formData.append('images', f.file);
      });

      //9.2 삭제 파일 추가
      if (delFiles.length > 0) {
        formData.append('fileDel', delFiles.join(','));
      }
    }

    // 3d 포트폴리오 추가
    if (user.memberSe === 'C') {
      const portfolio = [];
      cadfiles
        ?.filter((el) => el?.type === 'local')
        ?.map((f, idx) => {
          const fileOrdr = idx + 1;
          portfolio.push({
            fileTp: 'image',
            fileName: f.newFile.name,
            fileOrgName: f.fileName,
            fileOrdr: fileOrdr,
          });

          f?.cadFile.forEach((c) => {
            portfolio.push({
              fileTp: 'st',
              fileName: c.newFile.name,
              fileOrgName: c.fileName,
              fileOrdr: fileOrdr,
            });
            formData.append('files', c.newFile);
          });
          formData.append('files', f.newFile);
        });

      formData.append('fileList', JSON.stringify(portfolio));
    }

    if (user.memberSe === 'B') {
      let prosthesistypeCheck = 0;
      for (const key in prosthesistype) {
        prosthesistypeCheck += prosthesistype[key]?.length || 0;

        if (prosthesistype[key]?.length || 0 > 0) {
          formData.append(key, prosthesistype[key].join(','));
        }
      }

      if (prosthesistypeCheck === 0) {
        // showWarnSnackbar('보철종류를 선택하세요.');
        showWarnSnackbar(t('version2_4.text25'));
        return;
      }
    }

    if (!inProgress) {
      if (msg) showWarnSnackbar(msg);
      return;
    }

    try {
      mActions.setLoading(true);
      const r = await putMyinfo(formData, fileProgress);
      const { data, statusCode, message } = r;
      // console.log(data);
      if (statusCode === 200) {
        // handleNav('/login/JoinEnd', { memberApprovalSe: 'A' });
        // showSnackbar('수정되었습니다.');
        showSnackbar(t('version2_4.text68'));
        setUserData({ ...data });
        setData((prev) => ({
          ...prev,
          memberNickName: { value: prev.memberNickName, originalValue: prev['memberNickName'].value },
        }));
      } else {
        console.log('error');
      }
    } catch (e) {
      const { data, statusCode, message } = e;
      console.log(e);
    } finally {
      mActions.setLoading(false);
    }
  };

  useEffect(() => {
    if (data.memberNickName.value === '' || data.memberNickName.value === data.memberNickName.originalValue) {
      setIsDupClick(true);
    } else {
      setIsDupClick(false);
    }
  }, [data]);

  const handleItemChange = (name, value) => {
    if (name === '704') {
      setRegion(value);
    } else {
      setItems((prev) => ({
        ...prev,
        [name]: { ...prev[name], value },
      }));
    }
  };

  // 보철종류
  const fetchCode = async (code) => {
    // const gettersCode = getters.getFilterCode(code);
    // if (gettersCode) {
    //   handleItemChange(code, gettersCode.value);
    // } else {
    // }
    const r = await getCommonCode(code, i18n.language);
    const dt = r?.data;
    if (dt) {
      handleItemChange(code, dt);

      actions.setCodeList({ name: code, value: dt });
    }
  };

  const handleProsthesistypeChange = (name, value) => {
    setProsthesistype((prev) => {
      const newValue = [...prev[name]];
      const idx = newValue.findIndex((el) => el === value);

      if (idx === -1) {
        newValue.push(value);
      } else {
        newValue.splice(idx, 1);
      }

      return {
        ...prev,
        [name]: newValue,
      };
    });
  };

  // 치기공소 정보 조회
  const fetchDentalLaboratory = async (id) => {
    try {
      const r = await getDentalLaboratory(id);

      const { data, statusCode } = r;
      if (data) return data;
      else return '';
    } catch (e) {
      return '';
    }
  };

  // 공개 비공개
  const handleChangeShowAt = async (e) => {
    const type = !e.target.checked ? 'N' : 'Y';
    setData((prev) => ({
      ...prev,
      showAt: { ...prev['showAt'], value: type },
    }));
    const r = await putProfileShowType({ type, memberSe: user.memberSe });
    if (Number(r.data) > 0) {
      showSnackbar(`${t('version2_4.text69')} ${type === 'Y' ? t('base.public') : t('base.private')} ${t('version2_4.text70')}`);
      // showSnackbar(`프로필 ${type === 'Y' ? '공개' : '비공개'} 처리 되었습니다.`);
    } else {
      // showWarnSnackbar('프로필 공개 여부 오류');
      showWarnSnackbar(t('version2_4.text29'));
    }
  };

  useEffect(() => {
    fetchMyInfo();

    const currentYear = new Date().getFullYear();
    const y = [];
    for (let year = currentYear; year >= currentYear - 79; year--) {
      y.push({ name: year.toString(), value: year.toString() });
    }
    setYears(y);

    // 치기공사 수
    const emp = getters.getFilterCode(709);
    setEmployees(emp?.value);
  }, [user]);

  useEffect(() => {
    // 지역
    fetchCode('704');
    // 보철종류
    for (let i in codeParentNo) {
      fetchCode(codeParentNo[i].value);
    }
  }, [i18n.language]);

  return {
    isLoading,
    data,
    profileImg,
    isDupClick,
    isDollar,
    setIsDollar,
    handleCheck,
    handleRest,
    handleFilesChange,
    handleChange,
    handleDupClick,
    handleSumbit,
    maxFile,
    fileTypes,
    maxSize,
    files,
    setFiles,
    delFiles,
    setDelFiles,
    codeParentNo,
    items,
    handleProsthesistypeChange,
    prosthesistype,
    region,
    employees,
    years,
    handleChangeShowAt,
    isUploadModal,
    setUploadModal,
    maxCadfilesFile,
    cadfiles,
    setCadfiles,
    stlFiles,
    setStlFiles,
    handlePot,
    handlePotRemoveFile,
    isModal,
    setModal,
    handleThreeDView,
  };
};

export default useProfileModifyPage;
