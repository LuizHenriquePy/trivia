import { ADD_SCORE, INCREMENT_NUMBER_OF_CORRECT_ANSWERS, SAVE_PLAYER } from '../actions/actionsPlayer';

const INITIAL_STATE = {
  nickname: '',
  numberOfCorrectAnswers: 0,
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_PLAYER:
    return {
      ...state,
      nickname: action.payload,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case INCREMENT_NUMBER_OF_CORRECT_ANSWERS:
    return {
      ...state,
      numberOfCorrectAnswers: state.numberOfCorrectAnswers + 1,
    };
  default:
    return state;
  }
};

export default player;
