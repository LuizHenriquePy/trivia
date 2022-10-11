import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { calculateScore } from '../redux/actions/index';

class Question extends Component {
  state = {
    incorrectClass: '',
    correctClass: '',
    // time: 3,
    // idTimer: '',
    // answerList: [],
    lastScore: 0,
  };

  componentDidMount() {
    const {
      timer,
      // quest: {
      //   correct_answer: correctAnswer, incorrect_answers: incorrectAnswers,
      // },
    } = this.props;
    // this.setState({
    //   answerList: this.randomAnswers(correctAnswer, incorrectAnswers),
    // }, () =>
    timer();
    // );
  }

  componentDidUpdate() {
    const { idTimer, stopTimer } = this.props;
    stopTimer(idTimer);
  }

  checkAnswer = (answer) => {
    const { quest:
      { correct_answer: correctAnswer, difficulty },
    checkedAnswer, time, dispatch, idTimer, stopTimer } = this.props;
    const { lastScore } = this.state;
    checkedAnswer();
    console.log(answer === correctAnswer);
    const EASY = 1;
    const MEDIUM = 2;
    const HARD = 3;
    const TEN = 10;
    if (answer === correctAnswer) {
      switch (difficulty) {
      case 'easy':
        dispatch(calculateScore(lastScore + TEN + (time * EASY)));
        this.setState((prev) => ({ lastScore: prev.lastScore + TEN + (time * EASY) }));
        break;
      case 'medium':
        dispatch(calculateScore(lastScore + TEN + (time * MEDIUM)));
        this.setState((prev) => ({ lastScore: prev.lastScore + TEN + (time * MEDIUM) }));
        break;
      default:
        dispatch(calculateScore(lastScore + TEN + (time * HARD)));
        this.setState((prev) => ({ lastScore: prev.lastScore + TEN + (time * HARD) }));
      }
    }
    console.log(time);
    stopTimer(idTimer);
    this.setState({
      incorrectClass: 'incorrect',
      correctClass: 'correct',
    });
  };

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
    }, time, score } = this.props;
    const { correctClass, incorrectClass } = this.state;
    const { checkAnswer } = this;
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
                  onClick={ () => checkAnswer(e) }
                  className={ incorrectClass }
                  disabled={ time === 0 }
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
                onClick={ () => checkAnswer(e) }
                className={ correctClass }
                disabled={ time === 0 }
              >
                {e}
              </button>
            );
          })}
          <div>{time === 0 ? 0 : time}</div>
          <p>{score}</p>

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
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
  timer: PropTypes.func.isRequired,
  idTimer: PropTypes.number.isRequired,
  stopTimer: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  checkedAnswer: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  // assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Question);
