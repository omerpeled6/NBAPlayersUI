import React, { useState, useEffect, useMemo } from 'react';
import styles from '../styles/PlayerCard.module.css';

interface Player {
  id: number;
  first_name: string;
  last_name: string;
}

interface FavoritePlayer extends Player {
  season_averages: unknown;
}

interface PlayerCardProps {
  player: Player;
  favorites: FavoritePlayer[];
  addFavorite: (player: Player) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  favorites,
  addFavorite,
}) => {
  const isFavorite = useMemo(
    () => favorites.some((favorite) => favorite.id === player.id),
    [favorites, player.id]
  );

  const [buttonDisabled, setButtonDisabled] = useState(isFavorite);

  useEffect(() => {
    setButtonDisabled(isFavorite);
  }, [isFavorite]);

  const handleAddFavorite = () => {
    addFavorite(player);
    setButtonDisabled(true);
  };

  return (
    <div className={styles.playerCard}>
      <p className={styles.playerDetails}>
        {player.first_name} {player.last_name}
      </p>
      <button
        onClick={handleAddFavorite}
        disabled={buttonDisabled}
        className={buttonDisabled ? styles.added : ''}
      >
        {buttonDisabled ? 'Added' : 'Add'}
      </button>
    </div>
  );
};

export default PlayerCard;
