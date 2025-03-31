import React, { useEffect, useState } from 'react';
import { getEstimateds, postReview } from '@api/Payment';
import { getReview, putMyReview } from '@api/Mypage';
import { useNav, useSnack } from '@components/hooks';
import { strToLength, ratingToMessage } from '@utils/common';
import UserStore from '@store/UserStore';
import { useTranslation } from 'react-i18next';

const useReviewPage = () => {
  const { t, i18n } = useTranslation();

  const { user } = UserStore();
  const { handleNav, params: pathValue, state } = useNav();
  const { showWarnSnackbar, showSnackbar } = useSnack();

  const [id, setId] = useState();
  const [designer, setDesigner] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [params, setParams] = useState({
    reviewCn: { value: '', isRequired: true, error: '', check: 0, success: 0, placeholder: '자세하고 솔직한 리뷰는 다른 의뢰인에게 도움이 됩니다. (최소 5자 이상)', maxLength: 500 },
  });

  const [isLock, setLock] = useState(false);
  const [files, setFiles] = useState([]);
  const [delFiles, setDelFiles] = useState([]); // 삭제된 파일

  useEffect(() => {
    setParams((prev) => {
      const newValue = prev.reviewCn;
      newValue['placeholder'] = t('version2_4.text33');
      return { ...prev, reviewCn: newValue };
    });
  }, [i18n.language]);

  const [avg, setAvg] = useState(5);
  const handleChange = (name, value, success = 0, error = '') => {
    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, success, error },
    }));
  };

  const [isClick, setClick] = useState(false);

  const handleMessage = (value) => {
    // return ratingToMessage(value);

    switch (value) {
      case 0.5:
        // return '마음에 들지 않았어요.';
        return t('version2_4.text40');
      case 1:
        // return '많이 아쉬워요.';
        return t('version2_4.text41');
      case 1.5:
        // return '아쉬워요.';
        return t('version2_4.text42');
      case 2:
        // return '그럭저럭이예요.';
        return t('version2_4.text43');
      case 2.5:
        // return '그럭저럭 괜찮았어요.';
        return t('version2_4.text44');
      case 3:
        // return '아쉬운 부분이 있지만 괜찮았어요!';
        return t('version2_4.text45');
      case 3.5:
        // return '괜찮았어요!';
        return t('version2_4.text46');
      case 4:
        // return '좋았어요!';
        return t('version2_4.text47');
      case 4.5:
        // return '너무 좋았어요!';
        return t('version2_4.text48');
      case 5:
        // return '너무 좋았어요, 감사합니다!';
        return t('version2_4.text49');
      default:
        return '';
    }
  };

  const handleSumbit = async () => {
    if (isLock) return;
    setLock(true);

    try {
      let inProgress = true;
      const formData = new FormData();
      const p = { ...params };
      for (const key in p) {
        const parameter = p[key];
        let isCaught = false;

        if (parameter.error) {
          isCaught = true;
        }

        if (parameter.check === 1 && parameter.success !== 1) {
          isCaught = true;
        }

        if (parameter.isRequired && !isCaught) {
          if (parameter.value === '') {
            isCaught = true;
          }
        }

        if (isCaught) inProgress = false;

        formData.append(key, parameter.value);
      }

      if (!inProgress) return;

      formData.append('reviewRate', avg);

      if (strToLength(params.reviewCn.value) < 5) {
        // showWarnSnackbar('리뷰내용은 5자 이상 작성해주세요.');
        showWarnSnackbar(t('version2_4.text34'));
        return;
      }

      files.forEach((f) => {
        formData.append('images', f.file);
      });

      if (delFiles.length > 0) {
        formData.append('fileDel', delFiles.join(','));
      }

      if (state?.mode === 'modify') {
        const r = await putMyReview({ reviewNo: id, formData });
        const { data } = r;
        if (Number(data) > 0) {
          // showSnackbar('리뷰를 수정했습니다.');
          showSnackbar(t('version2_4.text35'));
          handleNav(-1);
        } else {
          // showWarnSnackbar('리뷰수정 실패');
          showWarnSnackbar(t('version2_4.text36'));
        }
      } else {
        const r = await postReview({ designerId: designer[0].memberNo, requestFormNo: id, formData });
        const { data } = r;
        if (Number(data) > 0) {
          // showSnackbar('리뷰를 작성했습니다.');
          showSnackbar(t('version2_4.text37'));
          handleNav('/payment');
        } else {
          // showWarnSnackbar('리뷰작성 실패');
          showWarnSnackbar(t('version2_4.text36'));
        }
      }
    } catch (e) {
      console.log(e);
      // showWarnSnackbar('리뷰작성 실패');
      showWarnSnackbar(t('version2_4.text36'));
    } finally {
      setLock(false);
    }
  };

  // 선택한 치자이너
  const fetchChoiceEstimated = async () => {
    try {
      const r = await getEstimateds({ pathValue: id, state: 'A', params: { startRow: 0, pageCnt: 10 } });
      // console.log(r);
      const { data, statusCode } = r;
      if (statusCode == 200) {
        const { cnt, list } = data;
        setDesigner(list);
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchReview = async () => {
    try {
      const r = await getReview(id);
      // console.log('fetchReview===============>',r);
      const { data } = r;
      if (data) {
        setAvg(data.reviewRate);
        setDesigner([{ designerProfileImage: data.memberProfileImage, memberNickName: data.memberNickName }]);
        setParams((prev) => ({
          ...prev,
          ['reviewCn']: { ...prev['reviewCn'], value: data.reviewCn },
        }));

        const files = data.fileList?.map((el) => {
          return {
            fileName: el.fileRealName,
            fileSize: el.fileSize,
            type: 'server',
            fileNo: el.fileNo,
            fileUrl: el.fileUrl,
          };
        });
        setFiles(files);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (strToLength(params.reviewCn.value) === 0) {
      setClick(false);
    } else {
      setClick(true);
    }
  }, [params, files]);

  useEffect(() => {
    if (id) {
      if (state?.mode === 'modify') {
        fetchReview();
      } else {
        fetchChoiceEstimated();
      }
    }
  }, [id]);

  useEffect(() => {
    if (pathValue?.id) setId(pathValue?.id);
  }, [pathValue]);

  return { isLoading, error, isClick, files, setFiles, delFiles, setDelFiles, params, handleChange, handleSumbit, handleMessage, designer, avg, setAvg };
};

export default useReviewPage;
