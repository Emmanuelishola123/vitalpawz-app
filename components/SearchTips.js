import {
  smartSearchAtomProductSelector,
  smartSearchBrandSelector,
  smartSearchAtomState,
} from '@/app/atom/smartSearchAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from 'styles/Search.module.scss';
import SmartSearchProductCart from './SmartSearchProductCart';
import classNames from 'classnames';

const SearchTips = ({ SmartSearchStr }) => {
  const { filteredProducts, tips } = useRecoilValue(smartSearchAtomProductSelector);
  const [smartSearchState] = useRecoilState(smartSearchAtomState);
  const BrandsSelector = useRecoilValue(smartSearchBrandSelector);

  return (
    <div className={smartSearchState ? classNames(styles.SearchTips, styles.active) : styles.SearchTips}>
      <div className={styles.TipsAndBrandTips}>
        <div className={styles.Tips}>
          <ul>
            {tips.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.BrandTips}>
          <h2>BRANDS</h2>
          <ul>
            {BrandsSelector?.filteredBrands?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.ProductCardsTips}>
        <div className={styles.SearchResults}>Top results for "{SmartSearchStr}"</div>
        <div className={styles.SmartSearchProductCarts}>
          <ul>
            {filteredProducts.map((item) => (
              <SmartSearchProductCart key={item.id} product={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchTips;
