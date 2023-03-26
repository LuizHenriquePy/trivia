/* import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { savePlayer, saveQuestions } from '../redux/actions';

import base64ToUtf8 from '../utils/base64ToUft8';

class Login extends Component {
  state = {
    name: '',
    email: '',
    btnDisabled: true,
  };

  fetchAPI = async (ENDPOINT) => {
    const request = await fetch(ENDPOINT);
    const response = await request.json();
    return response;
  };

  getToken = async () => {
    const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
    const data = await this.fetchAPI(ENDPOINT);
    const { token } = data;
    return token;
  };

  checkToken = async () => {
    const { dispatch } = this.props;
    const endpoint = (token) => `https://opentdb.com/api.php?amount=5&token=${token}&encode=base64`;
    const tokenLocalStorage = localStorage.getItem('token');
    if (tokenLocalStorage) {
      const RESPONSE_SUCESS_CODE = 0;
      const data = await this.fetchAPI(endpoint(tokenLocalStorage));
      const { response_code: responseCode } = data;
      if (responseCode === RESPONSE_SUCESS_CODE) {
        dispatch(saveQuestions(base64ToUtf8(data.results)));
        return;
      }
    }
    localStorage.removeItem('token');
    const newToken = await this.getToken();
    localStorage.setItem('token', newToken);
    const data = await this.fetchAPI(endpoint(newToken));
    dispatch(saveQuestions(base64ToUtf8(data.results)));
  };

  validateButton = (name, email) => !(name.length > 0 && email.length > 0);

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { name: name1, email } = this.state;
      this.setState({
        btnDisabled: this.validateButton(name1, email),
      });
    });
  };

  handleClick = async () => {
    const { name, email } = this.state;
    const { history, dispatch } = this.props;
    await this.checkToken();
    dispatch(savePlayer({ name, gravatarEmail: email, score: 0, assertions: 0 }));
    history.push('/game');
  };

  render() {
    const { name, email, btnDisabled } = this.state;
    return (

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
 */
