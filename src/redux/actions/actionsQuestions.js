const SAVE_QUESTIONS = 'SAVE_QUESTIONS';

const saveQuestions = (payload) => ({
  type: SAVE_QUESTIONS,
  payload,
});

export {
  SAVE_QUESTIONS,
  saveQuestions,
};
