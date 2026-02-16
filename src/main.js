// Imports from other modules and libraries
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  markupGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// DOM Elements
const form = document.querySelector('.form');
const jsSearchQuery = document.querySelector('.js-search-query');
let query = '';

// Event listener for form submission
form.addEventListener('submit', onFormSubmit);

// Function to handle form submission
function onFormSubmit(e) {
  e.preventDefault(); // Prevent default form submission behavior

  // Clear gallery and show loader before fetching data
  clearGallery();
  showLoader();

  // Get and trim the search query
  query = e.currentTarget.searchText.value.trim();
  form.reset(); // Reset the form fields

  // Validate the query
  if (query === '') {
    iziToast.info({
      title: 'Info',
      position: 'topRight',
      message: 'Please enter a search query!',
    });
    hideLoader(); // Hide loader if validation fails
    return;
  }

  // Display the search query to the user
  jsSearchQuery.textContent = `Search query : "${query}"`;

  // Fetch images from the API
  getImagesByQuery(query)
    .then(images => {
      // Check if no images were found
      if (images.hits.length === 0) {
        iziToast.info({
          title: 'Info',
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }
      // Render the gallery with the fetched images
      markupGallery(images.hits);
    })
    .catch(AxiosError => {
      // Handle errors during the fetch
      iziToast.error({
        title: 'Error',
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    })
    .finally(() => {
      // Hide the loader regardless of success or failure
      hideLoader();
    });
}
