import sendRequest from "./sendRequest";

const BASE_URL = '/api/movies';

export async function getNowPlaying() {
  return sendRequest(`${BASE_URL}`);
}

export async function getMovieDetails(movieId) { 
  return sendRequest(`${BASE_URL}/${movieId}`)
}

