import { smartSearchAtomState } from '@/app/atom/smartSearchAtom';
import { smartSearchStrAtom } from '@/app/atom/SmartSearchStrAtom';
import { FC, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styles from 'styles/Search.module.scss';
import { useDebouncedCallback } from 'use-debounce';

import dynamic from 'next/dynamic';
const SearchTips = dynamic(() => import('./SearchTips'), {
  ssr: false,
});

const mainPlaceholder = 'Search your Products';

interface SearchProps {
  placeholder?: string;
}

const Search: FC<SearchProps> = ({ placeholder }) => {
  const [SmartSearchStr, setSmartSearchStr] = useRecoilState(smartSearchStrAtom);

  const [smartSearchState, setSmartSearchState] = useRecoilState(smartSearchAtomState);

  const debounced = useDebouncedCallback((e) => {
    if (!SmartSearchStr || !smartSearchState) setSmartSearchState(true);
    setSmartSearchStr(e.target.value);
  }, 300);

  useEffect(() => {
    if (SmartSearchStr === '') setSmartSearchState(false);
  }, [SmartSearchStr]);

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form}>
        <input className={styles.input} type="text" onChange={debounced} placeholder={placeholder || mainPlaceholder} />
        {smartSearchState && <SearchTips SmartSearchStr={SmartSearchStr} />}
      </form>
    </div>
  );
};

export default Search;
