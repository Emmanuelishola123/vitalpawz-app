import { useState, useEffect } from 'react';

import styles from 'styles/account/myOrders.module.scss';
import createGetServerSidePropsFn from 'shared/createGetServerSidePropsFn';
import MyPagination from '@/components/MyPagination/MyPagination';
import MyAccountLayout from 'layouts/MyAccountLayout';
import { BiSearch } from 'react-icons/bi';
import PrimarySmall from 'components/Buttons/PrimarySmall';
import SecondarySmall from 'components/Buttons/SecondarySmall';
import { useDebouncedCallback } from 'use-debounce';

const EditAccount = () => {
  const [searchStr, setSearchStr] = useState(null);
  const [items, _setItems] = useState([
    {
      order_number: '#1234156',
      order_total: '$96.98',
      order_status: 'Delivered',
      total_items: 12,
      payment_status: 'Paid',
      rewards: '$3.56',
      created_at: 'July 28, 2020',
    },
    {
      order_number: '#1234156',
      order_total: '$96.98',
      order_status: 'Delivered',
      total_items: 12,
      payment_status: 'Paid',
      rewards: '$3.56',
      created_at: 'July 28, 2020',
    },
    {
      order_number: '#1234156',
      order_total: '$96.98',
      order_status: 'Delivered',
      total_items: 12,
      payment_status: 'Paid',
      rewards: '$3.56',
      created_at: 'July 28, 2020',
    },
    {
      order_number: '#1234156',
      order_total: '$96.98',
      order_status: 'Delivered',
      total_items: 12,
      payment_status: 'Paid',
      rewards: '$3.56',
      created_at: 'July 28, 2020',
    },
    {
      order_number: '#1234156',
      order_total: '$96.98',
      order_status: 'Delivered',
      total_items: 12,
      payment_status: 'Paid',
      rewards: '$3.56',
      created_at: 'July 28, 2020',
    },
    {
      order_number: '#7891011',
      order_total: '$96.98',
      order_status: 'Delivered',
      total_items: 12,
      payment_status: 'Paid',
      rewards: '$3.56',
      created_at: 'July 28, 2020',
    },
    {
      order_number: '#7891011',
      order_total: '$96.98',
      order_status: 'Delivered',
      total_items: 12,
      payment_status: 'Paid',
      rewards: '$3.56',
      created_at: 'July 28, 2020',
    },
    {
      order_number: '#7891011',
      order_total: '$96.98',
      order_status: 'Delivered',
      total_items: 12,
      payment_status: 'Paid',
      rewards: '$3.56',
      created_at: 'July 28, 2020',
    },
    {
      order_number: '#7891011',
      order_total: '$96.98',
      order_status: 'Delivered',
      total_items: 12,
      payment_status: 'Paid',
      rewards: '$3.56',
      created_at: 'July 28, 2020',
    },
    {
      order_number: '#7891011',
      order_total: '$96.98',
      order_status: 'Delivered',
      total_items: 12,
      payment_status: 'Paid',
      rewards: '$3.56',
      created_at: 'July 28, 2020',
    },
    {
      order_number: '#7891011',
      order_total: '$96.98',
      order_status: 'Delivered',
      total_items: 12,
      payment_status: 'Paid',
      rewards: '$3.56',
      created_at: 'July 28, 2020',
    },
    {
      order_number: '#7891011',
      order_total: '$96.98',
      order_status: 'Delivered',
      total_items: 12,
      payment_status: 'Paid',
      rewards: '$3.56',
      created_at: 'July 28, 2020',
    },
    {
      order_number: '#7891011',
      order_total: '$96.98',
      order_status: 'Delivered',
      total_items: 12,
      payment_status: 'Paid',
      rewards: '$3.56',
      created_at: 'July 28, 2020',
    },
    {
      order_number: '#7891011',
      order_total: '$96.98',
      order_status: 'Delivered',
      total_items: 12,
      payment_status: 'Paid',
      rewards: '$3.56',
      created_at: 'July 28, 2020',
    },
    {
      order_number: '#7891011',
      order_total: '$96.98',
      order_status: 'Delivered',
      total_items: 12,
      payment_status: 'Paid',
      rewards: '$3.56',
      created_at: 'July 28, 2020',
    },
    {
      order_number: '#7891011',
      order_total: '$96.98',
      order_status: 'Delivered',
      total_items: 12,
      payment_status: 'Paid',
      rewards: '$3.56',
      created_at: 'July 28, 2020',
    },
    {
      order_number: '#69',
      order_total: '$96.98',
      order_status: 'Delivered',
      total_items: 12,
      payment_status: 'Paid',
      rewards: '$3.56',
      created_at: 'July 28, 2020',
    },
  ]);

  const [currentItems, setCurrentItems] = useState(items);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 4;

  const [filteredItems, setFilteredItems] = useState([]);
  const [currentFilteredItems, setCurrentFilteredItems] = useState([]);
  const [searchPageCount, setSearchPageCount] = useState(0);
  const [searchItemOffset, setSearchItemOffset] = useState(0);
  const [searchPageNumber, setSearchPageNumber] = useState(0);
  const itemsPerPageSearch = 4;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  useEffect(() => {
    const endOffset = searchItemOffset + itemsPerPageSearch;
    setCurrentFilteredItems(filteredItems.slice(searchItemOffset, endOffset));
    setSearchPageCount(Math.ceil(filteredItems.length / itemsPerPageSearch));
  }, [filteredItems, searchItemOffset, itemsPerPageSearch]);

  useEffect(() => {
    if (!searchStr) {
      setSearchPageNumber(0);
    } else {
      setFilteredItems(items.filter((item) => item.order_number.includes(searchStr)));
      setPageNumber(0);
    }
  }, [searchStr]);

  const searchItems = useDebouncedCallback((e) => {
    setSearchStr(e?.target?.value);
  }, 300);

  return (
    <>
      <div className="flex flex-row flex-wrap lg:justify-between justify-center mb-31px">
        <h4 className={styles.title}>My Orders</h4>
        <div className={styles.searchBox}>
          <BiSearch size={23} color="#4a2072" />
          <input type="text" placeholder="Search your order" onKeyUp={(e) => searchItems(e)} />
        </div>
      </div>

      <div className={styles.order_box}>
        {!searchStr
          ? currentItems.map((e, index) => (
              <div className={styles.order_item}>
                <div className="grid lg:grid-cols-5 grid-cols-2 py-25px px-19px">
                  <div className={`${styles.order_header} lg:col-span-4`}>
                    Order <b className="lg:ml-11px myOrderNumber">{e.order_number}</b>
                  </div>
                  <div className={`${styles.order_header} lg:col-span-1 pl-10px`}>
                    Total <b className="lg:ml-11px">{e.order_total}</b>
                  </div>
                </div>
                <div className="grid lg:grid-cols-5 grid-cols-2 py-17px px-19px bg-darker-white">
                  <div className="pl-10px lg:pl-0">
                    <div>Date</div>
                    <div>
                      <b>{e.created_at}</b>
                    </div>
                  </div>
                  <div className="pl-10px">
                    <div>Status</div>
                    <div>
                      <b>{e.order_status}</b>
                    </div>
                  </div>
                  <div className="pl-10px pt-10px lg:pt-0">
                    <div>Total items</div>
                    <div>
                      <b>{e.total_items}</b>
                    </div>
                  </div>
                  <div className="pl-10px pt-10px lg:pt-0">
                    <div>Payment</div>
                    <div>
                      <b>{e.payment_status}</b>
                    </div>
                  </div>
                  <div className="pl-10px pt-10px lg:pt-0">
                    <div className={styles.reward_icon}>Rewards</div>
                    <div>
                      <b>{e.rewards}</b>
                    </div>
                  </div>
                </div>
                <div className="px-19px pb-21px flex sm:flex-row flex-col flex-wrap sm:items-center items-end pt-20px gap-3">
                  <PrimarySmall className="lg:w-[168px] h-[44px] md:w-[134px] w-[168px] md:mb-0" text="Re-order" />
                  <SecondarySmall className="lg:w-[168px] h-[44px] md:w-[134px] w-[168px]" text="Download Invoice" />
                </div>
              </div>
            ))
          : currentFilteredItems.map((e, index) => (
              <div className={styles.order_item}>
                <div className="grid lg:grid-cols-5 grid-cols-2 py-25px px-19px">
                  <div className={`${styles.order_header} lg:col-span-4`}>
                    Order <b className="lg:ml-11px myOrderNumber">{e.order_number}</b>
                  </div>
                  <div className={`${styles.order_header} lg:col-span-1 pl-10px`}>
                    Total <b className="lg:ml-11px">{e.order_total}</b>
                  </div>
                </div>
                <div className="grid lg:grid-cols-5 grid-cols-2 py-17px px-19px bg-darker-white">
                  <div className="pl-10px lg:pl-0">
                    <div>Date</div>
                    <div>
                      <b>{e.created_at}</b>
                    </div>
                  </div>
                  <div className="pl-10px">
                    <div>Status</div>
                    <div>
                      <b>{e.order_status}</b>
                    </div>
                  </div>
                  <div className="pl-10px pt-10px lg:pt-0">
                    <div>Total items</div>
                    <div>
                      <b>{e.total_items}</b>
                    </div>
                  </div>
                  <div className="pl-10px pt-10px lg:pt-0">
                    <div>Payment</div>
                    <div>
                      <b>{e.payment_status}</b>
                    </div>
                  </div>
                  <div className="pl-10px pt-10px lg:pt-0">
                    <div className={styles.reward_icon}>Rewards</div>
                    <div>
                      <b>{e.rewards}</b>
                    </div>
                  </div>
                </div>
                <div className="px-19px pb-21px">
                  <PrimarySmall
                    className="lg:w-[168px] h-[44px] md:w-[134px] w-[168px] mt-[20px] mr-10px mb-11px md:mb-0"
                    text="Re-order"
                  />
                  <SecondarySmall className="lg:w-[168px] h-[44px] md:w-[134px] w-[168px]" text="Download Invoice" />
                </div>
              </div>
            ))}

        <div className={styles.MyPagination}>
          {!searchStr ? (
            <MyPagination
              items={items}
              pageCount={pageCount}
              setItemOffset={setItemOffset}
              itemsPerPage={itemsPerPage}
              forcePage={pageNumber}
              setItemPageNumber={setPageNumber}
            />
          ) : (
            <MyPagination
              items={filteredItems}
              pageCount={searchPageCount}
              setItemOffset={setSearchItemOffset}
              itemsPerPage={itemsPerPageSearch}
              forcePage={searchPageNumber}
              setItemPageNumber={setSearchPageNumber}
            />
          )}
        </div>
      </div>
    </>
  );
};

EditAccount.Layout = MyAccountLayout;

// export const getServerSideProps = createGetServerSidePropsFn(EditAccount);

export default EditAccount;
