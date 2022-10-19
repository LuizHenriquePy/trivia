import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import './Game.css';

class Game extends Component {
  state = {
    questions: [],
    currentQuestion: 0,
    answered: false,
    enableQuestion: true,
  };

  async componentDidMount() {
    const { history } = this.props;
    const isValid = await this.checkToken();
    if (!isValid) {
      history.push('/');
    }
  }

  fetchAPI = async (ENDPOINT) => {
    const request = await fetch(ENDPOINT);
    const response = await request.json();
    return response;
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

  checkToken = async () => {
    const token = localStorage.getItem('token');
    const RESPONSE_ERROR_CODE = 3;
    // if (token) {
    const ENDPOINT = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const data = await this.fetchAPI(ENDPOINT);
    this.setState({ questions: data.results });
    const { response_code: responseCode } = data;
    if (responseCode === RESPONSE_ERROR_CODE) {
      localStorage.removeItem('token');
      return false;
    }
    return true;
    // }
  };

  render() {
    const { questions, currentQuestion, answered, enableQuestion } = this.state;
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

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
