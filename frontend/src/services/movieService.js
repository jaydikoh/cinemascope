import sendRequest from "./sendRequest";

const BASE_URL = '/api/movies';

export async function getNowPlaying() {
  return sendRequest(`${BASE_URL}`);
}

export async function getMovieDetails(movieId) { 
  return sendRequest(`${BASE_URL}/${movieId}`)
}

export async function addFavorite(movieId) { 
  return sendRequest(`${BASE_URL}/${movieId}/favorite`, 'POST'); 
}

export async function createComment(movieId, commentData) { 
  return sendRequest(`${BASE_URL}/${movieId}/comments`, 'POST', commentData); 
}

