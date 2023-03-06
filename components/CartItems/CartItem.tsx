/* eslint-disable no-restricted-imports */
import React, { FC, useEffect, useState } from 'react';
import styles from './CartItem.module.scss';
import Image from 'next/image';
import CartItemPreview from './images/cartItemPreview.png';
import MySelect from './componentsCartItem/MySelect';
import MyButton from './componentsCartItem/MyButton';
import { ICartSchema } from 'schemas/cart.schema';

interface ICartItemProps {
  subscription?: string;
  data: ICartSchema;
  setExistingCart: (product_id: string, quantity: number) => void;
}

const selectValues = [
  { value: 'Large', label: 'Large' },
  { value: 'Small', label: 'Small' },
  { value: 'Medium', label: 'Medium' },
];

const CartItem: FC<ICartItemProps> = ({
  subscription = 'subscription: every month X 3',
  data: { id, product, quantity } = { product: null, id: '', quantity: 1 },
  setExistingCart,
}) => {
  const [productsToBuy, setProductsToBuy] = useState<number>(quantity);
  const [productSelect, setProductSelect] = useState(null);
  const handleIncrease = () => {
    setProductsToBuy((prev) => (prev + 1 > 99 ? 99 : prev + 1));
  };
  const handleChangeProducts = (e: any) => {
    setProductsToBuy(() => {
      if (e.target.value > 99) {
        return 99;
      }
      if (e.target.value < 1) {
        return 1;
      }
      return e.target.value;
    });
  };
  const handleDecrease = () => {
    setProductsToBuy((prev) => (prev - 1 < 1 ? 1 : prev - 1));
  };
  useEffect(() => {
    setExistingCart(id, productsToBuy);
  }, [productsToBuy]);

  return (
    <div className={styles.CartItem}>
      <div className={styles.imgWrapper}>
        <Image src={product?.cover ?? CartItemPreview} alt="arrow down" width={88} height={88} />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.contentSelectAndH2}>
          <h2>{product?.title}</h2>
          {subscription ? <span className={styles.contentSelectAndH2Subscription}>{subscription}</span> : null}
          <div className={styles.contentSelect}>
            <MySelect state={productSelect} setState={setProductSelect} optionsArr={selectValues} />
          </div>
        </div>
        <div className={styles.contentWrapperCounterAndPrice}>
          <div className={styles.contentCounter}>
            <MyButton handle={handleDecrease} mode="minus" />
            <div className={styles.counter}>
              <input value={productsToBuy} onChange={handleChangeProducts} />
            </div>
            <MyButton handle={handleIncrease} mode="plus" />
            <div className={styles.ContentCounterPrice}>
              <span>${product?.sale_price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
