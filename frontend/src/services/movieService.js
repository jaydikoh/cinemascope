const BASE_URL = 'https://api.themoviedb.org/3/movie';
// const API_KEY = process.env.REACT_APP_API_KEY; // Use the React-specific prefix
// const BEARER_TOKEN = process.env.BEARER_TOKEN;

// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
// Authorization: `Bearer ${BEARER_TOKEN}`  
// },
// };
// console.log('API Key:', API_KEY)

/**
 * Fetch movies now playing in cinemas.
 * @returns {Promise<Object>} JSON response containing movies now playing.
 */
export async function getNowPlaying() {
  const url = `${BASE_URL}/now_playing?api_key`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch movies');
    const data =  await response.json();
    // console.log(data)
    return data;
  } catch (err) {
    console.error('Error fetching now playing movies:', err.message);
    throw err;
  }
}

/**
 * Fetch details of a specific movie by its ID.
 * @param {number} movieId - The ID of the movie to fetch.
 * @returns {Promise<Object>} JSON response containing the movie details.
 */
export async function getMovieDetails(movieId) {
  const url = `${BASE_URL}/${movieId}?language=en-US`;

  try {
    const response = await fetch(url, options);
    console.log(response)
    if (!response.ok) throw new Error('Failed to fetch movie details');
    return await response.json();
  } catch (err) {
    console.error(`Error fetching details for movie ${movieId}:`, err.message);
    throw err;
  }
}

