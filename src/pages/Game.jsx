import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';

class Game extends Component {
  state = {
    currentQuestion: 0,
    answered: false,
    enableQuestion: true,
  };

  checkAnswer = () => {
    this.setState({ answered: true });
  };

  changeQuestion = () => {
    this.setState({
      enableQuestion: false,
      answered: false,
    }, () => {
      const { currentQuestion } = this.state;
      const LAST_QUESTION_INDEX = 4;
      if (currentQuestion < LAST_QUESTION_INDEX) {
        this.setState((prevState) => ({
          currentQuestion: prevState.currentQuestion + 1,
        }), () => {
          this.setState({
            enableQuestion: true,
          });
        });
      } else {
        this.setState({
          enableQuestion: false,
        });
        const { history } = this.props;
        history.push('/feedback');
      }
    });
  };

  render() {
    const { currentQuestion, answered, enableQuestion } = this.state;
    const { questions } = this.props;
    const { changeQuestion, checkAnswer } = this;
    const btnNext = () => (
      <div className="divButtonNext">
        <button
          type="button"
          onClick={ changeQuestion }
          data-testid="btn-next"
          className="btn btn-secondary buttonNext"
        >
          Next
        </button>
      </div>
    );

    return (
      <div>
        <Header />
        {enableQuestion && questions.length > 0 && <Question
          quest={ questions[currentQuestion] }
          checkedAnswer={ checkAnswer }
          numberQuestion={ currentQuestion }
        />}
        {
          answered
           && btnNext()
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps, null)(Game);
