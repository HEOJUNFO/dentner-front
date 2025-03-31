import { BaseButton, ItemTag } from '@components/common';
import UserStore from '@store/UserStore';
import { nameMaskingFormat } from '@utils/common';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useChat from '@components/hooks/useChat';
import useWindowSize from '../../hooks/useWindowSize';

const RequestInfo = ({
  type = 'public',
  designerNickName,
  designerProfileImage,
  onDesignerDetail,
  onMemberDetail,
  docCnt,
  deadlineDate,
  deadlineTime,
  expireDate,
  expireTime,
  registerDate,
  registerTime,
  status,
  statusName,
  title,
  name,
  memberNo,
  designerNo,
  cads,
  detailUrl,
  onModalOpen,
}) => {
  const { t } = useTranslation();
  const { user } = UserStore();
  const { handleRoom } = useChat();
  const isMobile = useWindowSize();

  return (
    <li>
      <div className="stsSum">
        <span>
          {/* 24.9.3 치자이너 선택중 -> 견적 요청중으로 표현 */}
          {/* 24.9.19  치자이너 수락대기 -> 요청 대기중 -> */}
          <strong className={`iSts ${status === 'C' ? 'ing' : ''} ${status === 'D' ? 'end' : ''}`}>
            {/*{statusName === '치자이너 선택중' ? '견적 요청중' : statusName === '치자이너 수락대기' ? '요청 대기중' : t(`status.${statusName}`)}*/}
            {t(`status.${statusName}`)}

          </strong>
          {type === 'public' && (
            <span className="reQNum">
              <i>{t('base.estimate')}</i>
              <strong>{docCnt}</strong>
            </span>
          )}
        </span>
        <strong className="time">
          {registerDate} <strong>{registerTime}</strong>
        </strong>
      </div>
      <div className="listDt">
        <div className="left">
          <strong>{title}</strong>
          <span>{type === 'public' ? (memberNo === user.memberNo ? name : nameMaskingFormat(name)) : name}</span>
          <ItemTag items={cads} className="itemTag" />
          <dl className="deadlineSet">
            {type === 'public' && (
              <>
                <dt>
                  <em>{t('request.expiration_date')}</em>
                </dt>
                <dd>
                  <span className="time">
                    {expireDate} <span>{expireTime}</span>
                  </span>
                </dd>
              </>
            )}
            <dt>
              <em>{t('request.delivery_deadline')}</em>
            </dt>
            <dd>
              <span className="time">
                {deadlineDate} <span>{deadlineTime}</span>
              </span>
            </dd>
          </dl>
        </div>
        <div className="right">
          <BaseButton label={t('base.view_prosthesistype')} className={'bIT'} onClick={() => onModalOpen(isMobile)} />
          {['C', 'B'].includes(user?.memberSe) && (
            <span className="twinBtn small">
              <BaseButton label={t('base.view_profile')} onClick={() => onMemberDetail()} />
              <span>
                <BaseButton label={t('base.do_chat')} onClick={() => handleRoom(memberNo, 'A')} />
              </span>
            </span>
          )}
          <Link className="bMR" to={`${detailUrl}`}>
            {t('base.do_detail')}
          </Link>
        </div>
      </div>
      {type === 'target' && ['A'].includes(user?.memberSe) && (
        <div className="choiceDt">
          <span className="left">
            <span className="profileSet">
              <span className="profileImg">
                <img src={designerProfileImage} />
              </span>
              <span className="nick">
                <span>{t('base.dental_designer')}</span>
                <strong>{designerNickName}</strong>
              </span>
            </span>
          </span>
          <span className="twinBtn small">
            <BaseButton label={t('base.view_profile')} onClick={() => onDesignerDetail()} />
            <span>
              <BaseButton label={t('base.do_chat')} onClick={() => handleRoom(designerNo, 'C')} />
            </span>
          </span>
        </div>
      )}
    </li>
  );
};

RequestInfo.displayName = 'RequestInfo';

// RequestInfo.propTypes = {
//   wrap: PropTypes.string,
//   ddClassName: PropTypes.string,
//   spanClassName: PropTypes.string,
//   items: PropTypes.array,
//   title: PropTypes.string,
//   groupName: PropTypes.string.isRequired,
//   keyName: PropTypes.string,
//   valueName: PropTypes.string,
//   titleName: PropTypes.string,
//   checkValue: PropTypes.string,
//   onChange: PropTypes.func,
// };

// RequestInfo.defaultProps = {
//   wrap: 'dl',
//   ddClassName: '',
//   spanClassName: '',
//   items: [],
//   titleName: 'title',
//   valueName: 'value',
// };

export default RequestInfo;
