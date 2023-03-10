import React, { FC } from 'react';
import { IMainCategory } from '@/app/types/CategoryInterface';
import Link from 'next/link';

interface IMegaDropDownCategoryItemProps {
  category: IMainCategory;
}

const MegaDropDownCategoryItem: FC<IMegaDropDownCategoryItemProps> = ({ category }) => {
  console.log(category);
  return (
    <ul className="mx-4">
      <li className="pb-4 font-bold font-15">{category.name}</li>
      {category.children.data?.map((item) => (
        <li key={item.id} className="font-15 py-1.5 ">
          <Link href={'/product-list/category/' + category.id}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default MegaDropDownCategoryItem;
