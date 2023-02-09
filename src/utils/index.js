export const getImageFullPath = (path) => {
  return `https://image.tmdb.org/t/p/w500/${path}`;
};

export const sortByFilter = (filter) => {
  return `${filter.sortBy}.${filter.sort}`;
};
