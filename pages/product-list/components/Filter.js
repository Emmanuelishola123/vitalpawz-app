import { UserContext } from 'contexts/user.context';
import React, { useContext, useState } from 'react';
import style from 'styles/productList/components/Filter.module.scss';
import FilterObject from './FilterObject';

const Filter = () => {
  // const { categories, setCatecories, brand, setBrand, lifestage, setLifestage } = useContext(UserContext);
  const [categories, setCategories] = useState([
    { selected: false, title: 'Dog Allergy Medicine & Itch Relief', count: 8 },
    { selected: false, title: 'Dog Calming Aids', count: 12 },
    { selected: false, title: 'Dog Dewormers & Worm Medicine', count: 10 },
    { selected: false, title: 'Dog Ear & Eye Care', count: 14 },
    { selected: false, title: 'Dog First Aid & Paw Care', count: 12 },
    { selected: false, title: 'Dog Health & Wellness By Lifestage', count: 37 },
    { selected: false, title: 'Dog Pill Capsules', count: 10 },
    { selected: false, title: 'Dog Recovery Cones', count: 6 },
    { selected: false, title: 'Dog Vitamins & Supplements', count: 4 },
  ]);
  const [brand, setBrand] = useState([
    { selected: false, title: '5Strands', count: 1 },
    { selected: false, title: 'Adaptil', count: 5 },
    { selected: false, title: 'Adenquan Canine', count: 1 },
    { selected: false, title: 'All Four Paws', count: 2 },
    { selected: false, title: 'Amitriptyline', count: 3 },
    { selected: false, title: "Angels' Eyes", count: 3 },
  ]);
  const [lifestage, setLifestage] = useState([
    { selected: false, title: '5Strands', count: 1 },
    { selected: false, title: 'Adaptil', count: 5 },
    { selected: false, title: 'Adenquan Canine', count: 1 },
    { selected: false, title: 'All Four Paws', count: 2 },
    { selected: false, title: 'Amitriptyline', count: 3 },
    { selected: false, title: "Angels' Eyes", count: 3 },
  ]);
  return (
    <div className={style.wrapper}>
      <div className={style.titleWrapper}>
        <div className={style.title}>Filter</div>
        <div className={style.clear}>CLEAR ALL</div>
      </div>
      <FilterObject title={'CATEGORIES'} filter={categories} onChange={setCategories} />
      <FilterObject title={'BRAND'} filter={brand} onChange={setBrand} />
      <FilterObject title={'LIFESTAGE'} filter={lifestage} onChange={setLifestage} />
    </div>
  );
};

export default Filter;
