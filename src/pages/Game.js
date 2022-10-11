import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';

class Game extends Component {
  state = {
    questions: [],
    currentQuestion: 0,
    time: 30,
    idTimer: '',
    answered: false,
  };

  async componentDidMount() {
    console.log('Teste');
    const { history } = this.props;
    const isValid = await this.checkToken();
    if (!isValid) {
      history.push('/');
    }
    // const { questions } = this.state;
    // console.log(questions);
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
    const { currentQuestion } = this.state;
    const LAST_QUESTION_INDEX = 4;
    if (currentQuestion < LAST_QUESTION_INDEX) {
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion + 1,
        time: 30,
      }), () => this.timer());
    }
  };

  checkToken = async () => {
    const token = localStorage.getItem('token');
    const RESPONSE_ERROR_CODE = 3;
    // if (token) {
    const ENDPOINT = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const data = await this.fetchAPI(ENDPOINT);
    console.log(data);
    console.log('Aqui');
    this.setState({ questions: data.results });
    const { response_code: responseCode } = data;
    if (responseCode === RESPONSE_ERROR_CODE) {
      console.log('token inválido');
      localStorage.removeItem('token');
      return false;
    }
    return true;
    // }
  };

  timerCounter = () => {
    this.setState((prevState) => ({
      time: prevState.time - 1,
    }));
  };

  stopTimer = (id) => {
    const { time } = this.state;
    if (time === 0) {
      clearInterval(id);
    // this.setState({ time: 30 });
    }
  };

  timer = () => {
    const ONE_SECOND = 1000;
    const idTimer = setInterval(this.timerCounter, ONE_SECOND);
    this.setState({ idTimer });
    // console.log(time);
  };

  render() {
    const { questions, currentQuestion, time, idTimer, answered } = this.state;
    const { changeQuestion, checkAnswer, stopTimer, timer } = this;
    const btnNext = () => (
      <button type="button" onClick={ changeQuestion } data-testid="btn-next">
        Next
      </button>
    );

    return (
      <div>
        <Header />
        {questions.length > 0 && <Question
          quest={ questions[currentQuestion] }
          stopTimer={ stopTimer }
          timer={ timer }
          idTimer={ idTimer }
          time={ time }
          checkedAnswer={ checkAnswer }
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
