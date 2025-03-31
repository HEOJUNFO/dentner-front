import { deleteChatRoom } from '@api/Chat';
import React, { useState } from 'react';
import {BaseButton, BaseInput} from '@components/common';
import { useTranslation } from 'react-i18next';
import {putMyteethType} from "@api/Mypage.js";

const AmountAlert = ({ onClose , selectedCode , isDollar , params, onRefetch}) => {
  const { t } = useTranslation();

  const [amount, setAmount] = useState({value : isDollar ? params?.typeAddDollarAmount?.value : params?.typeAddAmount?.value , error: false
})

  const handleSubmit = async() => {
    // 서버로 전송

    if(!amount.value) {
      setAmount((prev) => ({...prev, error: true}))
      //alert('금액을 입력하세요.')
      return;
    }

    const p = {amountType : isDollar ? 'D' : 'C' , memberFirstValue: selectedCode.upperCode.value ,
      memberMiddleValue: selectedCode.middleCode.value, typeAmount: amount?.value}

    const r = await putMyteethType(p)
    if (r.statusCode === 200) {
      onRefetch && onRefetch()
    }
  }

  return (
    <>
      <div className="basicPop itemTypePop" style={{ display: 'block' }}>
        <h1 className="pt">{'추가 금액 설정'}</h1>
        <div className="pBack">
          <BaseInput
              inputType={'demical'}
              type="number"
              value={amount.value}
              maxLength={10}
              isError={false}
              error={amount.error}
              onChange={(e) => {
                setAmount((prev) => ({...prev, value: e.target.value, error: false}))
              }}
          />
        </div>
        <div className="pBtn">
          <BaseButton label={t('version2_1.text3')} className={'btnL'} onClick={() => onClose()} />
          <BaseButton label={t('base.confirm')} className={'btnB'} onClick={() => handleSubmit()} />
        </div>
      </div>
    </>
  );
};

export default AmountAlert;
