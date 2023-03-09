import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import iconMenu from 'public/img/header/icon-hamburder-menu.svg';
import logo from 'public/img/header/logo-horizontal.svg';
import cartIcon from 'public/img/header/icon-cart.svg';
import crossIcon from 'public/img/header/icon-cross.svg';
import styles from 'styles/Navbar.module.css';
import { getSiteConfig } from 'atom/siteConfig.atom';
import { useRecoilValue } from 'recoil';
// import RewardsPopup from 'components/RewardsPopup';
import { categoriesAtom } from '@/app/atom/catsAtom';
import dynamic from 'next/dynamic';

import useWindowDimensions from '@/app/hooks/useWindowDimensions';
import { useAuthState } from '@/app/atom/auth.atom';
import MainButton from './MainButton';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [_authState, setAuthState] = useAuthState();
  const { push } = useRouter();
  const { width } = useWindowDimensions();
  const [visibility, setVisibility] = useState(false);
  const siteConfig = useRecoilValue(getSiteConfig);
  const categories = useRecoilValue(categoriesAtom);
  const [rewardsVisible, setRewardsVisible] = useState(false);
  const changeVisibleRewards = (value: boolean) => () => setRewardsVisible(value);

  const [megaDropDownVisible, setMegaDropDownVisible] = useState(false);
  const changeVisibleMegaDropDown = (value: boolean) => () => setMegaDropDownVisible(value);

  const navClass = classNames({
    [`${styles.navLinks}`]: true,
  });

  const navWrapperClass = classNames({
    [`${styles.navWrapper}`]: true,
    hidden: !visibility,
  });

  const mobileLogoClass = classNames({
    [`${styles.mobileLogo}`]: true,
    hidden: !visibility,
    'xl:hidden': true,
  });

  const mobileClose = classNames({
    [`${styles.mobileClose}`]: true,
    hidden: !visibility,
    'xl:hidden': true,
  });

  const MegaDropDown = dynamic(() => import('components/MegaDropDown'), {
    ssr: false,
  });
  const RewardsPopup = dynamic(() => import('components/RewardsPopup'), {
    ssr: false,
  });

  return (
    <nav className={styles.nav}>
      <div className={styles.nav_body}>
        {width && width < 1280 && (
          <button className={`${styles.menuButton} flex items-center`} onClick={() => setVisibility(!visibility)}>
            <Image alt="logo" src={iconMenu} width={25} height={25} />
          </button>
        )}
        <div className={styles.logo}>
          <Link href="/">
            <a className="flex flex-col justify-center">
              <Image alt="logo" src={logo} />
            </a>
          </Link>
        </div>
        <div className={navWrapperClass}>
          {width && width < 1280 && (
            <>
              <div className={mobileClose}>
                <button className="cursor-pointer" onClick={() => setVisibility(!visibility)}>
                  <Image alt="logo" src={crossIcon} width={20} height={20} />
                </button>
              </div>

              <div className={mobileLogoClass}>
                <Image alt="logo" src={logo} width={129} height={34} />
              </div>
            </>
          )}

          <ul className={navClass}>
            <li
              onMouseEnter={changeVisibleMegaDropDown(true)}
              onMouseLeave={changeVisibleMegaDropDown(false)}
              className={styles.megaLink}
            >
              <Link href="/product-list">Shop</Link>
              {categories && megaDropDownVisible && <MegaDropDown categories={categories} />}
            </li>

            <li>
              <Link href="/wellness">
                <a>Wellness</a>
              </Link>
            </li>
            <li>
              <Link href="/blogs">
                <a>Blog</a>
              </Link>
            </li>
            <li>
              <Link href="/about-us">
                <a>About us</a>
              </Link>
            </li>
            {_authState ? (
              <li>
                <Link href="/account/edit">
                  <a>Profile</a>
                </Link>
              </li>
            ) : null}
          </ul>
          <div className="flex flex-col mt-5 xl:flex-row lg:mt-0 lg:items-center">
            {_authState ? (
              <div
                onMouseEnter={changeVisibleRewards(true)}
                onMouseLeave={changeVisibleRewards(false)}
                className="relative mb-16 text-center lg:mb-0 lg:px-8"
              >
                <Link href="/account/my-rewards">
                  <a className={styles.rewards}>Rewards</a>
                </Link>
                {rewardsVisible && <RewardsPopup balance="20" />}
              </div>
            ) : null}
            {!!siteConfig.contactNumbers && (
              <div className="pb-12 text-center lg:pb-0 lg:px-8">
                <a href="" className={styles.call}>
                  {siteConfig.contactNumbers}
                </a>
              </div>
            )}
          </div>
        </div>
        <Link href="/cart-checkout/cart">
          <a className={styles.cartButton}>
            <Image alt="cartButton" src={cartIcon} className="align-middle" width={24} height={24} />
          </a>
        </Link>
        <div className="hidden xl:flex xl:order-4 xl:items-center xl:ml-6">
          {_authState ? (
            <span className={styles.avatar}>{_authState.user.first_name.charAt(0)}</span>
          ) : (
            <MainButton onClick={() => push('/login')}>Login</MainButton>
          )}
        </div>
      </div>
    </nav>
  );
}
