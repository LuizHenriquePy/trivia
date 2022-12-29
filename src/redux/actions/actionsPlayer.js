const SAVE_PLAYER = 'SAVE_PLAYER';
const ADD_SCORE = 'ADD_SCORE';

const savePlayer = (payload) => ({
  type: SAVE_PLAYER,
  payload,
});

const addScore = (payload) => ({
  type: ADD_SCORE,
  payload,
});

export {
  SAVE_PLAYER,
  ADD_SCORE,
  addScore,
  savePlayer,
};
