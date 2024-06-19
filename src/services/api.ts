import axios from 'axios';

const API_KEY = ''; // add key value
const API_URL = 'https://api.balldontlie.io/v1';
const CURRENT_SEASON = 2023;

export interface Player {
  id: number;
  first_name: string;
  last_name: string;
}

export interface SeasonAverages {
  pts?: number;
  ast?: number;
  reb?: number;
}

export interface FavoritePlayer extends Player {
  season_averages: SeasonAverages;
}

export const fetchPlayers = async (
  cursor: string | null,
  searchTerm: string
) => {
  const response = await axios.get(`${API_URL}/players`, {
    params: {
      per_page: 5,
      cursor: cursor || undefined,
      search: searchTerm,
    },
    headers: {
      Authorization: API_KEY,
    },
  });
  return response.data;
};

export const fetchPlayerDetails = async (playerId: number) => {
  const response = await axios.get(`${API_URL}/players/${playerId}`, {
    headers: {
      Authorization: API_KEY,
    },
  });
  return response.data;
};

export const fetchSeasonAverages = async (playerId: number) => {
  const response = await axios.get(`${API_URL}/season_averages`, {
    params: {
      season: CURRENT_SEASON,
      player_ids: [playerId],
    },
    headers: {
      Authorization: API_KEY,
    },
  });
  return response.data.data[0] || {};
};
