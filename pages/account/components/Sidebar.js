import styles from './Sidebar.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import avatar from '@/public/img/account/avatar.png';
import classNames from 'classnames';
import { useRouter } from 'next/router';

const Sidebar = ({ ...props }) => {
  const { open } = props || false;
  const { width, active, sideBarMenu, setSidebarOpen } = props || null;

  const { pathname } = useRouter();

  const sidebarClass = classNames({
    [`${styles.sidebar}`]: true,
    [`${styles.opened}`]: open && width <= 768,
  });

  if (!width) return <></>;

  if (width < 768) {
    if (!open) {
      return <></>;
    }
  }

  return (
    <div className={sidebarClass}>
      <div className={styles.accountInfo}>
        <div className={`${styles.avatarImg}`}>
          <Image src={avatar} alt="avatar" />
        </div>
        <h4>Elizabeth Collins</h4>
      </div>
      <ul>
        {sideBarMenu &&
          sideBarMenu.map((item) => (
            <li className={`${pathname == item.url ? styles.active : ''} ${item.signout ? styles.signout : ''}`}>
              <div className={styles.sidebarIcon}>
                <div className={`${pathname != item.url ? 'block' : 'hidden'}`}>
                  <Image src={item.icon_url} alt="icon" width="100%" height="100%" layout="responsive" priority />
                </div>
                <div className={`${pathname == item.url ? 'block' : 'hidden'}`}>
                  <Image
                    src={item.active_icon_url}
                    alt="icon"
                    width="100%"
                    height="100%"
                    layout="responsive"
                    priority
                  />
                </div>
              </div>
              <Link href={item.url} prefetch>
                {item.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
