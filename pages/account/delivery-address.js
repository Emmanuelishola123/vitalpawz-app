import styles from 'styles/account/deliveryAddress.module.scss';
import MyAccountLayout from 'layouts/MyAccountLayout';
import createGetServerSidePropsFn from 'shared/createGetServerSidePropsFn';
import { BiPlus } from 'react-icons/bi';
import Link from 'next/link';
import AddressModal from './components/AddressForm';

const DeliveryAddress = () => {
  return (
    <>
      <h4 className={styles.title}>Delivery Address</h4>
      <div className={styles.deliveryAddressBox}>
        <div className={styles.item}>
          <div className={`${styles.addressItem} ${styles.createAddressItem}`}>
            <div className={styles.icon}>
              <BiPlus width="30" height="30" />
            </div>
            <h4>Add New Address</h4>
            <AddressModal />
          </div>
        </div>
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
              <li>
                <Link href={'#'}>Set As Default</Link>
              </li>
            </ul>
          </div>
        </div>
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
              <li>
                <Link href={'#'}>Set As Default</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

DeliveryAddress.Layout = MyAccountLayout;

// export const getServerSideProps = createGetServerSidePropsFn(DeliveryAddress);

export default DeliveryAddress;
