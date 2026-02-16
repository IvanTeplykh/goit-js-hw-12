// Imports from libraries
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Pixabay API Key
const API_KEY = '54652097-fa33845d90f17562231f3e558';

// Function to fetch images from Pixabay API
export async function getImagesByQuery(query, page, per_page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: per_page, // Number of images per page
  };
  try {
    // Make a GET request using Axios
    const response = await axios({
      method: 'get',
      url: 'https://pixabay.com/api/',
      params,
    });
    return response.data;
  } catch (error) {
    // Handle errors during the fetch
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  }
}
