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

export async function deleteComment(movieId, commentId) {
  return sendRequest(`${BASE_URL}/${movieId}/comments/${commentId}`, "DELETE");
}

export async function updateComment(movieId, commentId, updatedData) {
  return sendRequest(`${BASE_URL}/${movieId}/comments/${commentId}`, "PUT", updatedData);
}

export async function getFavorites() {
  return sendRequest(`${BASE_URL}/favorites`);
}