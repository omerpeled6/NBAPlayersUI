import React from 'react';
import PlayerList from './PlayerList';
import FavoriteList from './FavoriteList';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import styles from '../styles/App.module.css';
import { usePlayers } from '../hooks/usePlayers';

const MainContent: React.FC = () => {
  const {
    players,
    favorites,
    searchTerm,
    cursor,
    nextCursor,
    cursorHistory,
    loading,
    error,
    noPlayersFound,
    addFavorite,
    handleNext,
    handlePrev,
    setSearchTerm,
  } = usePlayers('');

  return (
    <div className={styles.app}>
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className={styles.mainContent}>
        <Pagination
          handlePrev={handlePrev}
          handleNext={handleNext}
          nextCursor={nextCursor}
          cursorHistory={cursorHistory}
        />
        <div className={styles.lists}>
          {noPlayersFound ? (
            <p>No players found with the name "{searchTerm}".</p>
          ) : (
            <PlayerList
              players={players}
              favorites={favorites}
              addFavorite={addFavorite}
            />
          )}
          <FavoriteList favorites={favorites} />
        </div>

        {loading && <p className={styles.loading}>Loading...</p>}
        {error && <p className={styles.error}>Error: {error}</p>}
      </div>
    </div>
  );
};

export default MainContent;
