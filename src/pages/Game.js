import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';

class Game extends Component {
  state = {
    questions: [],
    currentQuestion: 0,
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

  changeQuestion = () => {
    const { currentQuestion } = this.state;
    const LAST_QUESTION_INDEX = 4;
    if (currentQuestion < LAST_QUESTION_INDEX) {
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion + 1,
      }));
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

  render() {
    const { questions, currentQuestion } = this.state;
    const { changeQuestion } = this;
    return (
      <div>
        <Header />
        {questions.length > 0 && <Question
          quest={ questions[currentQuestion] }
        />}
        <button type="button" onClick={ changeQuestion }>Next</button>
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
