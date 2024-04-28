import axios from 'axios';
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

const paramsRequest = {
  include_adult: false,
  language: "en-US",
  page: 1,
};
const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzIzN2I3NjAxYzczMzU4M2VhZjNkYzIxOTZmMWIwYyIsInN1YiI6IjY2MTQ0MWMxMzNhNTMzMDE3ZDg2MjQ4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w3lC1LFryVgYddnbuQyS1Xqf10uEvVf_SKXpqxgVXTA",
  },
  params: paramsRequest,
};

export const requestMoviesByTrending = async () => {
      const { data } = await instance.get("trending/movie/day", options);
      return data;
};

export const requestMoviesBySearch = async (query) => {
  const { data } = await instance.get(`search/movie?query=${query}`, options);
  return data;
};

export const requestMovieDetailsById = async (movieId) => {
  const { data } = await instance.get(`movie/${movieId}`, options);
  return data;
};

export const requestMovieDetailsCast = async (movieId) => {
  const { data } = await instance.get(`movie/${movieId}/credits`, options);

  return data;
};

export const requestMovieDetailsReviews = async (movieId) => {
  const { data } = await instance.get(`movie/${movieId}/reviews`, options);
  return data;
};
