import { useState, useEffect } from 'react';

import styles from 'styles/account/myRewards.module.scss';
import createGetServerSidePropsFn from 'shared/createGetServerSidePropsFn';
import MyPagination from '@/components/MyPagination/MyPagination';
import MyAccountLayout from 'layouts/MyAccountLayout';

const EditAccount = () => {
  const [items, _setItems] = useState([
    {
      header_text: 'Reward received for order #1457895',
      created_at: '25 Nov 2021, 01:00 PM',
      total_items: 12,
      order_total: 98.92,
      reward: 22.98,
      reward_postive: true,
    },
    {
      header_text: 'Redeemed for order #2415487',
      created_at: '25 Nov 2021, 01:00 PM',
      total_items: 12,
      order_total: 97.92,
      reward: 12.98,
      reward_postive: false,
    },
    {
      header_text: 'Reward received for order #3654877',
      created_at: '25 Nov 2021, 01:00 PM',
      total_items: 12,
      order_total: 79.92,
      reward: 12.98,
      reward_postive: true,
    },
    {
      header_text: 'Reward received for Facebook Share',
      created_at: '25 Nov 2021, 01:00 PM',
      total_items: null,
      order_total: null,
      reward: 22.98,
      reward_postive: true,
    },
    {
      header_text: 'Reward received for order #4785416',
      created_at: '25 Nov 2021, 01:00 PM',
      total_items: 12,
      order_total: 98.92,
      reward: 22.98,
      reward_postive: true,
    },
    {
      header_text: 'Redeemed for order #9863478',
      created_at: '25 Nov 2021, 01:00 PM',
      total_items: 12,
      order_total: 98.92,
      reward: 22.98,
      reward_postive: true,
    },
    {
      header_text: 'Reward received for order #1457895',
      created_at: '25 Nov 2021, 01:00 PM',
      total_items: 12,
      order_total: 98.92,
      reward: 22.98,
      reward_postive: true,
    },
    {
      header_text: 'Reward received for order #1457895',
      created_at: '25 Nov 2021, 01:00 PM',
      total_items: 12,
      order_total: 98.92,
      reward: 22.98,
      reward_postive: true,
    },
    {
      header_text: 'Reward received for order #1457895',
      created_at: '25 Nov 2021, 01:00 PM',
      total_items: 12,
      order_total: 98.92,
      reward: 22.98,
      reward_postive: true,
    },
    {
      header_text: 'Reward received for order #1457895',
      created_at: '25 Nov 2021, 01:00 PM',
      total_items: 12,
      order_total: 98.92,
      reward: 22.98,
      reward_postive: true,
    },
    {
      header_text: 'Reward received for order #1457895',
      created_at: '25 Nov 2021, 01:00 PM',
      total_items: 12,
      order_total: 98.92,
      reward: 22.98,
      reward_postive: true,
    },
    {
      header_text: 'Reward received for order #1457895',
      created_at: '25 Nov 2021, 01:00 PM',
      total_items: 12,
      order_total: 98.92,
      reward: 22.98,
      reward_postive: true,
    },
    {
      header_text: 'Reward received for order #1457895',
      created_at: '25 Nov 2021, 01:00 PM',
      total_items: 12,
      order_total: 98.92,
      reward: 22.98,
      reward_postive: true,
    },
    {
      header_text: 'Reward received for order #1457895',
      created_at: '25 Nov 2021, 01:00 PM',
      total_items: 12,
      order_total: 98.92,
      reward: 22.98,
      reward_postive: true,
    },
    {
      header_text: 'Reward received for order #1457895',
      created_at: '25 Nov 2021, 01:00 PM',
      total_items: 12,
      order_total: 98.92,
      reward: 22.98,
      reward_postive: true,
    },
    {
      header_text: 'Reward received for order #1457895',
      created_at: '25 Nov 2021, 01:00 PM',
      total_items: 12,
      order_total: 98.92,
      reward: 22.98,
      reward_postive: true,
    },
    {
      header_text: 'Reward received for order #1457895',
      created_at: '25 Nov 2021, 01:00 PM',
      total_items: 12,
      order_total: 98.92,
      reward: 22.98,
      reward_postive: true,
    },
    {
      header_text: 'Reward received for order #1457895',
      created_at: '25 Nov 2021, 01:00 PM',
      total_items: 12,
      order_total: 98.92,
      reward: 22.98,
      reward_postive: true,
    },
    {
      header_text: 'Reward received for order #1457895',
      created_at: '25 Nov 2021, 01:00 PM',
      total_items: 12,
      order_total: 98.92,
      reward: 22.98,
      reward_postive: true,
    },
  ]);

  const [currentItems, setCurrentItems] = useState(items);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(5);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  return (
    <>
      <div className="flex flex-row flex-wrap md:justify-between">
        <h4 className={styles.title}>My Rewards</h4>
        <span className="text-xl font-bold text-dark-green lg:text-right lg:w-[unset] w-full">
          <b className="text-lighter-black pr-[6px]">Total available</b> $96.98
        </span>
      </div>
      <span className="block lg:mt-[-22px] mb-[24px] text-base text-lighter-black">
        Shop and earn points on purchases, social interactions, & more!{' '}
        <a className="underline font-bold" href={`/`}>
          Know more
        </a>
      </span>

      <div className={styles.reward_box}>
        <div className={styles.reward_item}>
          <div>
            <div className={styles.reward_header}>
              <h6>Reward received for order #1457895</h6>
              <a href="#">View Invoice</a>
            </div>
            <div className={styles.reward_info}>
              <span>25 Nov 2021, 01:00 PM</span> <span>Total items 12</span> <span>Order total $98.92</span>
            </div>
          </div>
          <div className={styles.total_reward}>+ $22.98</div>
        </div>

        {currentItems.map((e, index) => (
          <div className={styles.reward_item}>
            <div>
              <div className={styles.reward_header}>
                <h6>{e.header_text}</h6>
                <a href="#">View Invoice</a>
              </div>
              <div className={styles.reward_info}>
                <span>{e.created_at}</span> {e.total_items && <span>Total items {e.total_items}</span>}{' '}
                {e.order_total && <span>Order total ${e.order_total}</span>}
              </div>
            </div>
            <div className={`${styles.total_reward} ${e.reward_postive ? '' : styles.total_reward_negative}`}>
              + ${e.reward}
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
