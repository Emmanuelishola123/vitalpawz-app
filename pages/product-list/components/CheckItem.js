import React from "react";
import style from "styles/productList/components/CheckItem.module.scss";
const CheckItem = ({
  title,
  id,
  categories,
  setCategories,
}) => {


  const changeCategories = () => {
      if(categories.includes(id)){
        let newCategories = categories.filter((d) => d !== id)
        if(newCategories.length > 0){
          setCategories([...newCategories])
        }else {
          setCategories([])
        }
        
      }else{ 
       setCategories([...categories, id])
      }
  };

  return (
    <div className={style.wrapper}>
      <input
        type="checkbox"
        className={style.checkbox}
        checked={categories.includes(id)}
        onChange={() => {
          changeCategories();
        }}
      />
      <div
        onClick={() => {
          changeCategories();
        }}
        className={style.title}
      >{title}</div>
    </div>
  );
};

export default CheckItem;
