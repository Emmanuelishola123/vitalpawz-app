import React, { useState, useRef, useEffect } from 'react';

import styles from 'styles/cart-checkout/checkout/style.module.scss';
import sheldImg from '@/public/img/logo/icon-40-shield.svg';
import Image from 'next/image';
import CartItemPreview from '@/components/CartItems/images/cartItemPreview.png';
import MainLayout from 'layouts/MainLayout';
import createGetServerSidePropsFn from 'shared/createGetServerSidePropsFn';
import Link from 'next/link';
import PrimarySmall from 'components/Buttons/PrimarySmall';
import { useForm } from 'react-hook-form';
import { useCartValue, getCartTotal, useCartState } from '../../../app/atom/cart.atom';
import dynamic from 'next/dynamic';
import { useRecoilValue } from 'recoil';
import { useAuthState } from '@/app/atom/auth.atom';
import { Label } from 'components/InputLabel';
import MySelect from '@/components/CartItems/componentsCartItem/MySelect';
import countryList from '../../../shared/countryList';
import { toast } from 'react-toastify';
import { postRequest } from 'requests/api';
import { useRouter } from 'next/router';

const CartInfo = ({ data }) => {
  return (
    <div className={`${styles.width100} ${styles.mt_24} ${styles.order_item}`}>
      <div className={`${styles.flexRow} ${styles.flexWrap}`}>
        <div
          data-quantity={data?.quantity ?? 1}
          className={`${styles.width20} ${styles.order_img} ${styles.sm_w_100} ${styles.sm_text_center} flex-0`}
        >
          <img src={data?.product?.cover} alt="arrow down" width={88} height={88} />
        </div>
        <div className={`${styles.width50} ${styles.sm_w_100} ${styles.sm_text_center} flex-0`}>
          <h4 className={`${styles.order_title}`}>{data?.product?.title}</h4>
          <span className={`${styles.order_desc}`}>Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews</span>
        </div>
        <div className={`${styles.width20} ${styles.sm_w_100} ${styles.sm_text_center} text-right flex-0`}>
          <span className={`${styles.order_price} text-right`}>${data?.product?.sale_price}</span>
        </div>
      </div>
    </div>
  );
};

const CartTotal = () => {
  const cartTotal = useRecoilValue(getCartTotal);

  return cartTotal;
};

const CartInfoDynamic = dynamic(() => Promise.resolve(CartInfo), { ssr: false });
const CartTotalDynamic = dynamic(() => Promise.resolve(CartTotal), { ssr: false });

const Checkout = () => {
  const router = useRouter();
  const { session_id } = router.query;
  const [_authState, setAuthState] = useAuthState();
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const cartData = useCartValue();

  console.log(cartData);

  const onSubmit = (data) => {
    setDeliveryAdresses((current) => [...current, data]);
    setAddNewAddress(false);

    // addNewAddressInputRef.current.prop('checked', false);
  };

  const placeOrder = async () => {
    if (!userData.full_name) return toast.warning('Please enter your name');
    if (!userData.email) return toast.warning('Please enter your email');
    if (!userData.mobile) return toast.warning('Please enter your phone number');
    if (!selectedDeliveryAdresses) return toast.warning('Please select delivery address');

    const products = [];
    cartData.map((v) => products.push({ id: v.product.id, quantity: v.quantity, options: [v.product.id] }));
    const data = {
      full_name: userData.full_name,
      email: userData.email,
      mobile: userData.mobile,
      payment_type: 'card',
      products,
      street_address: selectedDeliveryAdresses.address,
      city: selectedDeliveryAdresses.city,
      country: selectedDeliveryAdresses.country,
      postal_code: selectedDeliveryAdresses.zipCode,
      code: '',
    };
    const res = await postRequest('/orders/pay', JSON.stringify(data));
    if (res.data.url) {
      location.replace(res.data.url);
    }
    console.log(res);
  };

  const [state, setState] = useState('payment_method_card');
  const [addBillingAddress, setAddBillingAddress] = useState(false);
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [deliveryAdresses, setDeliveryAdresses] = useState([]);
  const [selectedDeliveryAdresses, setSelectedDeliveryAdresses] = useState(null);
  const [userData, setUserData] = useState({});
  const addNewAddressRef = useRef(null);
  const addNewBillingAddressRef = useRef(null);

  useEffect(() => {
    if (addNewAddress) {
      addNewAddressRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [addNewAddress]);

  useEffect(() => {
    if (addBillingAddress) {
      addNewBillingAddressRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [addBillingAddress]);

  const payment_method_card = () => {
    if (state == 'payment_method_card') {
      setState('card_none');
    } else setState('payment_method_card');
  };
  const payment_method_paypal = () => {
    if (state == 'payment_method_paypal') {
      setState('paypal_none');
    } else setState('payment_method_paypal');
  };
  const payment_method_gpay = () => {
    if (state == 'payment_method_gpay') {
      setState('gpay_none');
    } else setState('payment_method_gpay');
  };
  const payment_method_applepay = () => {
    if (state == 'payment_method_applepay') {
      setState('applepay_none');
    } else setState('payment_method_applepay');
  };
  const payment_method_amazonpay = () => {
    if (state == 'payment_method_amazonpay') {
      setState('amazonpay_none');
    } else setState('payment_method_amazonpay');
  };
  const [cart, setCart] = useCartState();
  const verifyOrder = async (id) => {
    console.log(id);
    setCart([]);
  };

  useEffect(() => {
    if (session_id) {
      verifyOrder(session_id);
    }
  }, []);

  return (
    <div className={styles.mainBody}>
      {/* <Navbar /> */}

      <div className={styles.wrapper}>
        <span className={`${styles.urlText} ${styles.width100}`}>Back to cart</span>
        <div className={`${styles.width50} ${styles.md_w_100}`}>
          <div>
            <div className={`${styles.flexRow} ${styles.mt_14} ${styles.flexWrap} ${styles.checkoutBox}`}>
              <div className={`${styles.width100}`}>
                <form className="" action="/" method="POST">
                  <div className="">
                    <div className={`${styles.flexRow} ${styles.flexWrap} ${styles.alignCenter}`}>
                      <h4 className={`${styles.checkoutBoxHeader} ${styles.sm_w_100} ${styles.sm_m_0}`}>
                        Your Details
                      </h4>
                      <span className={`${styles.urlText2} ${styles.sm_w_100} ${styles.sm_d_none}`}>
                        Already have an account? <b>Log in</b>
                      </span>
                    </div>

                    <div className={`${styles.flexRow} ${styles.flexWrap} ${styles.alignCenter} ${styles.mt_24}`}>
                      <div className={`${styles.pr_12} ${styles.width60} ${styles.sm_w_100} ${styles.sm_p_0}`}>
                        <label htmlFor="username" className={styles.formLabel}>
                          Full Name
                        </label>
                        <div>
                          <input
                            id="text"
                            name="username"
                            type="username"
                            autoComplete="username"
                            placeholder="First & Last Name"
                            required
                            className={styles.formInput}
                            onChange={(e) => setUserData({ ...userData, full_name: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className={`${styles.width40} ${styles.sm_w_100} ${styles.sm_mt_24}`}>
                        <label htmlFor="username" className={styles.formLabel}>
                          Contact Number
                        </label>
                        <div>
                          <input
                            id="text"
                            name="username"
                            type="text"
                            autoComplete="username"
                            placeholder="Contact"
                            // value={username}
                            // onChange={(e) => {
                            //   setUsername(e.target.value);
                            // }}
                            required
                            className={styles.formInput}
                            onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
                            // formNoValidate={username === ''}
                          />
                        </div>
                      </div>
                      <div className={`${styles.width100} ${styles.mt_24}`}>
                        <label htmlFor="username" className={styles.formLabel}>
                          Email
                        </label>
                        <div>
                          <input
                            id="text"
                            name="username"
                            type="text"
                            autoComplete="username"
                            placeholder="Email"
                            // value={username}
                            // onChange={(e) => {
                            //   setUsername(e.target.value);
                            // }}
                            required
                            className={styles.formInput}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            // formNoValidate={username === ''}
                          />
                        </div>
                      </div>
                      <div className={`${styles.width100} ${styles.mt_24} ${styles.checkoutCheckbox}`}>
                        <label
                          className={`${styles.flexRow} ${styles.flexNoWrap} ${styles.alignCenter} ${styles.justifyStart} `}
                        >
                          <input type="checkbox" className={`${styles.checkbox} mr-3`} />
                          <p className="text-sm text-medium_black">
                            Keep me up to date on my orders and exclusive offers.
                          </p>
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className={`${styles.flexRow} ${styles.mt_14} ${styles.flexWrap} ${styles.checkoutBox}`}>
              <div className={`${styles.width100}`}>
                {/* <form className="" action="/" method="POST"> */}
                <div className="">
                  <div className={`${styles.flexRow} ${styles.flexWrap} ${styles.alignCenter} mb-0 sm:mb-[24px]`}>
                    <h4 className={`${styles.checkoutBoxHeader} ${styles.sm_w_100} ${styles.sm_m_0}`}>
                      Delivery Address
                    </h4>
                    <div>
                      {/* <div className={`${styles.width100} ${styles.checkoutCheckbox}`}>
                        <label
                          id="checkAddBillingAddress"
                          className={`${styles.flexRow} ${styles.flexNoWrap} ${styles.alignCenter} ${styles.justifyStart} `}
                        >
                          <input
                            type="checkbox"
                            className={`${styles.checkbox} cursor-pointer mr-3`}
                            defaultChecked={addBillingAddress}
                            onChange={() => setAddBillingAddress(!addBillingAddress)}
                            id="checkAddBillingAddress"
                          />
                          <p className={`text-sm text-medium_black cursor-pointer`}>I want to add billing address.</p>
                        </label>
                      </div> */}
                    </div>
                  </div>

                  <div
                    className={`${styles.flexRow} ${styles.flexWrap} ${styles.alignCenter} ${styles.mt_24} ${styles.deliveryAddressBox}`}
                  >
                    {deliveryAdresses.map((address, index) => (
                      <div className={`${styles.deliveryAddressItem}`}>
                        <label>
                          <input
                            type="radio"
                            name="selected_adderess"
                            onChange={(e) => setSelectedDeliveryAdresses(address)}
                            className={`cursor-pointer`}
                          />
                          <p>
                            {address.address} {address.city} {address.country}, {address.zipCode}
                          </p>
                        </label>
                        {/* <Link href={`/`}>Edit</Link> */}
                      </div>
                    ))}

                    <div className={`${styles.deliveryAddressItem}`}>
                      <label>
                        <input
                          onChange={() => setAddNewAddress((prev) => !prev)}
                          type="checkbox"
                          className={`cursor-pointer`}
                          checked={addNewAddress}
                        />
                        <p>Add New Address</p>
                      </label>
                    </div>
                  </div>

                  {addNewAddress && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div
                        ref={addNewAddressRef}
                        className={`${styles.flexRow} ${styles.flexWrap} ${styles.alignCenter} ${styles.mt_24} border-t border-[#c2c2c2]`}
                      >
                        <div className={`${styles.width100} ${styles.mt_24}`}>
                          <label htmlFor="username" className={styles.formLabel}>
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
                              {...register('address')}
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
                              {...register('city')}
                            />
                          </div>
                        </div>
                        <div
                          className={`${styles.pr_12} ${styles.width50} ${styles.mt_24} ${styles.checkoutSelect} ${styles.sm_w_100}`}
                        >
                          <Label label="Country" />
                          <MySelect
                            setState={(v) => setValue('country', v.value)}
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
                              type="text"
                              autoComplete="zipCode"
                              placeholder="Zip Code"
                              required
                              className={styles.formInput}
                              {...register('zipCode')}
                            />
                          </div>
                        </div>

                        <div className="mt-20px">
                          <PrimarySmall className="w-[168px] h-[44px] mr-10px mb-11px md:mb-0" text="Save Changes" />
                        </div>
                      </div>
                    </form>
                  )}
                </div>
                {/* </form> */}
              </div>
            </div>

            {addBillingAddress && (
              <div
                ref={addNewBillingAddressRef}
                className={`${styles.flexRow} ${styles.mt_14} ${styles.flexWrap} ${styles.checkoutBox}`}
              >
                <div className={`${styles.width100}`}>
                  <form className="" action="/" method="POST">
                    <div className="">
                      <div className={`${styles.flexRow} ${styles.flexWrap} ${styles.alignCenter} mb-0 sm:mb-[24px]`}>
                        <h4 className={`${styles.checkoutBoxHeader} ${styles.sm_w_100} ${styles.sm_m_0}`}>
                          Billing Address
                        </h4>
                      </div>

                      <div className={`${styles.flexRow} ${styles.flexWrap} ${styles.alignCenter} ${styles.mt_24}`}>
                        <div className={`${styles.width100} ${styles.mt_24}`}>
                          <label htmlFor="username" className={styles.formLabel}>
                            Address
                          </label>
                          <div>
                            <input
                              id="text"
                              name="username"
                              type="text"
                              autoComplete="username"
                              placeholder="Address"
                              required
                              className={styles.formInput}
                            />
                          </div>
                        </div>
                        <div className={`${styles.width100} ${styles.mt_24}`}>
                          <label htmlFor="username" className={styles.formLabel}>
                            Apartment, suite, etc.(optional)
                          </label>
                          <div>
                            <input
                              id="text"
                              name="username"
                              type="text"
                              autoComplete="username"
                              placeholder="Apartment, suite, etc.(optional)"
                              required
                              className={styles.formInput}
                            />
                          </div>
                        </div>
                        <div className={`${styles.width100} ${styles.mt_24}`}>
                          <label htmlFor="username" className={styles.formLabel}>
                            City / Suburb
                          </label>
                          <div>
                            <input
                              id="text"
                              name="username"
                              type="text"
                              autoComplete="username"
                              placeholder="City / Suburb"
                              required
                              className={styles.formInput}
                            />
                          </div>
                        </div>
                        <div
                          className={`${styles.pr_12} ${styles.width50} ${styles.mt_24} ${styles.checkoutSelect} ${styles.sm_w_100}`}
                        >
                          <label htmlFor="username" className={styles.formLabel}>
                            Full Name
                          </label>
                          <div>
                            <select name="cars" id="cars">
                              <option value="volvo">Volvo</option>
                              <option value="saab">Saab</option>
                              <option value="mercedes">Mercedes</option>
                              <option value="audi">Audi</option>
                            </select>
                          </div>
                        </div>
                        <div className={`${styles.width50} ${styles.mt_24} ${styles.sm_w_100}`}>
                          <label htmlFor="username" className={styles.formLabel}>
                            Zip Code
                          </label>
                          <div>
                            <input
                              id="text"
                              name="username"
                              type="text"
                              autoComplete="username"
                              placeholder="Zip Code"
                              required
                              className={styles.formInput}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-20px">
                        <PrimarySmall className="w-[168px] h-[44px] mr-10px mb-11px md:mb-0" text="Save Changes" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className={`${styles.flexRow} ${styles.mt_14} ${styles.flexWrap} ${styles.checkoutBox}`}>
              <div className={`${styles.width100}`}>
                <form className="" action="/" method="POST">
                  <div className="">
                    <div className={`${styles.flexRow} ${styles.flexWrap} ${styles.alignCenter}`}>
                      <h4
                        className={`${styles.width100} ${styles.checkoutBoxHeader} ${styles.sm_w_100} ${styles.sm_m_0}`}
                      >
                        Select Payment Type
                      </h4>
                    </div>

                    <div className={styles.payment}>
                      <div className={styles.image}>
                        <Image src={sheldImg} alt="sheld" className="w-10 h-10" />
                      </div>
                      <p className={styles.description}>Safe and secure Payments.</p>
                    </div>

                    <div className={`${styles.flexRow} ${styles.flexWrap} ${styles.alignCenter} ${styles.mt_24}`}>
                      <div className={`${styles.width100}`} onClick={() => setState('payment_method_card')}>
                        <div
                          className={`${styles.payment_method_box} ${
                            state == 'payment_method_card' ? styles.payment_method_box_active : ''
                          }`}
                        >
                          <h4>Credit or Debit Card</h4>

                          {state == 'payment_method_card' ? (
                            <div className={`${styles.width100} ${styles.mt_14}`}>
                              <label htmlFor="username" className={styles.formLabel}>
                                Number
                              </label>
                              <div>
                                <input
                                  id="text"
                                  name="username"
                                  type="text"
                                  autoComplete="username"
                                  placeholder="Number"
                                  // value={username}
                                  // onChange={(e) => {
                                  //   setUsername(e.target.value);
                                  // }}
                                  required
                                  className={styles.formInput}
                                  // formNoValidate={username === ''}
                                />
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>

                      <div
                        className={`${styles.width100} ${styles.mt_14}`}
                        onClick={() => setState('payment_method_paypal')}
                      >
                        <div
                          className={`${styles.payment_method_box} ${
                            state == 'payment_method_paypal' ? styles.payment_method_box_active : ''
                          }`}
                        >
                          <h4>Paypal</h4>

                          {state == 'payment_method_paypal' ? (
                            <div className={`${styles.width100} ${styles.mt_14}`}>
                              <label htmlFor="username" className={styles.formLabel}>
                                Number
                              </label>
                              <div>
                                <input
                                  id="text"
                                  name="username"
                                  type="text"
                                  autoComplete="username"
                                  placeholder="Number"
                                  // value={username}
                                  // onChange={(e) => {
                                  //   setUsername(e.target.value);
                                  // }}
                                  required
                                  className={styles.formInput}
                                  // formNoValidate={username === ''}
                                />
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>

                      <div
                        className={`${styles.width100} ${styles.mt_14}`}
                        onClick={() => setState('payment_method_gpay')}
                      >
                        <div
                          className={`${styles.payment_method_box} ${
                            state == 'payment_method_gpay' ? styles.payment_method_box_active : ''
                          }`}
                        >
                          <h4>Google Pay</h4>

                          {state == 'payment_method_gpay' ? (
                            <div className={`${styles.width100} ${styles.mt_14}`}>
                              <label htmlFor="username" className={styles.formLabel}>
                                Number
                              </label>
                              <div>
                                <input
                                  id="text"
                                  name="username"
                                  type="text"
                                  autoComplete="username"
                                  placeholder="Number"
                                  // value={username}
                                  // onChange={(e) => {
                                  //   setUsername(e.target.value);
                                  // }}
                                  required
                                  className={styles.formInput}
                                  // formNoValidate={username === ''}
                                />
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>

                      <div
                        className={`${styles.width100} ${styles.mt_14}`}
                        onClick={() => setState('payment_method_applepay')}
                      >
                        <div
                          className={`${styles.payment_method_box} ${
                            state == 'payment_method_applepay' ? styles.payment_method_box_active : ''
                          }`}
                        >
                          <h4>Apple Pay</h4>

                          {state == 'payment_method_applepay' ? (
                            <div className={`${styles.width100} ${styles.mt_14}`}>
                              <label htmlFor="username" className={styles.formLabel}>
                                Number
                              </label>
                              <div>
                                <input
                                  id="text"
                                  name="username"
                                  type="text"
                                  autoComplete="username"
                                  placeholder="Number"
                                  // value={username}
                                  // onChange={(e) => {
                                  //   setUsername(e.target.value);
                                  // }}
                                  required
                                  className={styles.formInput}
                                  // formNoValidate={username === ''}
                                />
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={`${styles.flexRow} ${styles.flexWrap} ${styles.alignCenter} ${styles.mt_24}`}>
                      <div className={`${styles.TotalOrder} ${styles.width50} ${styles.md_w_100}`}>
                        Order Total $<CartTotalDynamic />
                      </div>
                      <div
                        className={`${styles.width50} ${styles.text_right} ${styles.md_w_100} ${styles.md_text_left} ${styles.sm_text_center}`}
                      >
                        <button
                          type="button"
                          onClick={placeOrder}
                          className={`${styles.ContinueButton} ${styles.md_mt_12} ${styles.sm_text_center}`}
                        >
                          Pay & Continue
                        </button>
                      </div>
                    </div>

                    <span className={styles.urlText3}>
                      By clicking on Pay & Confirm you agree to VitalPawz T&C and Privacy Policy.
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.width10} ${styles.md_w_100}`}></div>

        <div className={`${styles.width40} ${styles.md_w_100}`}>
          <div className={styles.payment}>
            <div className={styles.image}>
              <Image src={sheldImg} alt="sheld" className="w-10 h-10" />
            </div>
            <p className={styles.description}>Safe and secure Payments. 100% Authnetic products.</p>
          </div>

          <div
            className={`${styles.flexRow} ${styles.mt_14} ${styles.flexWrap} ${styles.checkoutBox} ${styles.order_summary}`}
          >
            <div className={`${styles.width100}`}>
              <div className={`${styles.flexRow} ${styles.flexWrap} ${styles.alignCenter}`}>
                <h4 className={`${styles.checkoutBoxHeader} ${styles.sm_w_100} ${styles.sm_m_0}`}>Order Summary</h4>
              </div>
            </div>

            {cartData?.map((singleCartData) => (
              <CartInfoDynamic data={singleCartData} />
            ))}

            <div className={`${styles.width100} ${styles.mt_24} ${styles.order_item}`}>
              <div className={`${styles.flexRow} ${styles.flexWrap}`}>
                <div className={`${styles.width50} `}>
                  <span className={`${styles.order_price}`}>Subtotal</span>
                </div>
                <div className={`${styles.width50} text-right`}>
                  <span className={`${styles.order_price}`}>
                    $<CartTotalDynamic />
                  </span>
                </div>
              </div>
              <div className={`${styles.flexRow} ${styles.flexWrap}`}>
                <div className={`${styles.width50} `}>
                  <span className={`${styles.order_price}`}>Shipping</span>
                </div>
                <div className={`${styles.width50} text-right`}>
                  <span className={`${styles.order_price}`}>Free</span>
                </div>
              </div>
            </div>

            <div className={`border-none ${styles.width100} ${styles.mt_24} ${styles.pb_24} `}>
              <div className={`${styles.flexRow} ${styles.flexWrap}`}>
                <div className={`${styles.width50} `}>
                  <span className={`${styles.order_price}`}>Total</span>
                </div>
                <div className={`${styles.width50} text-right`}>
                  <span className={`${styles.order_price_total}`}>
                    $<CartTotalDynamic />
                  </span>
                </div>
              </div>
            </div>

            <div className={`border-none ${styles.width100} ${styles.discount_box} ${styles.sm_text_center}`}>
              <input
                id="text"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Gift or Discount Code"
                required
                className={styles.discount_input}
              />
              <button className={styles.ContinueButton}>Apply</button>
            </div>

            <div className={styles.rewards}>You will earn: 20 points</div>
          </div>
        </div>
      </div>

      {/* <Footer />
      <CookieConsent
        location="bottom"
        buttonText="Yes i accept cookies"
        cookieName="myAwesomeCookieName2"
        debug={true}
        disableStyles={true}
        style={{
          position: 'fixed',
          background: '#fff',
          width: '600px',
          height: '192px',
          color: 'black',
          display: 'flex',
          flexDirection: 'column',
          padding: '28px',
          zIndex: '999',
          borderRadius: '20px',
        }}
        contentStyle={{
          padding: '0',
          fontFamily: 'PlusJakartaSans',
          fontSize: '16px',
          fontWeight: 'normal',
          fontStretch: 'normal',
          fontStyle: 'normal',
          lineHeight: '1.5',
          letterSpacing: 'normal',
          color: '#3b3b3b',
        }}
        buttonStyle={{
          width: '185px',
          height: '44px',
          backgroundColor: '#f8b84a',
          fontSize: '14px',
          fontFamily: 'PlusJakartaSans',
          fontWeight: 'bold',
          fontStretch: 'normal',
          fontStyle: 'normal',
          lineHeight: 'normal',
          letterSpacing: '0.28px',
          textAlign: 'center',
          color: '#4a2072',
          borderRadius: '5px',
          padding: '5px 15px',
          margin: '20px 0 0 0',
        }}
        expires={150}
      >
        <b>We use cookies to make your VitalPawz shopping experience better.</b>
        <br />
        By using our site, you agree to our privacy policy. Click Continue or just keep browsing to accept.
        <mark style={{ background: '#fff', color: '#4a2072', fontWeight: 'bold', cursor: 'pointer' }}>Learn more</mark>.
      </CookieConsent> */}
    </div>
  );
};

// Home.getLayout = function getLayout(page) {
//   return <MainLayout>{page}</MainLayout>;
// };

Checkout.Layout = MainLayout;

export const getServerSideProps = createGetServerSidePropsFn(Checkout);

export default Checkout;

// export default Checkout;
