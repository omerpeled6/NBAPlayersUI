import React from 'react';
import styles from '../styles/FavoriteList.module.css';
import StatDisplay from './StatDisplay'; // Import the new component

interface Team {
  full_name: string;
}

interface Player {
  id: number;
  first_name: string;
  last_name: string;
  team?: Team;
  country?: string;
}

interface SeasonAverages {
  pts?: number;
  ast?: number;
  reb?: number;
}

interface FavoritePlayer {
  data: Player;
  season_averages?: SeasonAverages;
}

interface FavoriteListProps {
  favorites: FavoritePlayer[];
}

const FavoriteList: React.FC<FavoriteListProps> = ({ favorites }) => {
  return (
    <div className={styles.favoriteList}>
      <h2 className={styles.heading}>Favorites</h2>
      {favorites.map((favorite) => {
        const player = favorite.data;
        return (
          <div key={player.id} className={styles.favoriteItem}>
            <div>
              <span>
                <strong>
                  {player.first_name} {player.last_name}
                </strong>
              </span>
              <p>Team: {player.team ? player.team.full_name : 'N/A'}</p>
              <StatDisplay
                label="Points Average"
                value={favorite.season_averages?.pts}
              />
              <StatDisplay
                label="Assists Average"
                value={favorite.season_averages?.ast}
              />
              <StatDisplay
                label="Rebounds Average"
                value={favorite.season_averages?.reb}
              />
              <p>Country of Birth: {player.country || 'N/A'}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FavoriteList;
