import { FC, useState } from 'react';
import styles from 'styles/Search.module.scss';
import { useDebouncedCallback } from 'use-debounce';



const mainPlaceholder = 'Search your Products';

interface SearchProps {
  placeholder?: string;
}

const Search: FC<SearchProps> = ({ placeholder }) => {
  const [str, setStr] = useState('')
  const debounced = useDebouncedCallback((e) => {
    setStr(e.target.value)
  },300); 
  return (
    <div className={styles.formWrapper}>
      <form className={styles.form}>
        <input className={styles.input} type="text" onChange={debounced} placeholder={placeholder || mainPlaceholder} />
      </form>
    </div>
  );
};

export default Search;
