import React, { useState } from 'react';
import MainLayout from 'layouts/MainLayout';
import style from 'styles/Recommendation.module.scss';
import createGetServerSidePropsFn from 'shared/createGetServerSidePropsFn';
import Link from 'next/link';
import Product from '@/components/Product';
import ProductFeatured from '@/components/ProductFeatured';
import classNames from 'classnames';

const Recommendation = () => {
  const [items, _setItems] = useState([
    {
      img: '/img/HomePage/item2.png',
      title: '1Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
      text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
      price: '24.34',
      type: 'Featured',
      description:
        'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
    },
    {
      img: '/img/HomePage/item3.png',
      title:
        'CBD Wellness Chicken And Blueberry Flavor Soft Baked Chews CBD Wellness Chicken And Blueberry Flavor Soft Baked ChewsCBD Wellness Chicken And Blueberry Flavor Soft Baked Chews',
      text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
      price: '25.56',
      type: '',
      description:
        'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
    },
    {
      img: '/img/HomePage/item3.png',
      title: 'CBD Wellness Chicken And Blueberry Flavor Soft Baked Chews',
      text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
      price: '25.56',
      type: '',
      description:
        'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
    },
  ]);

  return (
    <div className={style.main}>
      <div className={style.wrapper}>
        <div className={style.header}>
          <span>
            <Link href={`#`}>Home / Add Pet / Recommendation</Link>
          </span>
          <h4>Great to meet Kenny</h4>
          <p>Based on your answers we recommend below products for Kenny</p>
        </div>

        <div className="flex flex-wrap flex-row justify-center pt-50px pb-[70px]">
          {items.map((item, index) =>
            item.type === 'Featured' ? (
              <div
                key={index}
                className={classNames(style.product, {
                  [style.featured]: item.type === 'Featured',
                })}
              >
                <ProductFeatured item={item} classname={'hidden lg:block'} />
                <Product item={item} classname={'block lg:hidden'} />
              </div>
            ) : (
              <div key={index} className={style.product}>
                <Product item={item} />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = createGetServerSidePropsFn(Recommendation);

Recommendation.Layout = MainLayout;

export default Recommendation;
