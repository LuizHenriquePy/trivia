const CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY';
const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
const REQUEST_CATEGORIES_STARTED = 'REQUEST_CATEGORIES_STARTED';
const REQUEST_CATEGORIES_SUCESSFUL = 'REQUEST_CATEGORIES_SUCESSFUL';
const REQUEST_CATEGORIES_FAILED = 'REQUEST_CATEGORIES_FAILED';

const changeDifficulty = (payload) => ({
  type: CHANGE_DIFFICULTY,
  payload,
});

const changeCategory = (payload) => ({
  type: CHANGE_CATEGORY,
  payload,
});

const requestCategoriesStarted = () => ({
  type: REQUEST_CATEGORIES_STARTED,
});

const requestCategoriesSucessful = (payload) => ({
  type: REQUEST_CATEGORIES_SUCESSFUL,
  payload,
});

const requestCategoriesFailed = () => ({
  type: REQUEST_CATEGORIES_FAILED,
});

const fetchCategories = () => async (dispatch) => {
  dispatch(requestCategoriesStarted());
  try {
    const data = await fetch('https://opentdb.com/api_category.php');
    const result = data.json();
    dispatch(requestCategoriesSucessful(result.trivia_categories));
  } catch (error) {
    dispatch(requestCategoriesFailed());
  }
};

export {
  CHANGE_CATEGORY,
  CHANGE_DIFFICULTY,
  changeCategory,
  changeDifficulty,
  REQUEST_CATEGORIES_FAILED,
  REQUEST_CATEGORIES_SUCESSFUL,
  REQUEST_CATEGORIES_STARTED,
  requestCategoriesFailed,
  requestCategoriesSucessful,
  requestCategoriesStarted,
  fetchCategories,
};
