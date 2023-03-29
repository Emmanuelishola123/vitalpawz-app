import Link from 'next/link';
import React from 'react'
import styles from 'styles/account/deliveryAddress.module.scss';

function AddressCard({}) {
  return (
    <div className={styles.item}>
          <div className={`${styles.addressItem}`}>
            <h4>Elizabeth Collins</h4>
            <p>801 Trouser Leg Road Greenfield, Massachusetts 01301</p>
            <p>Phone : 116-30-9372</p>
            <ul className={`${styles.actions}`}>
              <li>
                <Link href={'#'}>Edit</Link>
              </li>
              <li>
                <Link href={'#'}>Remove</Link>
              </li>
              <li className={styles.default}>
                <Link href={'#'}>Default Address</Link>
              </li>
            </ul>
          </div>
        </div>
  )
}

export default AddressCard