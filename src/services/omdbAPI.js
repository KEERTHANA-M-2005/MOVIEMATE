import axios from 'axios';

const API_URL = 'https://www.omdbapi.com/';
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

export const fetchMovies = async (query) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        s: query,
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movies');
  }
};