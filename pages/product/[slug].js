import React, { useLayoutEffect, useState, useEffect } from 'react';
import styles from '../../styles/product/Home.module.css';
import MainLayout from 'layouts/MainLayoutWoFooter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SurityPro from './components/SurityPro';
import Description from './components/Description';
import IconSection from './components/IconSection';
import ReviewSection from './components/ReviewSection';
import YouLikeSection from './components/YouLikeSection';
import FooterModal from './components/FooterModal';
import FooterBottom from '../../components/FooterBottom';
import CookieConsent from 'react-cookie-consent';
import createGetServerSidePropsFn from 'shared/createGetServerSidePropsFn';
import { useRouter } from 'next/router';
import { getRequest } from 'requests/api';
import { useCartState } from '../../app/atom/cart.atom';
import { addToCart } from '../../features/cart/useCartService';
import { toast } from 'react-toastify';

const Home = ({ singleProductData, variations }) => {
  const [scrollFooter, setScroll] = useState(false);
  const [footerModalActive, setFooterModalActive] = useState(false);
  const { product, related_products } = singleProductData;
  const [countState, setCount] = useState(1);
  const [cart, setCart] = useCartState();

  const decrease = () => {
    countState = Math.max(1, countState - 1);
    setCount(countState);
  };
  const increase = () => {
    countState = countState + 1;
    setCount(countState);
  };

  useEffect(() => {
    const handleScroll = () => {
      let height = document.body.scrollHeight - window.innerHeight;
      // console.log('height', height - window.pageYOffset);
      if (height <= window.pageYOffset + 2100) {
        setScroll(true);
      } else if (height - window.pageYOffset > 2100) {
        setScroll(false);
      }
    };
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, []);

  const handleAddToCart = () => {
    const newCart = addToCart(cart, product, countState);
    setCart(newCart);
    setCount(1);

    toast.clearWaitingQueue();
    toast.success('Added to Cart.', { toastId: 'notification' });
  };

  console.log('singleProductData', singleProductData);
  console.log('variations::::::::::::::::::::::::::::', variations);

  return (
    <div className={styles.home}>
      <SurityPro
        product={product}
        countState={countState}
        increase={increase}
        decrease={decrease}
        handleAddToCart={handleAddToCart}
      />
      <Description product={product} />
      <IconSection />
      <ReviewSection />
      <YouLikeSection related_products={related_products} />
      <Footer />
      {scrollFooter && <FooterModal active={footerModalActive} setActive={setFooterModalActive} />}
      {scrollFooter && (
        <div
          className="fixed w-full bottom-0 left-0 bg-white"
          style={{
            boxShadow: scrollFooter ? '0 2px 16px 0 rgba(0, 0, 0, 0.06)' : 'none',
          }}
        >
          <FooterBottom
            setActive={setFooterModalActive}
            product={product}
            countState={countState}
            increase={increase}
            decrease={decrease}
            handleAddToCart={handleAddToCart}
          />
        </div>
      )}
    </div>
  );
};

Home.Layout = MainLayout;

// export const getServerSideProps = createGetServerSidePropsFn(Home);

export const getServerSideProps = createGetServerSidePropsFn(Home, async ({ params }) => {
  const response = await getRequest(`/products/${params?.slug}`);
  const variations = await getRequest(`/products/variations/price/${response?.product?.id}`);
  return {
    props: {
      singleProductData: response || [],
      variations: variations || [],
    },
  };
});

export default Home;
