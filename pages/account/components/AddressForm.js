import { useContext } from 'react';
import Modal from 'react-modal';
import PrimarySmall from './../../../components/Buttons/PrimarySmall';
import SelectCountry from './SelectCountry';
import { Label } from 'components/InputLabel';
import SecondarySmall from './../../../components/Buttons/SecondarySmall';
import styles from 'styles/cart-checkout/checkout/style.module.scss';
import countryList from '../../../shared/countryList';
import { useForm } from 'react-hook-form';
import { createNewAddress } from '../../../services/accountApis';
import { useAuthState } from '@/app/atom/auth.atom';
import AccountContext from '../../../context/accountContext';

const customStyles = {
  content: {
    width: '95%',
    maxWidth: '475px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#__next');

export default function AddressModal() {
  const [_authState, setAuthState] = useAuthState();
  const {state, dispatch} = useContext(AccountContext);
  const { isAddressOpen, addressData } = state;

  console.log(state)

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const closeModal = () => {
    return dispatch({ type: 'CLOSE_ADDRESS' })
  }

  console.log({_authState})


  // Submit new/updated address
  const onSubmit = async (d) => {
    try {
      const data = {
        ...d,
        title: 'User Address',
        email: _authState?.user?.email,
        phone: _authState?.user?.mobile,
        token: _authState?.token,
      };
      

    const res = await createNewAddress({ ...data });
      console.log({  data, res });

    } catch (err) {
      console.log(err);
    }
  };

  // console.log()

  return (
    <div>
      <Modal isOpen={isAddressOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Address Modal">
        <h2>{addressData?.new ? 'Add New Address' : 'Update Address'}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.flexRow} ${styles.flexWrap} ${styles.alignCenter} ${styles.mt_24}`}>
            <div className={`${styles.width100} ${styles.mt_24}`}>
              <label htmlFor="address" className={styles.formLabel}>
                Address
              </label>
              <div>
                <input
                  id="text"
                  name="address"
                  type="text"
                  autoComplete="address"
                  placeholder="Address"
                  required
                  className={styles.formInput}
                  {...register('street_address', { required: 'Please Enter Your Address' })}
                />
              </div>
            </div>

            <div className={`${styles.width100} ${styles.mt_24}`}>
              <label htmlFor="city" className={styles.formLabel}>
                City / Suburb
              </label>
              <div>
                <input
                  id="text"
                  name="city"
                  type="text"
                  autoComplete="city"
                  placeholder="City / Suburb"
                  required
                  className={styles.formInput}
                  {...register('city', { required: 'Please Enter Your City or Suburb' })}
                />
              </div>
            </div>
            <div className={`${styles.width100} ${styles.mt_24}`}>
              <label htmlFor="area" className={styles.formLabel}>
                Area
              </label>
              <div>
                <input
                  id="text"
                  name="area"
                  type="text"
                  autoComplete="area"
                  placeholder="Area"
                  required
                  className={styles.formInput}
                  {...register('area', { required: 'Please Enter Your Area' })}
                />
              </div>
            </div>
            <div
              className={`${styles.pr_12} ${styles.width50} ${styles.mt_24} ${styles.checkoutSelect} ${styles.sm_w_100}`}
            >
              <Label label="Country" />
              <SelectCountry
                setState={(v) => setValue('country', v.value)}
                // {...register('country', { required: 'Please Enter Your Country' })}
                optionsArr={countryList}
                placeholder={'Select country'}
                classNamePrefix={'mySelect2'}
              />
            </div>
            <div className={`${styles.width50} ${styles.mt_24} ${styles.sm_w_100}`}>
              <label htmlFor="postal_code" className={styles.formLabel}>
                Zip Code
              </label>
              <div>
                <input
                  id="text"
                  name="zipCode"
                  type="number"
                  autoComplete="zipCode"
                  placeholder="Zip Code"
                  required
                  className={styles.formInput}
                  {...register('postal_code', { required: 'Please Enter Your Zip Code' })}
                />
              </div>
            </div>

            <div className="mt-20px">
              <PrimarySmall className="w-[168px] h-[44px] mr-10px mb-11px md:mb-0" text="Save Changes" />
              <SecondarySmall className="w-[168px] h-[44px]" text="Cancel" onClick={closeModal} />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
