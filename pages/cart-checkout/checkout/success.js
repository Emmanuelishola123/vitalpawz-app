import React from 'react';

import styles from 'styles/cart-checkout/checkout/success/style.module.scss';
import sheldImg from '@/public/img/logo/icon-40-shield.svg';
import Image from 'next/image';
import CartItemPreview from '@/components/CartItems/images/cartItemPreview.png';
import MainLayout from 'layouts/MainLayout';
import createGetServerSidePropsFn from 'shared/createGetServerSidePropsFn';
import crown from 'public/img/cart-checkout/crown.svg';
import Link from 'next/link';

const Checkout = () => {
  return (
    <div className={styles.mainBody}>
      <div className={styles.wrapper}>
        <div className={`${styles.width60} ${styles.md_w_100} pr-0 lg:pr-[64px]`}>
          <div>
            <div className={`${styles.flexRow} ${styles.mt_14} ${styles.flexWrap} ${styles.checkoutBox}`}>
              <div className={`${styles.width100}`}>
                <form className="" action="/" method="POST">
                  <div className="">
                    <div className={`${styles.reward_box}`}>
                      <h4 className={`${styles.checkoutBoxHeader2} ${styles.sm_m_0}`}>Thank you Elizabeth!</h4>
                      <h4 className={`${styles.checkoutBoxHeader3}`}>
                        Your earned <b>100</b> <Image alt="Reward Crown Icon" src={crown} width={24} height={24} />{' '}
                        rewards points on this order
                      </h4>
                      <p className={`${styles.order_desc}`}>
                        We’ll email you an order confirmation with the details and tracking info.
                      </p>
                      <div className={`mt-[24px]`}>
                        <button className={`${styles.ContinueButton}`}>Continue shopping</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div>
            <div className={`${styles.flexRow} ${styles.mt_14} ${styles.flexWrap} ${styles.checkoutBox}`}>
              <div className={`${styles.width100}`}>
                <form className="" action="/" method="POST">
                  <div className={`${styles.order_summary2}`}>
                    <div className={`${styles.flexRow} ${styles.flexWrap} ${styles.alignCenter}`}>
                      <h4 className={`${styles.checkoutBoxHeader} ${styles.sm_w_100} ${styles.sm_m_0}`}>
                        Your Details
                      </h4>
                    </div>

                    <div
                      className={`${styles.flexRow} ${styles.flexWrap} ${styles.alignCenter} ${styles.mt_24} ${styles.order_totals}`}
                    >
                      <div>
                        Order <b>#1234156</b>
                      </div>
                      <div>
                        Total <b>$96.98</b>
                      </div>
                    </div>

                    <div
                      className={`${styles.flexRow} ${styles.flexWrap} ${styles.alignCenter} ${styles.mt_24} ${styles.total_items}`}
                    >
                      <div>
                        Total items <br /> <b>12</b>
                      </div>
                      <div>
                        Payment <br /> <b>Paid</b>
                      </div>
                      <div>
                        Rewards <Image alt="Reward Crown Icon" src={crown} width={16} height={16} /> <br /> <b>$3.56</b>
                      </div>
                    </div>

                    <div className={`${styles.flexRow} ${styles.flexWrap} ${styles.alignCenter} ${styles.order_items}`}>
                      <div className={`${styles.order_img}`}>
                        <Image src={CartItemPreview} alt="arrow down" />
                      </div>
                      <div className={`${styles.order_img}`}>
                        <Image src={CartItemPreview} alt="arrow down" />
                      </div>
                      <div className={`${styles.order_img}`}>
                        <Image src={CartItemPreview} alt="arrow down" />
                      </div>
                      <div className={`${styles.order_img}`}>
                        <Image src={CartItemPreview} alt="arrow down" />
                      </div>
                      <div>
                        <h4 className={`${styles.order_title} font-bold mb-[4px]`}>+5 more</h4>
                        <Link href={`/`} className={`${styles.order_title} underline`}>
                          View Details
                        </Link>
                      </div>
                    </div>

                    <div className={`${styles.flexRow} ${styles.flexWrap} ${styles.alignCenter} mt-[16px]`}>
                      <button className={`${styles.download_invoice_btn}`}>Download Invoice</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div>
            <div className={`${styles.flexRow} ${styles.mt_14} ${styles.flexWrap} ${styles.checkoutBox}`}>
              <div className={`${styles.width100}`}>
                <form className="" action="/" method="POST">
                  <div className={`${styles.show_delivery_address}`}>
                    <div
                      className={`${styles.flexRow} ${styles.flexWrap} ${styles.alignCenter} ${styles.show_delivery_address_box}`}
                    >
                      <h4 className={`${styles.checkoutBoxHeader} ${styles.sm_w_100} ${styles.sm_m_0}`}>
                        Delivery address
                      </h4>
                      <div className={`${styles.delivery_info}`}>
                        <b>Elizabeth Collins,</b> 3335 Angus Road, New York, 10014
                      </div>
                    </div>
                    <div
                      className={`${styles.flexRow} ${styles.flexWrap} ${styles.alignCenter} ${styles.show_delivery_address_accountInfo}`}
                    >
                      <div>
                        <h4 className={`${styles.checkoutBoxHeader} ${styles.sm_w_100} ${styles.sm_m_0}`}>
                          Account information
                        </h4>
                      </div>
                      <div className={`${styles.show_delivery_address_accountInfo2}`}>
                        <div>Full Name:</div>
                        <div>Elizabeth Collins</div>
                      </div>
                      <div className={`${styles.show_delivery_address_accountInfo2}`}>
                        <div>Email:</div>
                        <div>elizabeth.collins@gmail.com</div>
                      </div>
                      <div className={`${styles.show_delivery_address_accountInfo2}`}>
                        <div>Phone:</div>
                        <div>701-331-0739</div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* <div className={`${styles.width10} ${styles.md_w_100}`}></div> */}

        <div className={`${styles.width40} ${styles.md_w_100}`}>
          <div
            className={`${styles.flexRow} ${styles.mt_14} ${styles.flexWrap} ${styles.checkoutBox} ${styles.order_summary} ${styles.product_interested}`}
          >
            <div className={`${styles.width100}`}>
              <div className={`${styles.flexRow} ${styles.flexWrap} ${styles.alignCenter}`}>
                <h4 className={`${styles.checkoutBoxHeader} ${styles.sm_w_100} ${styles.sm_m_0}`}>
                  You may be intrested in
                </h4>
              </div>
            </div>

            <div className={`${styles.width100} ${styles.mt_24} ${styles.order_item}`}>
              <div className={`${styles.flexRow} ${styles.flexWrap}`}>
                <div className={`${styles.width20} ${styles.sm_w_100} ${styles.sm_text_center}`}>
                  <Image src={CartItemPreview} alt="arrow down" />
                </div>
                <div className={`${styles.width80} ${styles.sm_w_100} ${styles.sm_text_center} flex-0`}>
                  <h4 className={`${styles.order_title}`}>Suritypro Calm Smoky Bacon Flavor Soft Chews</h4>
                  <span className={`${styles.order_desc}`}>Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews</span>

                  <div className={`${styles.price_addToCart}`}>
                    <div>
                      <span className={`${styles.order_price} text-right`}>$23.99</span>
                    </div>
                    <div>
                      <button className={`${styles.ContinueButton}`}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.width100} ${styles.mt_24} ${styles.order_item}`}>
              <div className={`${styles.flexRow} ${styles.flexWrap}`}>
                <div className={`${styles.width20} ${styles.sm_w_100} ${styles.sm_text_center}`}>
                  <Image src={CartItemPreview} alt="arrow down" />
                </div>
                <div className={`${styles.width80} ${styles.sm_w_100} ${styles.sm_text_center} flex-0`}>
                  <h4 className={`${styles.order_title}`}>Suritypro Calm Smoky Bacon Flavor Soft Chews</h4>
                  <span className={`${styles.order_desc}`}>Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews</span>

                  <div className={`${styles.price_addToCart}`}>
                    <div>
                      <span className={`${styles.order_price} text-right`}>$23.99</span>
                    </div>
                    <div>
                      <button className={`${styles.ContinueButton}`}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.width100} ${styles.mt_24} ${styles.order_item}`}>
              <div className={`${styles.flexRow} ${styles.flexWrap}`}>
                <div className={`${styles.width20} ${styles.sm_w_100} ${styles.sm_text_center}`}>
                  <Image src={CartItemPreview} alt="arrow down" />
                </div>
                <div className={`${styles.width80} ${styles.sm_w_100} ${styles.sm_text_center} flex-0`}>
                  <h4 className={`${styles.order_title}`}>Suritypro Calm Smoky Bacon Flavor Soft Chews</h4>
                  <span className={`${styles.order_desc}`}>Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews</span>

                  <div className={`${styles.price_addToCart}`}>
                    <div>
                      <span className={`${styles.order_price} text-right`}>$23.99</span>
                    </div>
                    <div>
                      <button className={`${styles.ContinueButton}`}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Checkout.Layout = MainLayout;

export const getServerSideProps = createGetServerSidePropsFn(Checkout);

export default Checkout;

// export default Checkout;
