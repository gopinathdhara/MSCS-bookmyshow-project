export const movieCache = new Map();

export const MOVIE_CACHE_KEYS = {
  ALL_MOVIES: "movies:all",
  FEATURED_MOVIES: "movies:featured",
  TRENDING_MOVIES: "movies:trending",
  LATEST_MOVIES: "movies:latest"
};

export const clearMovieCache = () => {
  movieCache.delete(MOVIE_CACHE_KEYS.ALL_MOVIES);
  movieCache.delete(MOVIE_CACHE_KEYS.FEATURED_MOVIES);
  movieCache.delete(MOVIE_CACHE_KEYS.TRENDING_MOVIES);
  movieCache.delete(MOVIE_CACHE_KEYS.LATEST_MOVIES);
};
