import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '34147979-e919755f9413e6e8eb4321476';

export const fetchImages = async params => {
  const { data } = await axios.get('', {
    params: {
      key: API_KEY,
      q: '',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      page: 1,
      ...params,
    },
  });

  return data;
};
