import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Question extends Component {
  // randomAnswers = (correct, incorrectQuestions, type) => {
  //   let QUESTIONS_NUMBER = 0;
  //   const MULTIPLE_QUESTIONS = 4;
  //   if (type === 'multiple') {
  //     QUESTIONS_NUMBER = MULTIPLE_QUESTIONS;
  //   } else {
  //     QUESTIONS_NUMBER = 2;
  //   }
  //   const randomIndex = Math.floor(Math.random() * QUESTIONS_NUMBER);
  //   const questionsArray = [];

  //   for (let i = 0; i < QUESTIONS_NUMBER - 1; i += 1) {
  //     if (randomIndex === i) {
  //       questionsArray.push(correct);
  //       questionsArray.push(incorrectQuestions[i]);
  //     } else {
  //       questionsArray.push(incorrectQuestions[i]);
  //     }
  //   }

  //   if (questionsArray.length < QUESTIONS_NUMBER) questionsArray.push(correct);

  //   return questionsArray;
  // };

  randomAnswers = (correct, incorrectAnswers) => {
    const ONE_DOT_FIVE = 0.5;
    const list = [...incorrectAnswers, correct];
    const newList = list.sort(() => Math.random() - ONE_DOT_FIVE);
    return newList;
  };

  render() {
    const { quest: {
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
      category,
    } } = this.props;
    const answerList = this.randomAnswers(correctAnswer, incorrectAnswers);
    const MINUS_1 = -1;
    console.log(correctAnswer);
    let i = MINUS_1;
    return (
      <div>
        <h1 data-testid="question-category">{category}</h1>
        <h1 data-testid="question-text">{question}</h1>
        <div data-testid="answer-options">
          {answerList.map((e) => {
            if (e !== correctAnswer) {
              i += 1;
              return (
                <button
                  key={ e }
                  type="button"
                  data-testid={ `wrong-answer-${i}` }
                >
                  {e}
                </button>
              );
            }
            return (
              <button
                key={ e }
                type="button"
                data-testid="correct-answer"
              >
                {e}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  quest: PropTypes.shape({
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};
