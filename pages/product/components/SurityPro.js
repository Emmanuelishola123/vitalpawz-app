import { useState, useContext } from 'react';
import styles from '../../../styles/product/SurityPro.module.css';
import Image from 'next/image';
import canopy from '../../../public/img/HomePage/bitmap.png';
import facebookIcon from '../../../public/img/HomePage/045-facebook.png';
import tweetIcon from '../../../public/img/HomePage/013-twitter-1.png';
import pinIcon from '../../../public/img/HomePage/026-pinterest.png';
import ReviewIcon from '../../../public/img/HomePage/path.png';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { UserContext } from 'contexts/user.context';
import MySelect from '@/components/CartItems/componentsCartItem/MySelect';
import classNames from 'classnames';
// eslint-disable-next-line react-hooks/rules-of-hooks
// const imgs = [
//   { id: 0, url: '/img/HomePage/rectangle.png' },
//   { id: 1, url: '/img/HomePage/rectangle.png' },
//   { id: 2, url: '/img/HomePage/rectangle.png' },
//   { id: 3, url: '/img/HomePage/rectangle.png' },
// ];

const selectValues = [
  { value: '1 month', label: '1 month' },
  { value: '2 month', label: '2 month' },
  { value: '3 month', label: '3 month' },
  { value: '4 month', label: '4 month' },
  { value: '5 month', label: '5 month' },
  { value: '6 month', label: '6 month' },
];

export default function SurityPro({ product, countState, increase, decrease, handleAddToCart }) {
  const imgs = [{ id: 0, url: product?.cover }, ...(product?.gallery?.data ?? [])];
  // const userContext = useContext(UserContext);
  // imgs[0].url = userContext.url;
  const description = {
    price: product?.sale_price,
    regular_price: product?.regular_price,
    text: product?.excerpt,
    comment: 'Free Shipping on orders above $20',
    review: 42,
    discount: { ...(product?.discount ?? []) },
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.urlText}>Home{product?.categories.map((cat) => ` / ${cat?.name}`)}</span>
      <div className={styles.body}>
        <h4 className={styles.title}>{product?.title}</h4>
        <div className={styles.brand}>
          <div className={styles.brand_body}>
            <span>
              <span className={styles.boldText}>Brand</span>
              <span className="">: {product?.brand?.name} </span>
            </span>
            <img alt="img" src="/img/HomePage/bitmap.png" className={styles.brand_logo} />
          </div>
        </div>
        <MainBody
          description={description}
          imgs={imgs}
          countState={countState}
          increase={increase}
          decrease={decrease}
          handleAddToCart={handleAddToCart}
          configurations={product?.configurations}
        />
      </div>
    </div>
  );
}

function MainBody({ description, imgs, countState, increase, decrease, handleAddToCart, configurations }) {
  const [imgState, setImg] = useState(0);

  return (
    <div className={`${styles.flexRow} ${styles.mt_32} ${styles.flexWrap}`}>
      <div className={`${styles.width55} ${styles.surity_imgField}`}>
        <div className={styles.MenuSection}>
          {imgs.map((img, i) => (
            <div
              className={imgState == img?.id ? styles.active_border_img : styles.border_img}
              key={img?.id}
              onClick={() => setImg(img?.id)}
            >
              <img alt="img" className={styles.menuImg} src={img.url} />
            </div>
          ))}
        </div>
        {imgs.map((img, i) => (
          <div className={`${styles.width}`} key={i}>
            {imgState == img.id ? (
              <div className={imgState == 0 ? styles.ImgSection0 : styles.ImgSection}>
                <img alt="img" className={styles.bigImg_item} src={img.url} />
                <div className={styles.imgSliderDotsWrapper}>
                  {imgs.map((img, i) => (
                    <div
                      className={`${styles.imgSliderDot} ${imgState == img.id ? styles.imgSliderDotActive : ''}`}
                      onClick={() => setImg(img?.id)}
                    ></div>
                  ))}
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
      <div className={styles.DecSection}>
        <Description
          imgState={imgState}
          description={description}
          countState={countState}
          increase={increase}
          decrease={decrease}
          handleAddToCart={handleAddToCart}
          configurations={configurations}
        />
      </div>
    </div>
  );
}

function Description(props) {
  const { imgState, description, countState, increase, decrease, handleAddToCart, configurations } = props;
  const [packState, setPack] = useState(null);
  const [buyOptionState, setBuyOption] = useState(1);
  const [selectSubscriptionTime, setSelectSubscriptionTime] = useState('1 moth');

  return (
    <>
      <div>
        {
          <div className={styles.flexCol}>
            <div className={styles.price_review}>
              <div className={styles.flexCol}>
                <div className={styles.mainPrice}>
                  <div className={styles.mainPrice}>$ {description?.price}</div>
                  {description?.price < description?.regular_price && (
                    <>
                      <div className={styles.mainPrice_off}>${description?.regular_price}</div>
                      <div className={styles.percent_off}>{description?.discount?.percentage}% OFF</div>
                    </>
                  )}
                </div>
                <div className={styles.reviewDec_text}>{description.comment}</div>
              </div>
              <div className={styles.review_field}>
                <div className={styles.review}>
                  {[...Array(5)].map((x, i) => (
                    <div key={i} className={styles.reviewImg}>
                      <Image alt="logo" src={ReviewIcon} width={22} height={22} key={i} />
                    </div>
                  ))}
                </div>
                <div className={styles.reviewDec_count}>{description.review} reviews</div>
              </div>
            </div>
            <div className={styles.prodectDec}>{description.text}</div>
            {configurations?.map((config) => (
              <>
                <div className={styles.packSize}>{config?.label}</div>
                <div className={styles.packField}>
                  {config?.options?.map((opt) => (
                    <div
                      onClick={() => setPack(opt?.id)}
                      className={
                        packState == opt?.id
                          ? `${styles.pack_active_border} ${styles.width50}`
                          : `${styles.pack_border} ${styles.width50}`
                      }
                    >
                      <span className={packState == opt?.id ? styles.active_smallFont : styles.smallFont}>
                        {opt?.value}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ))}

            <div className={styles.packSize}>Buy Option</div>
            <div className={styles.buySection}>
              <div
                onClick={() => setBuyOption(1)}
                className={
                  buyOptionState == 1
                    ? `${styles.buy_left_border} ${styles.width40} ${styles.active_border}`
                    : `${styles.buy_left_border} ${styles.width40}`
                }
              >
                <span className={styles.price}>$99.99</span> <br></br>
                <span className={styles.smallFont}>One-time purchase</span>
              </div>
              <div
                onClick={() => setBuyOption(2)}
                className={
                  buyOptionState == 2
                    ? `${styles.buy_right_border} ${styles.width60} ${styles.active_border}`
                    : `${styles.buy_right_border} ${styles.width60}`
                }
              >
                <span>
                  <sapn className={styles.price}>$99.99</sapn>
                  <span className={styles.smallFont}>Subscribe and </span>
                  <span className={styles.redFont}>Save 10%</span>
                </span>
                <br />
                <span className={classNames(styles.smallFont, styles.smallFontDisplayFlex)}>
                  <span>Deliver every</span>
                  <MySelect
                    classNamePrefix="productMonthSelect"
                    state={selectSubscriptionTime}
                    setState={setSelectSubscriptionTime}
                    optionsArr={selectValues}
                  />
                </span>
              </div>
            </div>
            <div className={styles.flexRow}>
              <div className={styles.addCart_count}>
                <div onClick={decrease} className={countState == 1 ? styles.dis_minus : styles.act_minus}>
                  <BiMinus />
                </div>
                <div className={styles.addCart_count_num}>{countState}</div>
                <div onClick={increase} className={styles.plus}>
                  <BiPlus />
                </div>
              </div>
              <button onClick={handleAddToCart} className={styles.addCartField}>
                Add to cart $ {description?.price}
              </button>
            </div>
            <div className={`${styles.border} !mt-6`}></div>
          </div>
        }
      </div>
    </>
  );
}
