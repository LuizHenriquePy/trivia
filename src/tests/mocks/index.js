const selectCategories = {
  trivia_categories: [
    { id: 9, name: "General Knowledge" },
    { id: 10, name: "Entertainment: Books" },
    { id: 11, name: "Entertainment: Film" },
    { id: 12, name: "Entertainment: Music" },
    { id: 13, name: "Entertainment: Musicals & Theatres" },
  ],
};

const initialStateStoreRedux = {
  player: {
    nickname: '',
    numberOfCorrectAnswers: 0,
    score: 0
  },
  questions: {
    questions: []
  },
  gameSettings: {
    selectedDifficulty: 'random',
    selectedCategory: 'Random',
    isFecthingCategories: false,
    isRequestCategoriesFailed: false,
    categories: []
  }
};

module.exports = {
  initialStateStoreRedux,
  selectCategories,
};