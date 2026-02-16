// Imports from other modules and libraries
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  markupGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showImgTotal,
  showLoadMoreBtn,
  hideLoadMoreBtn,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// DOM Elements
const form = document.querySelector('.form');
const jsSearchQuery = document.querySelector('.js-search-query');
const loadMoreBtn = document.querySelector('.load-more');
const jsImgTotal = document.querySelector('.img-total');

// Variables
let query = '';
let page = 1;
let imagesInPage = 15;
let imagesCount = 0;

// Event listener for form submission
form.addEventListener('submit', onFormSubmit);
// Event listener for load more button click
loadMoreBtn.addEventListener('click', onLoadMoreClick);

// Function to handle form submission
async function onFormSubmit(e) {
  e.preventDefault(); // Prevent default form submission behavior

  // function to clear gallery, show loader, and hide load more button
  clearGallery();
  showLoader();
  hideLoadMoreBtn();

  // Get and trim the search query
  query = e.currentTarget.searchText.value.trim();
  imagesCount = 0;
  page = 1; // Reset page to 1

  form.reset(); // Reset the form fields

  // Validate the query
  if (query === '') {
    iziToast.warning({
      title: 'warning',
      position: 'topRight',
      message: 'Please enter a search query!',
    });
    jsImgTotal.textContent = ``;
    jsSearchQuery.textContent = `Search query :`;
    clearGallery();
    hideLoadMoreBtn(); // Hide load more button if validation fails
    hideLoader(); // Hide loader if validation fails
    return;
  }

  // Display the search query to the user
  jsSearchQuery.textContent = `Search query : "${query}"`;

  // Fetch images from the API
  try {
    const images = await getImagesByQuery(query, page, imagesInPage);

    // Check if no images were found
    if (images.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      hideLoadMoreBtn(); // Hide load more button if no images were found
    } else {
      // Render the gallery with the fetched images

      markupGallery(images.hits);
      imagesCount = showImgTotal(images, imagesCount);
    }
  } catch (error) {
    console.log(error);
    // Handle errors during the fetch
    iziToast.error({
      title: 'Error',
      position: 'topRight',
      message: 'Sorry, something went wrong. Please try again!',
    });
  } finally {
    // Hide the loader regardless of success or failure
    hideLoader();
    page += 1;
  }
}

async function onLoadMoreClick() {
  showLoader();
  try {
    const images = await getImagesByQuery(query, page, imagesInPage);
    markupGallery(images.hits);
    imagesCount = showImgTotal(images, imagesCount);
    page += 1;
    const firstCard = document.querySelector('.gallery').firstElementChild;
    if (firstCard) {
      const { height } = firstCard.getBoundingClientRect();
      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    }
  } catch (AxiosError) {
    iziToast.error({
      title: 'Error',
      position: 'topRight',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  } finally {
    hideLoader();
  }
}
