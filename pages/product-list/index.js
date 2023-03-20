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
import { retrieveAllProduct } from '../../services/productApis';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useWindowDimensions from 'app/hooks/useWindowDimensions.tsx';
import { getRequest } from 'requests/api';
import styles from 'styles/TopSellingProducts.module.scss';

const DEFAULT_ITEMS_PER_PAGE = 10;

const ProductList = () => {
  const [title, setTitle] = useState('Vitamins & Supplements');
  const [modalActive, setModalActive] = useState(false);
  const [sortItem, setSortItem] = useState('Popularity');
  const { width } = useWindowDimensions();
  const [open, setOpen] = useState(false);

  // Get current User info

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
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
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

  const getProducts = async (page) => {
    const productsResponse = await getRequest('/products?page=' + (currentPage + 1));
    console.log('fileterdpr ', productsResponse, pageCount);
    if (productsResponse) {
      setCurrentItems(productsResponse.data);
      setPageCount(Math.ceil(productsResponse.meta.pagination.total / productsResponse.meta.pagination.count));
      //setCurrentPage(productsResponse.meta.pagination.current_page);
    }
  };
  useEffect(() => {
    getProducts();
    // const countFeaturedItems = items?.slice(itemOffset, endOffset).filter((obj) => obj.type === 'Featured').length;
    // setItemsPerPage(DEFAULT_ITEMS_PER_PAGE - countFeaturedItems);
    // const endOffset = itemOffset + itemsPerPage;
    // setCurrentItems(items.slice(itemOffset, endOffset));
    // setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset]);

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

              {currentItems
                ? currentItems.map((e, index) =>
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
                  )
                : Array(4)
                    .fill(0)
                    .map((v, i) => <SkeletonCard key={i} />)}
            </div>
            <div className={style.MyPagination}>
              <MyPagination
                items={items?.data?.data}
                pageCount={items?.data?.meta?.pagination?.total_pages}
                setItemOffset={setItemOffset}
                itemsPerPage={items?.data?.meta?.pagination?.per_page}
                scrollToTop={scrollToTopPaginate}
                setItemPageNumber={setCurrentPage}
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

const SkeletonCard = (props) => {
  return (
    <div className={styles.product}>
      <div className={classNames(styles.ProductImg)}>
        <div className="sm:w-[188px] sm:h-[196px] w-[110px] h-[110px] animate-pulse bg-gradient-to-r from-gray-400 to-gray-500"></div>
      </div>
      <div className={`w-[70px] h-[20px] animate-pulse rounded-md bg-gray-400 ${styles.priceMedia}`}></div>
      <div
        className={`sm:h-[40px] sm:w-full w-[55px] h-[25px] animate-pulse rounded-md bg-gray-300 sm:mt-[23px] mt-[8px] ${styles.title}`}
      ></div>
      <div
        className={`sm:h-[70px] sm:w-full w-[130px] h-[60px] animate-pulse rounded-md bg-gray-200 mt-[10px] ${styles.productDescription}`}
      ></div>
      <div className={styles.PriceAndAddButton}>
        <div className={`w-[55px] h-[25px] animate-pulse rounded-md bg-gray-400 sm:block hidden ${styles.price}`}></div>
        <div className={`w-[136px] h-[45px] animate-pulse rounded-md bg-orange ${styles.addToCart}`}></div>
      </div>
    </div>
  );
};

ProductList.Layout = MainLayout;

export const getServerSideProps = createGetServerSidePropsFn(ProductList);

export default ProductList;
