import { SAVE_QUESTIONS } from '../actions/actionsQuestions';

const INITIAL_STATE = {
  questions: [],
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return {
      questions: action.payload,
    };
  default:
    return state;
  }
};

export default questions;
