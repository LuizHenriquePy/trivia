import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCategories } from '../redux/actions/actionsGameSettings';
import logo from '../images/logo.png';
import podium from '../images/podium.png';

class Home extends Component {
  state = {
    nickname: '',
    isHiddenAlert: true,
    selectedDifficulty: 'random',
    selectedCategory: 'Random',
    radioButtonsClasses: {
      easy: 'radio-button radio-button-left text-capitalize',
      medium: 'radio-button text-capitalize',
      hard: 'radio-button text-capitalize',
      random: 'radio-button radio-button-right text-capitalize isChecked-radio-button',
    },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategories());
  }

  handleChange = ({ target }) => {
    const minimumNumberOfCharacters = 3;
    if (target.value.length >= minimumNumberOfCharacters) {
      this.setState((prevState) => ({ ...prevState, isHiddenAlert: true, nickname: target.value }));
    } else {
      this.setState((prevState) => ({ ...prevState, isHiddenAlert: true, nickname: target.value }));
    }
  };

  handleClick = () => {
    const { isFecthingCategories, isRequestCategoriesFailed } = this.props;
    if (!(isFecthingCategories || isRequestCategoriesFailed)) {
      const { nickname } = this.state;
      const minimumNumberOfCharacters = 3;
      if (nickname.length >= minimumNumberOfCharacters) {
        console.log('PLAY');
        return;
      }
      this.setState((prevState) => ({ ...prevState, isHiddenAlert: false }));
    }
  };

  handleClickRadioButton = ({ target }) => {
    const { selectedDifficulty, radioButtonsClasses } = this.state;
    if (selectedDifficulty !== target.value) {
      const oldButtonClasses = radioButtonsClasses[selectedDifficulty];
      const newButtonClasses = oldButtonClasses.replace(' isChecked-radio-button', '');
      const oldSelectedButtonClasses = radioButtonsClasses[target.value];
      const newSelectedButtonClasses = oldSelectedButtonClasses.concat(' ', 'isChecked-radio-button');
      this.setState((prevState) => ({
        ...prevState,
        radioButtonsClasses: {
          ...prevState.radioButtonsClasses,
          [selectedDifficulty]: newButtonClasses,
          [target.value]: newSelectedButtonClasses,
        },
        selectedDifficulty: target.value,
      }));
    }
  };

  handleSelect = ({ target }) => {
    this.setState((prevState) => ({ ...prevState, selectedCategory: target.value }));
  };

  render() {
    const {
      nickname,
      isHiddenAlert,
      SelectedCategory,
      radioButtonsClasses: { random, easy, medium, hard },
    } = this.state;
    const {
      isFecthingCategories,
      isRequestCategoriesFailed,
      categories,
    } = this.props;
    return (
      <main
        className="login-container"
      >
        <div
          className="alert alert-danger"
          role="alert"
          hidden={ !isRequestCategoriesFailed }
        >
          Error when trying to connect to the server
        </div>
        <form className="d-flex flex-column justify-content-center align-items-center">
          <img src={ logo } alt="logo" width="300px" />
          <input
            className="form-control width mb-3"
            type="text"
            value={ nickname }
            onChange={ this.handleChange }
            placeholder="Nickname"
          />
          <div hidden={ isHiddenAlert }>
            <span className="text-danger">Please enter at least 3 characters</span>
          </div>
          <button
            className="play-button width mb-3 play-button-isDisabled"
            type="button"
            onClick={ this.handleClick }
          >
            {
              (isFecthingCategories || isRequestCategoriesFailed)
                ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                )
                : (
                  <span>Play</span>
                )
            }
          </button>
          <div>
            <div className="mb-3 d-flex flex-row justify-content-center">
              <input
                type="button"
                onClick={ this.handleClickRadioButton }
                className={ easy }
                value="easy"
              />
              <input
                type="button"
                onClick={ this.handleClickRadioButton }
                className={ medium }
                value="medium"
              />
              <input
                type="button"
                onClick={ this.handleClickRadioButton }
                className={ hard }
                value="hard"
              />
              <input
                type="button"
                onClick={ this.handleClickRadioButton }
                className={ random }
                value="random"
              />
            </div>
            <select
              className="form-select mb-3"
              value={ SelectedCategory }
              onChange={ this.handleSelect }
              defaultValue={ SelectedCategory }
            >
              {
                categories && categories.map((category) => (
                  <option
                    key={ category.id }
                    value={ category.id }
                  >
                    {category.name}
                  </option>))
              }
            </select>
          </div>
          <button
            className="btn btn-warning p-0 setting-btn d-flex justify-content-center align-items-center"
            type="button"
          >
            <img src={ podium } alt="Podium" className="ranking-btn-img" width="27px" />
            <span
              className="text-white fw-semibold ml-3"
            >
              Ranking
            </span>
          </button>
        </form>
      </main>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFecthingCategories: PropTypes.bool.isRequired,
  isRequestCategoriesFailed: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  isFecthingCategories: state.gameSettings.isFecthingCategories,
  isRequestCategoriesFailed: state.gameSettings.isRequestCategoriesFailed,
  categories: state.gameSettings.categories,
});

export default connect(mapStateToProps)(Home);
