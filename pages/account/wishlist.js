import { useState, useEffect } from 'react';

import styles from 'styles/account/wishlist.module.scss';
import createGetServerSidePropsFn from 'shared/createGetServerSidePropsFn';
import MyPagination from '@/components/MyPagination/MyPagination';
import MyAccountLayout from 'layouts/MyAccountLayout';
import Image from 'next/image';
import CartItemPreview from '@/components/CartItems/images/cartItemPreview.png';
import PrimarySmall from 'components/Buttons/PrimarySmall';

const EditAccount = () => {
  const [items, _setItems] = useState([
    {
      title: 'CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
      description: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
      price: '$25.56',
    },
    {
      title: 'CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
      description: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
      price: '$25.56',
    },
    {
      title: 'CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
      description: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
      price: '$25.56',
    },
    {
      title: 'CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
      description: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
      price: '$25.56',
    },
    {
      title: 'CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
      description: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
      price: '$25.56',
    },
    {
      title: 'CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
      description: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
      price: '$25.56',
    },
    {
      title: 'CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
      description: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
      price: '$25.56',
    },
    {
      title: 'CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
      description: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
      price: '$25.56',
    },
    {
      title: 'CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
      description: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
      price: '$25.56',
    },
    {
      title: 'CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
      description: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
      price: '$25.56',
    },
    {
      title: 'CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
      description: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
      price: '$25.56',
    },
    {
      title: 'CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
      description: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
      price: '$25.56',
    },
    {
      title: 'CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
      description: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
      price: '$25.56',
    },
    {
      title: 'CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
      description: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
      price: '$25.56',
    },
    {
      title: 'CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
      description: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
      price: '$25.56',
    },
  ]);

  const [currentItems, setCurrentItems] = useState(items);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  return (
    <>
      <div className="">
        <h4 className={styles.title}>Wishlist</h4>
      </div>

      <div className={styles.wishlistBox}>
        {currentItems.map((e, index) => (
          <div className={styles.wishlistItem}>
            <div className={styles.wishlistImg}>
              <Image src={CartItemPreview} alt="sheld" className="w-24 h-24" />
            </div>
            <div className={styles.wishListInfo}>
              <h4>{e.title}</h4>
              <p>{e.description}</p>
              <div className={styles.wishListAction}>
                <a href="#">Remove</a>
                <div>
                  <b>{e.price}</b>
                  <PrimarySmall className="w-[137px] h-[44px] ml-21px" text="Add to Cart" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.MyPagination}>
        <MyPagination items={items} pageCount={pageCount} setItemOffset={setItemOffset} itemsPerPage={itemsPerPage} />
      </div>
    </>
  );
};

EditAccount.Layout = MyAccountLayout;

// export const getServerSideProps = createGetServerSidePropsFn(EditAccount);

export default EditAccount;
