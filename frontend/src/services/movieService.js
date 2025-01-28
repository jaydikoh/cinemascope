import sendRequest from "./sendRequest";

const BASE_URL = '/api/movies';

const API_KEY = import.meta.env.VITE_API_KEY; 
const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
Authorization: `Bearer ${BEARER_TOKEN}`  
},
};
console.log('API Key:', API_KEY)


export async function getNowPlaying() {
  const url = `${BASE_URL}/now_playing?api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch movies');
    const data =  await response.json();
    console.log(data)
    return data;
  } catch (err) {
    console.error('Error fetching now playing movies:', err.message);
    throw err;
  }
}

export async function getMovieDetails(movieId) {
  
  return sendRequest(`${BASE_URL}/${movieId}`)
}

