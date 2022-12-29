import { CHANGE_CATEGORY, CHANGE_DIFFICULTY } from '../actions/actionsGameSettings';

const INITIAL_STATE = {
  difficulty: 'random',
  category: 'random',
};

const gameSettings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_CATEGORY:
    return {
      ...state,
      category: action.payload,
    };
  case CHANGE_DIFFICULTY:
    return {
      ...state,
      difficulty: action.payload,
    };
  default:
    return state;
  }
};

export default gameSettings;
