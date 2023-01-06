import {
  CHANGE_CATEGORY,
  CHANGE_DIFFICULTY,
  REQUEST_CATEGORIES_FAILED,
  REQUEST_CATEGORIES_STARTED,
  REQUEST_CATEGORIES_SUCESSFUL,
} from '../actions/actionsGameSettings';

const INITIAL_STATE = {
  selectedDifficulty: 'random',
  selectedCategory: 'Random',
  isFecthingCategories: false,
  isRequestCategoriesFailed: false,
  categories: [],
};

const gameSettings = (state = INITIAL_STATE, action) => {
  if (action.type === REQUEST_CATEGORIES_SUCESSFUL) {
    action.payload.unshift({ id: 'Random', name: 'Random' });
  }
  switch (action.type) {
  case CHANGE_CATEGORY:
    return {
      ...state,
      selectedCategory: action.payload,
    };
  case CHANGE_DIFFICULTY:
    return {
      ...state,
      selectedDifficulty: action.payload,
    };
  case REQUEST_CATEGORIES_STARTED:
    return {
      ...state,
      isFecthingCategories: true,
    };
  case REQUEST_CATEGORIES_SUCESSFUL:
    return {
      ...state,
      isFecthingCategories: false,
      isRequestCategoriesFailed: false,
      categories: action.payload,
    };
  case REQUEST_CATEGORIES_FAILED:
    return {
      ...state,
      isFecthingCategories: false,
      isRequestCategoriesFailed: true,
    };
  default:
    return state;
  }
};

export default gameSettings;
