const base64ToUtf8 = (data) => data.map((obj) => ({
  category: decodeURIComponent(atob(obj.category)),
  type: decodeURIComponent(atob(obj.type)),
  difficulty: decodeURIComponent(atob(obj.difficulty)),
  question: decodeURIComponent(atob(obj.question)),
  correct_answer: decodeURIComponent(atob(obj.correct_answer)),
  incorrect_answers: obj.incorrect_answers.map((str) => decodeURIComponent(atob(str))),
}));

export default base64ToUtf8;
