import Image from 'next/image';
import React, { FC } from 'react';
import styles from 'styles/MegaDropDown.module.css';
import calmIcon from 'public/img/shop-by-concern/calm.svg';
import immunityIcon from 'public/img/shop-by-concern/immunity.svg';
import mobilityIcon from 'public/img/shop-by-concern/mobility.svg';
import petsIcon from 'public/img/shop-by-concern/pets.svg';
import reliefIcon from 'public/img/shop-by-concern/relief.svg';
import wellnessIcon from 'public/img/shop-by-concern/wellness.svg';
import { IMainCategory } from '@/app/types/CategoryInterface';
import MegaDropDownCategoryItem from './MegaDropDownCategoryItem';


interface IMegaDropDownProps {
  categories: IMainCategory[];
}

const MegaDropDown: FC<IMegaDropDownProps> = ({ categories }) => {
  // console.log(categories)
  return (
    <div className={styles.megaWrapper}>
      <div className={styles.megaContainer}>
        <div className="flex flex-row flex-wrap sm:flex-col w-full sm:w-1/5 bg-light-purple mx-auto">
          <ul className="py-4 text-left">
            <li className="text-sm pl-12 py-1.5 text-purple font-bold">TRENDING CATEGORIES</li>
            <li className="font-15 hover:bg-active-purple transition-colors py-1.5 cursor-pointer pl-12">
              <a href="">Top Deals</a>
            </li>
            <li className="font-15 hover:bg-active-purple transition-colors py-1.5 cursor-pointer pl-12">
              <a href="">Dog Food</a>
            </li>
            <li className="font-15 hover:bg-active-purple transition-colors py-1.5 cursor-pointer pl-12">
              <a href="">Dog Flea &amp; Tick</a>
            </li>
            <li className="font-15 hover:bg-active-purple transition-colors py-1.5 cursor-pointer pl-12">
              <a href="">Cat Litter</a>
            </li>
          </ul>
          <ul className="py-4 text-left">
            <li className="text-sm pl-12 py-1.5 text-purple font-bold">TRENDING BRANDS</li>
            <li className="font-15 hover:bg-active-purple transition-colors py-1.5 cursor-pointer pl-12">
              <a href="">WholeHearted</a>
            </li>
            <li className="font-15 hover:bg-active-purple transition-colors py-1.5 cursor-pointer pl-12">
              <a href="">Blue Buffalo</a>
            </li>
            <li className="font-15 hover:bg-active-purple transition-colors py-1.5 cursor-pointer pl-12">
              <a href="">Merrick</a>
            </li>
            <li className="font-15 hover:bg-active-purple transition-colors py-1.5 cursor-pointer pl-12">
              <a href="">Science Diet</a>
            </li>
            <li className="font-15 hover:bg-active-purple transition-colors py-1.5 cursor-pointer pl-12">
              <a href="">Royal Canin</a>
            </li>
          </ul>
        </div>

        <div className="w-full  sm:w-4/5 pb-12 text-left">
          <div className={styles.features}>
            <div>
              <a href="">
                <Image alt="logo" src={calmIcon} className={styles.icon} />
                <p className={styles.iconDescription}>Calm</p>
              </a>
            </div>
            <div>
              <a href="">
                <Image alt="logo" src={immunityIcon} className={styles.icon} />
                <p className={styles.iconDescription}>Immunity</p>
              </a>
            </div>
            <div>
              <a href="">
                <Image alt="logo" src={mobilityIcon} className={styles.icon} />
                <p className={styles.iconDescription}>Mobility</p>
              </a>
            </div>
            <div>
              <a href="">
                <Image alt="logo" src={reliefIcon} className={styles.icon} />
                <p className={styles.iconDescription}>Relief</p>
              </a>
            </div>
            <div>
              <a href="">
                <Image alt="logo" src={petsIcon} className={styles.icon} />
                <p className={styles.iconDescription}>Skin &amp; Coat</p>
              </a>
            </div>
            <div>
              <a href="">
                <Image alt="logo" src={wellnessIcon} className={styles.icon} />
                <p className={styles.iconDescription}>Wellness</p>
              </a>
            </div>
          </div>

          <hr className="mx-14" />
          <div className="flex mt-6 flex-wrap lg:flex-nowrap pl-14">
            { categories?.map(item => <MegaDropDownCategoryItem key={item.id} category={item} />) }
          </div>
          <div className="flex mt-6 flex-wrap lg:flex-nowrap pl-14">
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaDropDown;
