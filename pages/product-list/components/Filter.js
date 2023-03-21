import { UserContext } from 'contexts/user.context';
import React, { useContext, useState, useEffect } from 'react';
import style from 'styles/productList/components/Filter.module.scss';
import FilterObject from './FilterObject';

const Filter = ({ categoriesFilter, brandsFilter, filteredBrandsId,  setFilteredBrandsId,
  filteredCategoriesId,
  setFilteredCategoriesId  }) => {
  // const { categories, setCatecories, brand, setBrand, lifestage, setLifestage } = useContext(UserContext);

  // const [lifestage, setLifestage] = useState([
  //   { selected: false, title: '5Strands', count: 1 },
  //   { selected: false, title: 'Adaptil', count: 5 },
  //   { selected: false, title: 'Adenquan Canine', count: 1 },
  //   { selected: false, title: 'All Four Paws', count: 2 },
  //   { selected: false, title: 'Amitriptyline', count: 3 },
  //   { selected: false, title: "Angels' Eyes", count: 3 },
  // ]);

  
  


  return (
    <div className={style.wrapper}>
      <div className={style.titleWrapper}>
        <div className={style.title}>Filter</div>
        <div className={style.clear}>CLEAR ALL</div>
      </div>
      <FilterObject title={'CATEGORIES'} filter={categoriesFilter} onChange={setFilteredCategoriesId} filteredIds={filteredCategoriesId} />
      <FilterObject title={'BRAND'} filter={brandsFilter} onChange={setFilteredBrandsId} filteredIds={filteredBrandsId} />
      {/* <FilterObject title={'LIFESTAGE'} filter={lifestage} onChange={setLifestage} /> */}
    </div>
  );
};

export default Filter;
