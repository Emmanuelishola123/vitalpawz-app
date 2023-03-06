import React, { FC } from 'react'
import style from '@/styles/SmartSearchProductCart.module.scss';
import Image from 'next/image';
import productImg from '@/public/img/productSellingImg.png'
import { IData } from 'types/smartSearchInterface';

interface SmartSearchProductCartProps{
  product: IData
}

const SmartSearchProductCart: FC<SmartSearchProductCartProps> = ({ product }) => {
  return (
    <li className={style.SmartSearchProductCartLi}>
      <div className={style.SmartSearchProductCartImg}>
        <Image src={productImg} />
      </div>
      <div className={style.SmartSearchProductCartPriceAndDescription}>
        <div className={style.SmartSearchProductCartPrice}>
          ${ product.regular_price }
        </div>
        <div className={style.SmartSearchProductCartDescription}>
          { product.excerpt }
        </div>
      </div>
    </li>
  )
}

export default SmartSearchProductCart;