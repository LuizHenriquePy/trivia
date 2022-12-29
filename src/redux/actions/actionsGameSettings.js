const CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY';
const CHANGE_CATEGORY = 'CHANGE_CATEGORY';

const changeDifficulty = (payload) => ({
  type: CHANGE_DIFFICULTY,
  payload,
});

const changeCategory = (payload) => ({
  type: CHANGE_CATEGORY,
  payload,
});

export {
  CHANGE_CATEGORY,
  CHANGE_DIFFICULTY,
  changeCategory,
  changeDifficulty,
};
