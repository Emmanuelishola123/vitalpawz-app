import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import MainLayout from 'layouts/MainLayout';
import ShopByConcern from '../../components/ShopByConcern';
import Breadcrumbs from 'nextjs-breadcrumbs';
import { Level } from 'shared/GameData';
import Image from 'next/image';
import sort from '@/public/img/logo/group-17.svg';
import Filter from './components/Filter';
import SlideOver from './components/SlideOver';
import Product from '@/components/Product';
import ProductFeatured from '@/components/ProductFeatured';
import Banner from '@/components/Banner';
import style from 'styles/productList/style.module.scss';
import createGetServerSidePropsFn from 'shared/createGetServerSidePropsFn';
import MyPagination from '@/components/MyPagination/MyPagination';
import MySelect from '@/components/CartItems/componentsCartItem/MySelect';
import MySelectModal from '@/components/CartItems/componentsCartItem/MySelectModal';
import useWindowDimensions from 'app/hooks/useWindowDimensions';
import { retrieveAllProduct, ProductsType } from '../../shared/services/productApis';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { productDataType } from '../../app/types/product.types';

const DEFAULT_ITEMS_PER_PAGE = 10;

const ProductList = () => {
  const [title, setTitle] = useState('Vitamins & Supplements');
  const [modalActive, setModalActive] = useState(false);
  const [sortItem, setSortItem] = useState('Popularity');
  const { width } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  // const [items, setItems ] = useState([
  //   {
  //     img: '/img/HomePage/item2.png',
  //     title: '1Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '24.34',
  //     type: 'Featured',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item3.png',
  //     title:
  //       'CBD Wellness Chicken And Blueberry Flavor Soft Baked Chews CBD Wellness Chicken And Blueberry Flavor Soft Baked ChewsCBD Wellness Chicken And Blueberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '25.56',
  //     type: '',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item4.png',
  //     title: ' Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '23.25',
  //     type: 'new',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item1.png',
  //     title: ' Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '23.53',
  //     type: 'Featured',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },

  //   {
  //     img: '/img/HomePage/item3.png',
  //     title: 'CBD Wellness Chicken And Blueberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '25.56',
  //     type: '',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item4.png',
  //     title: ' Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '23.25',
  //     type: 'popular',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item2.png',
  //     title: 'Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '24.34',
  //     type: 'popular',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item2.png',
  //     title: 'Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '24.34',
  //     type: 'popular',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item3.png',
  //     title:
  //       'CBD Wellness Chicken And Blueberry Flavor Soft Baked Chews CBD Wellness Chicken And Blueberry Flavor Soft Baked ChewsCBD Wellness Chicken And Blueberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '25.56',
  //     type: '',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item4.png',
  //     title: ' Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '23.25',
  //     type: '',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item1.png',
  //     title: ' Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '23.53',
  //     type: 'new',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },

  //   {
  //     img: '/img/HomePage/item3.png',
  //     title: 'CBD Wellness Chicken And Blueberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '25.56',
  //     type: '',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item4.png',
  //     title: ' Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '23.25',
  //     type: 'popular',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item2.png',
  //     title: 'Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '24.34',
  //     type: 'featured',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item2.png',
  //     title: 'Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '24.34',
  //     type: 'featured',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item3.png',
  //     title:
  //       'CBD Wellness Chicken And Blueberry Flavor Soft Baked Chews CBD Wellness Chicken And Blueberry Flavor Soft Baked ChewsCBD Wellness Chicken And Blueberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '25.56',
  //     type: '',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item4.png',
  //     title: ' Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '23.25',
  //     type: '',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item1.png',
  //     title: ' Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '23.53',
  //     type: 'new',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },

  //   {
  //     img: '/img/HomePage/item3.png',
  //     title: 'CBD Wellness Chicken And Blueberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '25.56',
  //     type: '',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item4.png',
  //     title: ' Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '23.25',
  //     type: 'popular',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item2.png',
  //     title: 'Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '24.34',
  //     type: 'featured',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item2.png',
  //     title: 'Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '24.34',
  //     type: 'featured',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item3.png',
  //     title:
  //       'CBD Wellness Chicken And Blueberry Flavor Soft Baked Chews CBD Wellness Chicken And Blueberry Flavor Soft Baked ChewsCBD Wellness Chicken And Blueberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '25.56',
  //     type: '',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item4.png',
  //     title: ' Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '23.25',
  //     type: '',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item1.png',
  //     title: ' Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '23.53',
  //     type: 'new',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },

  //   {
  //     img: '/img/HomePage/item3.png',
  //     title: 'CBD Wellness Chicken And Blueberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '25.56',
  //     type: '',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item4.png',
  //     title: ' Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '23.25',
  //     type: 'popular',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item2.png',
  //     title: 'Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '24.34',
  //     type: 'featured',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item2.png',
  //     title: 'Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '24.34',
  //     type: 'featured',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item3.png',
  //     title:
  //       'CBD Wellness Chicken And Blueberry Flavor Soft Baked Chews CBD Wellness Chicken And Blueberry Flavor Soft Baked ChewsCBD Wellness Chicken And Blueberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '25.56',
  //     type: '',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item4.png',
  //     title: ' Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '23.25',
  //     type: '',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item1.png',
  //     title: ' Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '23.53',
  //     type: 'new',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },

  //   {
  //     img: '/img/HomePage/item3.png',
  //     title: 'CBD Wellness Chicken And Blueberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '25.56',
  //     type: '',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item4.png',
  //     title: ' Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '23.25',
  //     type: 'popular',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item2.png',
  //     title: 'Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '24.34',
  //     type: 'featured',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item2.png',
  //     title: 'Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '24.34',
  //     type: 'featured',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item3.png',
  //     title:
  //       'CBD Wellness Chicken And Blueberry Flavor Soft Baked Chews CBD Wellness Chicken And Blueberry Flavor Soft Baked ChewsCBD Wellness Chicken And Blueberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '25.56',
  //     type: '',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item4.png',
  //     title: ' Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '23.25',
  //     type: '',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item1.png',
  //     title: ' Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '23.53',
  //     type: 'new',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },

  //   {
  //     img: '/img/HomePage/item3.png',
  //     title: 'CBD Wellness Chicken And Blueberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '25.56',
  //     type: '',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item4.png',
  //     title: ' Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '23.25',
  //     type: 'popular',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item2.png',
  //     title: 'Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '24.34',
  //     type: 'featured',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item2.png',
  //     title: 'Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '24.34',
  //     type: 'featured',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item3.png',
  //     title:
  //       'CBD Wellness Chicken And Blueberry Flavor Soft Baked Chews CBD Wellness Chicken And Blueberry Flavor Soft Baked ChewsCBD Wellness Chicken And Blueberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '25.56',
  //     type: '',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item4.png',
  //     title: ' Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '23.25',
  //     type: '',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item1.png',
  //     title: ' Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '23.53',
  //     type: 'new',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },

  //   {
  //     img: '/img/HomePage/item3.png',
  //     title: 'CBD Wellness Chicken And Blueberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '25.56',
  //     type: '',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item4.png',
  //     title: ' Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '23.25',
  //     type: 'popular',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  //   {
  //     img: '/img/HomePage/item2.png',
  //     title: 'Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews',
  //     text: 'Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews',
  //     price: '24.34',
  //     type: 'featured',
  //     description:
  //       'From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.',
  //   },
  // ]);

  const {
    data: items,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['productLists'],
    queryFn: retrieveAllProduct,
  });

  //  const items = data.data.data
  //  const meta = data.data.meta

  const setModalActiveSelect = () => {
    setModalActive(true);
  };
  const handleModalSetSortItem = (item) => {
    setSortItem(item);
    setModalActive(false);
  };
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const topOfProductsRef = useRef(null);

  // useEffect(() => {
  //   const countFeaturedItems = items?.slice(itemOffset, endOffset).filter((obj) => obj.type === 'Featured').length;
  //   setItemsPerPage(DEFAULT_ITEMS_PER_PAGE - countFeaturedItems);

  //   const endOffset = itemOffset + itemsPerPage;
  //   setCurrentItems(items.slice(itemOffset, endOffset));
  //   setPageCount(Math.ceil(items.length / itemsPerPage));
  // }, [itemOffset, itemsPerPage, items]);

  const scrollToTopPaginate = () => {
    topOfProductsRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className={style.wrapper}>
      <Banner />
      <div className={style.breadcrumb}>
        <div className="px-5 sm:px-0">
          <Breadcrumbs
            rootLabel="Home"
            containerClassName={style.breadcrumbsWrapper}
            listClassName={style.listWrapper}
          />
        </div>
      </div>
      <ShopByConcern />
      <div className={style.productsWrapper} ref={topOfProductsRef}>
        <div className="px-5 mb-6 sm:px-0">
          <div className={style.header}>
            <div className={style.titleWrapper}>
              <div className={style.title}>{title}</div>
              <div className={style.select}>{`Showing ${items?.data?.meta?.pagination?.current_page} - ${
                items?.data?.meta?.pagination?.per_page * items?.data?.meta?.pagination?.current_page
              } of ${items?.data?.meta?.pagination?.total}`}</div>
            </div>
            <div className={style.sortWrapper}>
              <div className={style.filterWrapper}>
                <button
                  type="button"
                  className={style.button}
                  onClick={() => {
                    setOpen((prev) => !prev);
                  }}
                >
                  Filter by (4)
                </button>
              </div>
              <div className={style.sort}>
                <div className={style.contentWrapper}>
                  <div className={style.logoWrapper}>
                    <Image src={sort} alt="sort-logo" />
                  </div>
                  <label className={style.label}>Sort by: </label>
                  {width > 500 ? (
                    <MySelect
                      optionsArr={Level}
                      state={sortItem}
                      setState={setSortItem}
                      classNamePrefix={'mySelectPref'}
                    />
                  ) : (
                    <span className={style.ModalSelectSort} onClick={setModalActiveSelect}>
                      {sortItem}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.contentWrapper}>
          <div className={style.filter}>
            <Filter />
          </div>
          <div className={style.products}>
            <div className={style.productWrapper}>
              {items?.data?.data?.map((e, index) =>
                e.type === 'Featured' ? (
                  <div
                    key={index}
                    className={classNames(style.product, {
                      [style.featured]: e.type === 'Featured',
                    })}
                  >
                    <ProductFeatured item={e} classname={'hidden lg:block'} />
                    <Product item={e} classname={'block lg:hidden'} />
                  </div>
                ) : (
                  <div key={index} className={style.product}>
                    <Product item={e} />
                  </div>
                )
              )}
            </div>
            <div className={style.MyPagination}>
              <MyPagination
                items={items?.data?.data}
                pageCount={items?.data?.meta?.pagination?.total_pages}
                setItemOffset={setItemOffset}
                itemsPerPage={items?.data?.meta?.pagination?.per_page}
                scrollToTop={scrollToTopPaginate}
              />
            </div>
          </div>
        </div>
      </div>
      <SlideOver open={open} setOpen={setOpen} />
      <MySelectModal active={modalActive} setActive={setModalActive}>
        <h3>Sort By</h3>
        {Level.map((item) => (
          <div
            onClick={() => {
              setSortItem(item.value);
              setModalActive(false);
            }}
            className="SortItem"
            key={item.text}
          >
            {item.text}
          </div>
        ))}
      </MySelectModal>
    </div>
  );
};

ProductList.Layout = MainLayout;

export const getServerSideProps = createGetServerSidePropsFn(ProductList);

export default ProductList;
