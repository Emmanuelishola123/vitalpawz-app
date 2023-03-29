import styles from 'styles/account/deliveryAddress.module.scss';
import MyAccountLayout from 'layouts/MyAccountLayout';
import createGetServerSidePropsFn from 'shared/createGetServerSidePropsFn';
import { BiPlus } from 'react-icons/bi';
import AddressModal from './components/AddressForm';
import AddressCard from './components/AddressCard';
import { useContext } from 'react';
import AccountContext from '../../context/accountContext';

const DeliveryAddress = () => {
  const {state, dispatch} = useContext(AccountContext)

  const handleAddressOpening = () => {
    return dispatch({ type: 'OPEN_ADDRESS', payload: { new: true } })
  }

  return (
    <>
      <h4 className={styles.title}>Delivery Address</h4>
      <div className={styles.deliveryAddressBox}>
        <div className={styles.item} >
          <div  className={`${styles.addressItem} ${styles.createAddressItem}`}>
            <div className={styles.icon} onClick={handleAddressOpening}>
              <BiPlus width="30" height="30" />
            </div>
            <h4>Add New Address</h4>
          </div>
        </div>

        <AddressCard />
      </div>
      <AddressModal />
    </>
  );
};

DeliveryAddress.Layout = MyAccountLayout;

// export const getServerSideProps = createGetServerSidePropsFn(DeliveryAddress);

export default DeliveryAddress;
