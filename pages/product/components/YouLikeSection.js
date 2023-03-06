/* eslint-disable react/jsx-key */
import { useContext } from "react";
import styles from "../../../styles/product/YouLikeSection.module.css";
import Link from "next/link";
import { UserContext } from "contexts/user.context";
import Image from "next/image";
import Product from "@/components/Product";

const items = [
  {
    img: "/img/HomePage/item2.png",
    title:
      "Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews",
    text: "Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews",
    price: "24.34",
    type: "featured",
    description:
      "From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.",
  },
  {
    img: "/img/HomePage/item3.png",
    title: "CBD Wellness Chicken And Blueberry Flavor Soft Baked Chews",
    text: "Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews",
    price: "25.56",
    type: "",
    description:
      "From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.",
  },
  {
    img: "/img/HomePage/item4.png",
    title:
      " Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews",
    text: "Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews",
    price: "23.25",
    type: "",
    description:
      "From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.",
  },
  {
    img: "/img/HomePage/item1.png",
    title:
      " Martha Stewart CBD Calm Chicken and Cranberry Flavor Soft Baked Chews",
    text: "Small/Medium (5-35 lbs), 9 mg, 30 Soft Baked Chews",
    price: "23.53",
    type: "new",
    description:
      "From the industry leader in CBD science for pets – Recommended to support joint health and flexibility in dogs. The highest-quality CBD from broad spectrum hemp extract blended with Boswellia serrata in a smoky bacon-flavored soft chew.",
  },
];

export default function YouLikeSection({ related_products }) {
  const userContext = useContext(UserContext);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>You may also like</div>
      <div className={styles.body}>
        {related_products?.map((item, i) => (
          <div key={i} className={styles.product}>
            <Product item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
