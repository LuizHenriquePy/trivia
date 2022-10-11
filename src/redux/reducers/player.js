import { CALCULATE_SCORE, SAVE_PLAYER } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_PLAYER:
    return {
      ...state,
      ...action.payload,
    };
  case CALCULATE_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
};

export const login = (payload) => ({
  type: 'ACTION',
  payload: { ...payload, score: 0 },
});

export default player;
