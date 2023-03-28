import { useState } from 'react';
import Modal from 'react-modal';
import PrimarySmall from './../../../components/Buttons/PrimarySmall';
import MySelect from './../../../components/CartItems/componentsCartItem/MySelect';
import { Label } from 'components/InputLabel';
import SecondarySmall from './../../../components/Buttons/SecondarySmall';
import styles from 'styles/cart-checkout/checkout/style.module.scss';
import countryList from '../../../shared/countryList';

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

// {modalIsOpen, setIsOpen, newAddress = true }

export default function AddressModal() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  let newAddress = true

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Address Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{newAddress ? 'Add New Address' : 'Update Address'}</h2>
                    <form 
                    // onSubmit={handleSubmit(onSubmit)}
                    >
                      <div
                        className={`${styles.flexRow} ${styles.flexWrap} ${styles.alignCenter} ${styles.mt_24}`}
                      >
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
                              // {...register('address', { required: 'Please Enter Your Address' })}
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
                              // {...register('city', { required: 'Please Enter Your City or Suburb' })}
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
                              // {...register('area', { required: 'Please Enter Your City or Suburb' })}
                            />
                          </div>
                        </div>
                        <div
                          className={`${styles.pr_12} ${styles.width50} ${styles.mt_24} ${styles.checkoutSelect} ${styles.sm_w_100}`}
                        >
                          <Label label="Country" />
                          <MySelect
                            setState={(v) => setValue('country', v.value)}
                            // {...register('country', { required: 'Please Enter Your Country' })}
                            optionsArr={countryList}
                            placeholder={'Select country'}
                            classNamePrefix={'mySelect2'}
                          />
                        </div>
                        <div className={`${styles.width50} ${styles.mt_24} ${styles.sm_w_100}`}>
                          <label htmlFor="zipCode" className={styles.formLabel}>
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
                              // {...register('zipCode', { required: 'Please Enter Your Zip Code' })}
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