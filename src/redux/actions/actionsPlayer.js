const SAVE_PLAYER = 'SAVE_PLAYER';
const INCREMENT_NUMBER_OF_CORRECT_ANSWERS = 'INCREMENT_NUMBER_OF_CORRECT_ANSWERS';
const ADD_SCORE = 'ADD_SCORE';

const savePlayer = (payload) => ({
  type: SAVE_PLAYER,
  payload,
});

const incrementNumberOfCorrectAnswers = (payload) => ({
  type: INCREMENT_NUMBER_OF_CORRECT_ANSWERS,
  payload,
});

const addScore = (payload) => ({
  type: ADD_SCORE,
  payload,
});

export {
  SAVE_PLAYER,
  INCREMENT_NUMBER_OF_CORRECT_ANSWERS,
  ADD_SCORE,
  addScore,
  incrementNumberOfCorrectAnswers,
  savePlayer,
};
