const base64ToUtf8 = (data) => data.map((obj) => ({
  category: encodeURIComponent(atob(obj.category)),
  type: encodeURIComponent(atob(obj.type)),
  difficulty: encodeURIComponent(atob(obj.difficulty)),
  question: encodeURIComponent(atob(obj.question)),
  correct_answer: encodeURIComponent(atob(obj.correct_answer)),
  incorrect_answer: obj.incorrect_answer.map((str) => encodeURIComponent(atob(str))),
}));

export default base64ToUtf8;
