import React, { useState } from 'react'
import style from './RewardInput.module.scss';
import { AxiosError, AxiosResponse } from 'axios';

interface propsType {
  applyCouponCode: () => AxiosResponse | AxiosError | null,
  setCouponCode: React.Dispatch<React.SetStateAction<string>>
}

const RewardCodeInput: React.FC<propsType> = (props) => {

  const { setCouponCode, applyCouponCode } = props

  return (
    <div className={style.RewardInputWrapper}>
      <input placeholder='Gift card or discount code' type="text" onChange={e => setCouponCode(e.target.value)} />
      <button onClick={applyCouponCode}>Apply</button>
    </div>
  )
}

export default RewardCodeInput