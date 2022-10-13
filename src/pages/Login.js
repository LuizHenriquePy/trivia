import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { savePlayer } from '../redux/actions';
import logo1 from '../images/logo1.png';
// import trivia from '../images/trivia.png';

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
    if (!token) {
      const newToken = await this.getToken();
      localStorage.setItem('token', newToken);
    }
  };

  // checkToken = async () => {
  //   const token = localStorage.getItem('token');
  //   const RESPONSE_ERROR_CODE = 3;
  //   if (token) {
  //     const ENDPOINT = `https://opentdb.com/api.php?amount=5&token=${token}`;
  //     const data = await this.fetchAPI(ENDPOINT);
  //     const { response_code: responseCode } = data;
  //     if (responseCode === RESPONSE_ERROR_CODE) {
  //       // const newToken = await this.getToken();
  //       // localStorage.setItem('token', newToken);
  //       console.log('token inválido');
  //       localStorage.removeItem('token');
  //     }
  //   } else{
  //     const newToken = await this.getToken();
  //     localStorage.setItem('token', newToken);
  //   }
  // };

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
    const { name, email } = this.state;
    const { history, dispatch } = this.props;
    await this.checkToken();
    dispatch(savePlayer({ name, gravatarEmail: email, score: 0 }));
    history.push('/game');
  };

  getToSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, btnDisabled } = this.state;
    return (
      <div className="container pt-5 text-center">
        {/* <img src={ trivia } alt="logo" className="mb-4" width="300px" /> */}
        <img src={ logo1 } alt="logo" className="mb-4" width="300px" />
        <div className="col-md-12">
          <div className="form-group">
            <label
              htmlFor="input-player-name"
              className="form-label"
            >
              {/* Nome */}
              <input
                className="form-control mt-2 mb-3"
                type="text"
                data-testid="input-player-name"
                id="input-player-name"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                placeholder="Player Name"
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="input-gravatar-email" className="form-label">
              {/* Email */}
              <input
                className="form-control mt-2 mb-4"
                type="text"
                data-testid="input-gravatar-email"
                id="input-gravatar-email"
                name="email"
                placeholder="Gravatar email"
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
          <div className="col-md-12">
            <div className="form-group">
              <button
                className="btn btn-sm btn-light"
                type="button"
                data-testid="btn-settings"
                onClick={ this.getToSettings }
              >
                Configurações
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   userValue: (name, email) => dispatch(login({ name, email })),
// });

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
