import React from 'react';
import PlayerCard from './PlayerCard';
import styles from '../styles/PlayerList.module.css';

interface Player {
  id: number;
  first_name: string;
  last_name: string;
}

interface FavoritePlayer extends Player {
  season_averages: unknown;
}

interface PlayerListProps {
  players: Player[];
  favorites: FavoritePlayer[];
  addFavorite: (player: Player) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({
  players,
  favorites,
  addFavorite,
}) => {
  return (
    <div className={styles.playerList}>
      <h2 className={styles.heading}>Players</h2>
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
          favorites={favorites}
          addFavorite={addFavorite}
        />
      ))}
    </div>
  );
};

export default PlayerList;
