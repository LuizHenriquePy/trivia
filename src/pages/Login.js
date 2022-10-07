import { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  state = {
    name: '',
    email: '',
    btnDisabled: true,
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

  handleClick = () => {
    console.log('Deu certo');
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
      </div>
    );
  }
}

export default connect()(Login);
