import axios from 'axios';

export const getImages = (query, page) => {
  const KEY = '26096041-fcc50392af320bb0741d0ce61';
  return axios.get(
    `https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&per_page=12&page=${page}`
  );
};

export default getImages;
