import { ADD_SCORE, SAVE_PLAYER } from '../actions/actionsPlayer';

const INITIAL_STATE = {
  nickname: '',
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
      score: state.score + action.payload,
    };
  default:
    return state;
  }
};

export default player;
