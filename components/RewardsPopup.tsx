import Link from 'next/link';
import React from 'react';
import styles from 'styles/RewardsPopup.module.css';

const RewardsPopup = ({ balance }: { balance: string }) => {
  return (
    <div className={styles.rewardsPopup}>
      <div className={styles.cnt}>
        <div className="flex justify-between">
          <p className={styles.title}>My Rewards</p>
          <p className={styles.balance}>${balance}</p>
        </div>
        <Link href="/account/my-rewards">
          <a className={styles.history}>See history</a>
        </Link>
        <p className={styles.downText}>
          Shop and earn points on purchases, social interactions, & more!
          <Link href="/reward-program">
            <a>Know more</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RewardsPopup;
