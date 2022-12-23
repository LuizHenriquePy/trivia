import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { savePlayer, saveQuestions } from '../redux/actions';
import logo from '../images/logo.png';

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
    const endpoint = (token) => `https://opentdb.com/api.php?amount=5&token=${token}`;
    const tokenLocalStorage = localStorage.getItem('token');
    if (tokenLocalStorage) {
      const RESPONSE_SUCESS_CODE = 0;
      const data = await this.fetchAPI(endpoint(tokenLocalStorage));
      const { response_code: responseCode } = data;
      if (responseCode === RESPONSE_SUCESS_CODE) {
        dispatch(saveQuestions(data.results));
        return;
      }
    }
    localStorage.removeItem('token');
    const newToken = await this.getToken();
    localStorage.setItem('token', newToken);
    const data = await this.fetchAPI(endpoint(newToken));
    dispatch(saveQuestions(data.results));
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
      <div className="login-container text-center">
        <img src={ logo } alt="logo" className="mb-4" width="300px" />
        <div className="col-md-12">
          <div className="form-group">
            <label
              htmlFor="input-player-name"
              className="form-label"
            >
              <input
                className="form-control mt-2 mb-3"
                type="text"
                data-testid="input-player-name"
                id="input-player-name"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                placeholder="Nickname"
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="input-gravatar-email" className="form-label">
              <input
                className="form-control mt-2 mb-4"
                type="text"
                data-testid="input-gravatar-email"
                id="input-gravatar-email"
                name="email"
                placeholder="Email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <div className="col-lg-12 mb-3 m">
            <button
              className="btn btn-primary col-lg-3 "
              type="button"
              data-testid="btn-play"
              onClick={ this.handleClick }
              disabled={ btnDisabled }
            >
              Play
            </button>
          </div>
        </div>
      </div>
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
