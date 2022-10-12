import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { calculateScore, saveAssertions } from '../redux/actions/index';
import Timer from './Timer';

class Question extends Component {
  state = {
    incorrectClass: '',
    correctClass: '',
    time: 30,
    answerList: [],
  };

  componentDidMount() {
    const { quest: {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } } = this.props;
    const answerList = this.randomAnswers(correctAnswer, incorrectAnswers);
    this.setState({
      answerList,
    });
  }

  changeTime = (timeSec) => {
    this.setState({
      time: timeSec,
    });
  };

  checkAnswer = (answer) => {
    const { quest:
      { correct_answer: correctAnswer, difficulty },
    checkedAnswer, dispatch } = this.props;
    const { time } = this.state;
    checkedAnswer();
    const EASY = 1;
    const MEDIUM = 2;
    const HARD = 3;
    const TEN = 10;
    if (answer === correctAnswer) {
      dispatch(saveAssertions());
      switch (difficulty) {
      case 'easy':
        dispatch(calculateScore(TEN + (time * EASY)));
        break;
      case 'medium':
        dispatch(calculateScore(TEN + (time * MEDIUM)));
        break;
      default:
        dispatch(calculateScore(TEN + (time * HARD)));
      }
    }
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
      category,
    }, score, checkedAnswer } = this.props;
    const { correctClass, incorrectClass, answerList, time } = this.state;
    const { checkAnswer, changeTime } = this;
    const MINUS_1 = -1;
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
                  disabled={ time === 0 }
                  onClick={ () => checkAnswer(e) }
                  className={ incorrectClass }
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
                disabled={ time === 0 }
                onClick={ () => checkAnswer(e) }
                className={ correctClass }
              >
                {e}
              </button>
            );
          })}
          <p>{score}</p>
          <Timer checkedAnswer={ checkedAnswer } changeTime={ changeTime } />
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
