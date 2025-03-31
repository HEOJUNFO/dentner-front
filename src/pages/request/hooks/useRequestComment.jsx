import React, { useEffect, useRef, useState } from 'react';
import UserStore from '@store/UserStore';
import { postRequestFormReply, getRequestFormReply, deleteRequestFormReply, putRequestFormReply } from '@api/Request';
import { useNav, useSnack } from '@components/hooks';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export const useRequestComment = ({ replyList = [] }) => {
  const { t, i18n } = useTranslation();
  const { user } = UserStore();
  const { pathname } = useLocation();
  const { showSnackbar, showWarnSnackbar } = useSnack();

  const [isLoading, setLoading] = useState(true);
  const [isLock, setLock] = useState(false);
  const [items, setItems] = useState([]);
  const [params, setParams] = useState({
    //requestFormNo: { value: '', isRequired: true, error: '' },
    answerCn: { value: '', isRequired: true, error: '', check: 0, success: 0, placeholder: '댓글을 작성하세요.', maxLength: 500, emptyMessage: '댓글을 작성하세요.' },
    parentAnswerNo: { value: '0', isRequired: true, error: '' },
  });

  useEffect(() => {
    setParams((prev) => {
      const newValue = prev.answerCn;
      newValue['placeholder'] = t('version2_4.text20');
      newValue['emptyMessage'] = t('version2_4.text20');
      return { ...prev, answerCn: newValue };
    });
  }, [i18n.language]);

  // 신고관련
  const [isModal, setIsModal] = useState(false); //신고모달
  const [report, setReport] = useState({});

  const [isDeleteModal, setDeleteModal] = useState({
    visible: false,
    value: '',
  });

  const handleChange = (name, value, success = 0, error = '') => {
    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, success, error },
    }));
  };

  const handleValidChange = (name, error) => {
    let success = 0;
    if (!error) {
      success = 1;
    }

    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], error, success },
    }));
  };

  const handleSumbit = async (requestFormNo) => {
    if (isLock) return;
    setLock(true);
    let inProgress = true;
    const p = { ...params };
    const parameters = {};
    for (const key in p) {
      if (p[key].error) {
        inProgress = false;
      }

      if (p[key].isRequired) {
        if (p[key].value === '') {
          inProgress = false;
          if (p[key].placeholder || p[key].emptyMessage) {
            // alert('값없음');
            showWarnSnackbar(p[key].placeholder || p[key].emptyMessage);
            // handleValidChange(key, p[key].emptyMessage || p[key].placeholder);
          }
        }
      }
      parameters[key] = p[key].value;
    }

    if (inProgress && requestFormNo && !isLock) {
      try {
        const r = await postRequestFormReply({ ...parameters, requestFormNo, url: pathname });

        const { data } = r;
        if (Boolean(Number(data))) {
          handleChange('answerCn', '');
          fetchRequestFormReply(requestFormNo);
        }
      } catch (e) {
      } finally {
        setLock(false);
      }
    }
  };

  const fetchDelete = async (el) => {
    const { requestFormNo, requestFormAnswerNo } = el;
    let inProgress = true;
    if (inProgress && requestFormAnswerNo) {
      const r = await deleteRequestFormReply({ requestFormAnswerNo });
      // console.log(r);
      const { data } = r;
      if (Boolean(Number(data))) {
        fetchRequestFormReply(requestFormNo);
        setDeleteModal({ visible: false, value: '' });
      }
    }
  };

  /** 댓글 삭제 */
  const handleDelete = (el) => {
    // console.log('handleDelete', el);
    setDeleteModal({
      visible: true,
      value: {
        contents: t('version2_4.text101'), //'댓글을 삭제하시겠습니까?',
        btnCancel: t('version2_1.text3'), //'취소',
        btnConfirm: t('version2_3.text55'), //'삭제하기',
        onConfirm: () => fetchDelete(el),
        onClose: () => setDeleteModal({ visible: false, value: '' }),
      },
    });
  };

  /** 수정일때 값 변경 */
  const handleModify = (idx, id, value) => {
    // console.log(idx, id, value)

    let newItems = [...items];
    if (id === 'state') {
      const answerCn = newItems[idx]['answerCn'];
      newItems[idx]['newAnswerCn'] = answerCn;
    }
    newItems[idx][id] = value;
    setItems(newItems);
  };

  /** 댓글, 답글 수정 */
  const handleUpdate = async (el) => {
    const { requestFormAnswerNo, requestFormNo, answerCn, newAnswerCn } = el;
    let inProgress = true;
    if (newAnswerCn === '' || newAnswerCn === null || newAnswerCn.length === 0) {
      // showWarnSnackbar('답글을 입력해주세요.');
      showWarnSnackbar(t('version2_2.text18'));
      return;
    }
    if (inProgress && requestFormAnswerNo) {
      const r = await putRequestFormReply({ requestFormAnswerNo, body: { answerCn: newAnswerCn } });
      // console.log(r);
      const { data } = r;
      if (Boolean(Number(data))) {
        fetchRequestFormReply(requestFormNo);
      }
    }
    // alert(requestFormAnswerNo)
  };

  /** 답글 추가 */
  const handleChilds = async (idx, type, el) => {
    // console.log('handleChilds=====>', idx, type, el)
    let newItems = [...items];
    if (type === 'add') {
      let childs = newItems[idx]['childs'];
      const i = childs?.findIndex((el) => el?.state === 'write');
      if (i === -1) newItems[idx]['childs'] = [{ state: 'write', answerCn: '', requestFormNo: el.requestFormNo, parentAnswerNo: el.requestFormAnswerNo }, ...childs];
    } else {
      let childs = newItems[idx]['childs'].splice(0, 1);
    }
    setItems(newItems);
  };

  /** 답글 데이터 수정 */
  const handleModifyChild = async (idx, idxx, id, value) => {
    let newItems = [...items];
    let newChilds = newItems[idx]['childs'];
    if (id === 'state') {
      const answerCn = newChilds[idxx]['answerCn'];
      newChilds[idxx]['newAnswerCn'] = answerCn;
    }
    newChilds[idxx][id] = value;
    setItems(newItems);
  };

  /** 답글 등록 */
  const handleSumbitChild = async (ele) => {
    const { requestFormAnswerNo, requestFormNo, answerCn, parentAnswerNo } = ele;
    let inProgress = true;

    if (answerCn === '' || answerCn === null || answerCn.length === 0) {
      // showWarnSnackbar('답글을 입력해주세요.');
      showWarnSnackbar(t('version2_2.text18'));
      return;
    }
    if (inProgress && requestFormNo && !isLock) {
      setLock(true);
      try {
        const r = await postRequestFormReply({ answerCn, requestFormNo, parentAnswerNo, url: pathname });
        // console.log(r)
        const { data } = r;
        if (Boolean(Number(data))) {
          fetchRequestFormReply(requestFormNo);
        }
      } catch (e) {
      } finally {
        setLock(false);
      }
    }
  };

  /** 댓글 신고 */
  const handleReport = (el) => {
    if (!el.registerNo) return;
    setReport(el);
    setIsModal(true);
  };

  const convertComment = (items) => {
    const list = items.reduce((acc, cur, idx) => {
      // console.log('curr', cur, acc, cur.parentAnswerNo.toString());
      if (cur.parentAnswerNo.toString() === '0') {
        acc.push({ ...cur, state: 'read', childs: [] });
      } else {
        const parent = acc.find((el) => el.requestFormAnswerNo.toString() === cur.parentAnswerNo.toString());
        if (parent) {
          parent.childs.push(cur);
        }
      }
      return acc;
    }, []);

    // console.log(list);
    setItems(list);
    setLoading(false);
  };

  const fetchRequestFormReply = async (requestFormNo) => {
    const r = await getRequestFormReply(requestFormNo);
    // console.log(r);
    const { data } = r;
    convertComment(data);
  };

  useEffect(() => {
    if (replyList.length === 0) {
      setLoading(false);
      return;
    }
    convertComment(replyList);
    // console.log('replyList', replyList);
  }, [replyList]);

  return {
    isLoading,
    items,
    user,
    params,
    handleChange,
    handleSumbit,
    handleDelete,
    handleModify,
    handleUpdate,
    handleChilds,
    handleModifyChild,
    handleSumbitChild,
    isModal,
    setIsModal,
    handleReport,
    report,
    isDeleteModal,
  };
};
