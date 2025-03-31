import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseButton, BaseInput } from '@components/common';
import { FileUpload } from '@components/ui';
import { useSnack } from '@components/hooks';
import ModalStore from '@store/ModalStore';
import { post3d } from '@api/Payment';
import { replaceToBr, withCommas, strToLength } from '@utils/common';

const ThreeDCommsModal = ({ onClose, onFetch, requestFormNo }) => {
  const { t } = useTranslation();
  const { showSnackbar, showWarnSnackbar } = useSnack();
  const { actions } = ModalStore();

  const maxFile = 10;

  const [files, setFiles] = useState([]);
  const [delFiles, setDelFiles] = useState([]); // 삭제된 파일

  const [threeSj, setThreeSj] = useState({ value: '', error: '' });

  const fileProgress = (p) => {
    actions.setReceived(p);
  };

  const handleSubmit = async (e) => {
    if (strToLength(threeSj.value) === 0) {
      showWarnSnackbar(t('version2_3.text110'));
      setThreeSj((prev) => ({ ...prev, value: e.target.value, error: t('version2_3.text110') }));
      return;
    }

    if (files.length === 0) {
      showWarnSnackbar(t('version2_3.text111'));
      return;
    }

    const formData = new FormData();
    formData.append('threeSj', threeSj.value);
    files.forEach((f) => {
      formData.append('files', f.file);
    });

    actions.setLoading(true);
    try {
      const r = await post3d({ requestFormNo: requestFormNo, formData, fileProgress });

      if (Boolean(Number(r?.data))) {
        showSnackbar(t('version2_3.text112'));
        if (onClose) onClose();
        if (onFetch) onFetch();
      }
    } catch (e) {
      console.log(e);
    } finally {
      actions.setLoading(false);
    }
  };
  return (
    <>
      <div className="basicPop threeDCommsPop" style={{ display: 'block' }}>
        <BaseButton label={t('base.close')} className={'btnPClose'} onClick={() => onClose()} />
        <h1 className="pt">STL {t('status.upload')}</h1>
        <div className="pBack">
          <div className="tws">
            <div className="detail">
              <dl>
                <dt>
                  {t('base.title')} <sup>필수항목</sup>
                </dt>
                <dd>
                  <BaseInput
                    type="text"
                    id="threeSj"
                    placeholder={t('version2_3.text110')}
                    value={threeSj?.value}
                    error={threeSj?.error}
                    maxLength={50}
                    onChange={(e) => {
                      setThreeSj((prev) => ({ ...prev, value: e.target.value, error: '' }));
                    }}
                  />
                </dd>
              </dl>
              <dl>
                <dt className="etc">
                  <span>
                    {t('version2_2.text35')}
                    <sup>필수항목</sup>
                  </span>
                  <em className="fileNum">
                    (<strong>{files.length}</strong>/{maxFile})
                  </em>
                </dt>
                <dd>
                  <FileUpload
                    fileList={files}
                    setFileList={setFiles}
                    delFileList={delFiles}
                    setDelFileList={setDelFiles}
                    maxFile={maxFile}
                    maxSize={500}
                    fileTypes={['stl']}
                    label={
                      <label className="inq">
                        <strong>drag&drop {t('version2_1.text27')}</strong> {`(stl ${t('version2_2.text36')}, 500MB ${t('version2_2.text37')})`}
                      </label>
                    }
                    guide={
                      <em className="guide">
                        [{t('version2_4.text39')}] <i>stl</i> (500MB {t('version2_2.text37')})
                      </em>
                    }
                  />
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="pBtn">
          <BaseButton label={t('version2_2.text46')} className={'btnB'} onClick={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default ThreeDCommsModal;
