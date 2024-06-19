import React, { useState, FormEvent } from 'react';
import styles from '../styles/SearchBar.module.css';

interface SearchBarProps {
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm }) => {
  const [input, setInput] = useState<string>('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearchTerm(input);
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSearch}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for players"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
