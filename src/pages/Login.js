import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends Component {
  state = {
    name: '',
    email: '',
    btnDisabled: true,
  };

  componentDidMount() {
    // oi
  }

  checkToken = async () => {
    const token = localStorage.getItem('token');
    const RESPONSE_ERROR_CODE = 3;
    if (token) {
      const ENDPOINT = `https://opentdb.com/api.php?amount=5&token=${token}`;
      const data = await this.fetchAPI(ENDPOINT);
      const { response_code: responseCode } = data;
      if (responseCode === RESPONSE_ERROR_CODE) {
        const newToken = await this.getToken();
        localStorage.setItem('token', newToken);
        console.log('criou um novo token');
      }
    } else {
      const newToken = await this.getToken();
      localStorage.setItem('token', newToken);
    }
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
    const { history } = this.props;
    await this.checkToken();
    history.push('/game');
  };

  getToSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, btnDisabled } = this.state;
    return (
      <div>
        <label htmlFor="input-player-name">
          Nome
          <input
            type="text"
            data-testid="input-player-name"
            id="input-player-name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          Email
          <input
            type="text"
            data-testid="input-gravatar-email"
            id="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClick }
          disabled={ btnDisabled }
        >
          Play
        </button>
        <button type="button" data-testid="btn-settings" onClick={ this.getToSettings }>
          Configurações
        </button>
      </div>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
