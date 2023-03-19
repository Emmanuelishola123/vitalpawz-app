import React, { useContext } from 'react';
import Link from 'next/link';
import { UserContext } from 'contexts/user.context';
// import styles from "styles/Product.module.css";
import styles from 'styles/Product.module.scss';
import classNames from 'classnames';
import { useCartState } from '../app/atom/cart.atom';
import { addToCart } from '../features/cart/useCartService';
import { toast } from 'react-toastify';

const Product = ({ item, classname }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const userContext = useContext(UserContext);

  const [cart, setCart] = useCartState();
  const handleAddToCart = (product) => {
    const newCart = addToCart(cart, product, 1);
    setCart(newCart);

    toast.clearWaitingQueue();
    toast.success('Added to Cart.', { toastId: 'notification' });
  };
  return (
    <div className={classNames(styles.wrapper, classname)}>
      <a
        type="submit"
        onClick={() => {
          userContext.setUrl(item.cover);
        }}
        className={styles.item}
      >
        <Link href={`/product/${item.slug}`} scroll={true}>
          <img alt="img" src={item.cover} className={styles.item_img} />
        </Link>
        <div className={styles.textWrapper}>
          <Link href={`/product/${item.slug}`} scroll={true}>
            <p className={styles.item_title}>{item.title}</p>
          </Link>

          <p className={styles.item_text}>{item.excerpt}</p>
        </div>
        <div className={styles.addCart_field}>
          <div className={styles.price}>${item.sale_price}</div>
          <button className={styles.addcart} onClick={() => handleAddToCart(item)}>
            Add to Cart
          </button>
        </div>
        {item.type === 'popular' && (
          <div>
            <div className={styles.popular}>Popular</div>
          </div>
        )}
        {item.type === 'new' && (
          <div>
            <div className={styles.popular}>New</div>
          </div>
        )}
        {item.type === 'featured' ||
          (item.type === 'Featured' && (
            <div>
              <div className={styles.popular}>Featured</div>
            </div>
          ))}
      </a>
    </div>
  );
};

export default Product;
