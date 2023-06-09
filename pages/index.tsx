import Script from 'next/script';
import HeroSection from 'components/HeroSection';
import Features from 'components/Features';
import ShopByConcern from 'components/ShopByConcern';
import QualityIngredients from 'components/QualityIngredients';
import WhyUs from 'components/WhyUs';
import Feedback from 'components/Feedback';
import HowItWorks from 'components/HowItWorks';
import InstagramFollow from 'components/InstagramFollow';
import Search from 'components/Search';
import TopSellingProducts from 'components/TopSellingProducts';
import RecentBlogs from 'components/RecentBlogs';
import CookieConsent from 'react-cookie-consent';

import MainLayout from 'layouts/MainLayout';
import { NextPageWithLayout } from 'types/next.types';
import createGetServerSidePropsFn from 'shared/createGetServerSidePropsFn';
import { getRequestSwr } from 'requests/api';
import { IHomePageResponse } from 'types/responses/homePage.response';
import { getEnv } from '@/bootstrap/app.config';
import { useRecoilState } from 'recoil';
import { categoriesAtom } from '@/app/atom/catsAtom';
import { useEffect } from 'react';
import { smartSearchBrandsAtom, smartSearchProductsAtom, smartSearchAtomState } from '@/app/atom/smartSearchAtom';
import useWindowDimensions from '@/app/hooks/useWindowDimensions';
import { MdClose } from 'react-icons/md';

const bugherdUrl = 'https://www.bugherd.com/sidebarv2.js?apikey=' + getEnv('bugherdKey');

const HomePage: NextPageWithLayout = () => {
  // All Request Data
  const response: any = getRequestSwr<IHomePageResponse>('/home');
  const productsResponse = getRequestSwr<IHomePageResponse>('/products');
  const products: any = productsResponse || [];
  const recent_blogs = response?.recent_blogs;
  const featuredProducts = response?.featured_products || [];
  const popularProducts = response?.most_popular_products || [];
  const deals = response?.today_deals || [];
  const topSellingProducts = response?.top_selling_products;

  // Setting Recoil Values
  const { width } = useWindowDimensions();
  const [, setProductsToAtom] = useRecoilState(smartSearchProductsAtom);
  const [, setBrandsToAtom] = useRecoilState(smartSearchBrandsAtom);
  const [smartSearchState, setSmartSearchState] = useRecoilState(smartSearchAtomState);
  const handleSetSmartSearchState = () => {
    if (smartSearchState === false) return;
    setSmartSearchState(false);
  };

  useEffect(() => {
    setProductsToAtom(products?.data);
  }, [products]);
  useEffect(() => {
    setBrandsToAtom(products?.meta?.brands);
  }, [products]);

  return (
    <div onClick={handleSetSmartSearchState}>
      <Search />
      <HeroSection width={width} />
      <Features />
      <div className="my-14">
        <ShopByConcern />
      </div>
      <TopSellingProducts products={response && topSellingProducts && topSellingProducts.slice(0, 4)} />
      <QualityIngredients />
      <WhyUs />
      <Feedback />
      <HowItWorks width={width} />
      <RecentBlogs recentBlogs={recent_blogs} />
      <InstagramFollow />
      {width && width > 600 ? (
        <CookieConsent
          location="bottom"
          buttonText="Yes i accept cookies"
          declineButtonText={<CookieDecliceButton />}
          cookieName="myAwesomeCookieName2"
          debug={true}
          disableStyles={true}
          enableDeclineButton
          style={{
            boxShadow: '0 2px 16px 0 rgba(0, 0, 0, 0.06)',
            margin: '0 0 20px 15px',
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
          declineButtonStyle={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
          expires={150}
        >
          <b>We use cookies to make your VitalPawz shopping experience better.</b>
          <br />
          By using our site, you agree to our privacy policy. Click Continue or just keep browsing to accept.
          <mark style={{ background: '#fff', color: '#4a2072', fontWeight: 'bold', cursor: 'pointer' }}>
            Learn more
          </mark>
          .
        </CookieConsent>
      ) : (
        <CookieConsent
          location="bottom"
          buttonText="Yes i accept cookies"
          cookieName="myAwesomeCookieName2"
          debug={true}
          disableStyles={true}
          declineButtonStyle={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
          declineButtonText={<CookieDecliceButton buttonSize={20} />}
          enableDeclineButton
          style={{
            boxShadow: '0 2px 16px 0 rgba(0, 0, 0, 0.06)',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            margin: '10px',
            background: '#fff',
            height: '192px',
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            padding: '15px 28px 15px 28px',
            zIndex: '999',
            borderRadius: '20px',
          }}
          contentStyle={{
            padding: '0',
            fontFamily: 'PlusJakartaSans',
            fontSize: '13px',
            flexGrow: 1,
            fontWeight: 'normal',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: '1.5',
            letterSpacing: 'normal',
            color: '#3b3b3b',
          }}
          buttonStyle={{
            width: '100%',
            height: '36px',
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
          }}
          expires={150}
        >
          <b>We use cookies to make your VitalPawz shopping experience better.</b>
          <br />
          By using our site, you agree to our privacy policy. Click Continue or just keep browsing to accept.
          <mark style={{ background: '#fff', color: '#4a2072', fontWeight: 'bold', cursor: 'pointer' }}>
            Learn more
          </mark>
          .
        </CookieConsent>
      )}

      {getEnv('bugherdKey') && <Script src={bugherdUrl} strategy="lazyOnload" />}
    </div>
  );
};

const CookieDecliceButton = ({ buttonSize = 25 }) => {
  return <MdClose color="#4a2072" size={buttonSize} />;
};


HomePage.Layout = MainLayout;

export const getServerSideProps = createGetServerSidePropsFn(HomePage);

export default HomePage;
