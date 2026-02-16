// Imports from libraries
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Pixabay API Key
const API_KEY = '54652097-fa33845d90f17562231f3e558';

// Function to fetch images from Pixabay API
export function getImagesByQuery(query) {
  // Make a GET request using Axios
  return axios({
    method: 'get',
    url: 'https://pixabay.com/api/',
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40, // Number of images per page
    },
  })
    .then(function (response) {
      // Log hits to console for debugging
      console.log(response.data.hits);
      // Return the data from the response
      return response.data;
    })
    .catch(function (AxiosError) {
      // Handle errors during the fetch
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    });
}
