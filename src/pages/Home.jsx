import { Component } from 'react';
import logo from '../images/logo.png';
import gear from '../images/gearSettings.png';
import podium from '../images/podium.png';

class Home extends Component {
  state = {
    name: '',
    btnDisabled: true,
    gameMode: 'standard',
  };

  handleChange = ({ target }) => {
    const minimumNumberOfCharacters = 3;
    if (target.value.length >= minimumNumberOfCharacters) {
      this.setState({ btnDisabled: false, name: target.value });
    } else {
      this.setState({ btnDisabled: true, name: target.value });
    }
  };

  handleClick = () => {
    console.log('a');
  };

  render() {
    const { name, btnDisabled, gameMode } = this.state;
    return (
      <main
        className="login-container"
      >
        <form className="d-flex flex-column justify-content-center align-items-center">
          <img src={ logo } alt="logo" width="300px" />
          <h3>
            {gameMode}
            {' '}
            mode
          </h3>
          <input
            className="form-control width mb-3"
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            placeholder="Nickname"
          />
          <button
            className="btn btn-primary width mb-3"
            type="button"
            onClick={ this.handleClick }
            disabled={ btnDisabled }
          >
            Play
          </button>
          <div className="d-flex justify-content-around width">
            <button
              className="btn btn-secondary p-0 setting-btn"
              type="button"
            >
              <img src={ gear } alt="Gear" className="setting-btn-img" width="30px" />
            </button>
            <button
              className="btn btn-warning p-0 setting-btn"
              type="button"
            >
              <img src={ podium } alt="Gear" className="ranking-btn-img" width="30px" />
            </button>
          </div>
        </form>
      </main>
    );
  }
}

export default Home;
