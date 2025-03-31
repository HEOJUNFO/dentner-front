import { postLaboratoryReport } from '@api/Center';
import { postDesignerReport } from '@api/Designer';
import defaultImg from '@assets/images/no_user.png';
import { BaseButton, BaseSelect, BaseTextArea } from '@components/common';
import { useSnack } from '@components/hooks';
import CodeStore from '@store/CodeStore';
import ModalStore from '@store/ModalStore';
import { useEffect, useState } from 'react';
import { nameMaskingFormat } from '@utils/common';
import { useTranslation } from 'react-i18next';

/**
 * code 759 신고사유
 * 신고하기 모달
 * @param {*} param0
 * @returns
 */
//A:회원, B:요청서, C:댓글, D:리뷰
const ReportModal = ({ type, targetType = 'A', target, targetNo, onClose }) => {
  const { t } = useTranslation();
  const { getters } = CodeStore();
  const { actions } = ModalStore();

  // const [isModal, setIsModal] = useState(false);
  const { showSnackbar, showWarnSnackbar } = useSnack();

  const [member, setMember] = useState({ memberNo: '', profileImage: '', memberName: '' });
  const [params, setParams] = useState({
    reportCodeNo: { value: '', isRequired: true, error: '', check: 0, success: 0, placeholder: t('version2_3.text89') },
    reportCn: { value: '', isRequired: true, error: '', check: 0, success: 0, placeholder: t('version2_3.text90'), maxLength: 1300, emptyMessage: '신고 사유를 입력하세요.' },
  });

  const [items, setItems] = useState([]);

  const handleChange = (name, value, success = 0, error = '') => {
    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, success, error },
    }));
  };

  const handleSubmit = async () => {
    let inProgress = true;

    let error = '';
    const body = {};
    const p = { ...params, ...type };
    for (const key in p) {
      if (p[key].isRequired) {
        if (p[key].value === '') {
          inProgress = false;
          if (p[key].placeholder) {
            if (!error) error = p[key].placeholder;
            handleChange(key, '', 0, p[key].placeholder);
          }
        } else {
          body[key] = p[key].value;
        }
      }
    }
    // 회원 신고가 아닌경우
    if (targetType) body['reportTp'] = targetType;
    if (targetNo) body['reportTargetNo'] = targetNo;

    if (!inProgress) {
      showWarnSnackbar(error);
      return;
    }

    // B:치과기공소, C:치자이너
    if (type === 'B') {
      // 치기공소 신고
      const r = await postLaboratoryReport({ memberNo: member.memberNo, body });
      const { data } = r;
      if (Boolean(Number(data))) {
        // showSnackbar('신고완료');
        onClose();
        actions.setDoneAlert({ isVisible: true, title: t('base.noti'), contents: t('version2_3.text88'), btnName: t('base.confirm') });
      }
    } else if (type === 'C' || type === 'A') {
      // 치자이너 신고, 의뢰인 신고
      const r = await postDesignerReport({ memberNo: member.memberNo, body });
      const { data } = r;
      if (Boolean(Number(data))) {
        onClose();
        actions.setDoneAlert({ isVisible: true, title: t('base.noti'), contents: t('version2_3.text88'), btnName: t('base.confirm') });
      }
    } else {
      showWarnSnackbar(t('version2_3.text91'));
    }
  };

  const handleSelected = (el) => {
    handleChange('reportCodeNo', el.codeNo, 1);
  };

  useEffect(() => {
    const code = getters.getFilterCode(759);
    setItems(code.value);
  }, []);

  useEffect(() => {
    if (target) {
      setMember(target);
    }
  }, [target, type]);

  return (
    <>
      <div className="basicPop reportPop" style={{ display: 'block' }}>
        <BaseButton label={t('base.close')} className={'btnPClose'} onClick={() => onClose()} />
        <h1 className="pt">{t('disigner.report')}</h1>
        <div className="pBack">
          <div className="userInfo">
            <h2>{t('version2_3.text92')}</h2>
            <div>
              <span className="profileImg">
                <img src={member.profileImage || member.memberProfileImage || defaultImg} />
              </span>
              <strong>{nameMaskingFormat(member.memberName || member?.memberNickName)}</strong>
            </div>
          </div>

          <BaseSelect items={items} placeholder={t('version2_3.text89')} titleName={'codeName'} valueName={'codeNo'} onChange={(e) => handleSelected(e)} />

          <BaseTextArea
            id="reportCn"
            error={params.reportCn.error}
            value={params.reportCn.value}
            placeholder={params.reportCn.placeholder}
            onChange={(e) => handleChange(e.target.id, e.target.value)}
            isError={false}
          />
        </div>
        <div className="pBtn">
          <BaseButton label={t('version2_1.text3')} className={'btnL'} onClick={() => onClose()} />
          <BaseButton label={t('version2_3.text93')} className={'btnB'} onClick={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default ReportModal;
