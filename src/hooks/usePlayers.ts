import { useState, useEffect } from 'react';
import {
  fetchPlayers,
  fetchPlayerDetails,
  fetchSeasonAverages,
  Player,
  FavoritePlayer,
  SeasonAverages,
} from '../services/api';

export const usePlayers = (initialSearchTerm: string) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [favorites, setFavorites] = useState<FavoritePlayer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [cursor, setCursor] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [cursorHistory, setCursorHistory] = useState<(string | null)[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [noPlayersFound, setNoPlayersFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchPlayerData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPlayers(cursor, searchTerm);
        setPlayers(data.data);
        setNextCursor(data.meta.next_cursor || null);
        setNoPlayersFound(data.data.length === 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
      setLoading(false);
    };

    fetchPlayerData();
  }, [cursor, searchTerm]);

  const addFavorite = async (player: Player) => {
    if (favorites.some((fav) => fav.id === player.id)) {
      console.log('Player already in favorites:', player);
      return;
    }

    try {
      const playerData = await fetchPlayerDetails(player.id);
      const seasonAveragesData: SeasonAverages = await fetchSeasonAverages(
        player.id
      );

      const favoritePlayer: FavoritePlayer = {
        ...playerData,
        season_averages: seasonAveragesData,
      };

      console.log('Adding player to favorites:', favoritePlayer);
      setFavorites([...favorites, favoritePlayer]);
    } catch (err) {
      console.error('Failed to fetch player details or season averages', err);
    }
  };

  const handleNext = () => {
    if (nextCursor) {
      setCursorHistory([...cursorHistory, cursor]);
      setCursor(nextCursor);
    }
  };

  const handlePrev = () => {
    const newHistory = [...cursorHistory];
    const prevCursor = newHistory.pop() || null;
    setCursorHistory(newHistory);
    setCursor(prevCursor);
  };

  return {
    players,
    favorites,
    searchTerm,
    setSearchTerm,
    cursor,
    nextCursor,
    cursorHistory,
    loading,
    error,
    noPlayersFound,
    addFavorite,
    handleNext,
    handlePrev,
  };
};
