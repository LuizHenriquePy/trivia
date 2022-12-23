import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import star from '../images/star.png';
import emptyStar from '../images/emptyStar.png';

class Feedback extends Component {
  render() {
    const { score, assertions } = this.props;
    const magicNumb = 3;
    const ONE = 1;
    const TWO = 2;
    const THREE = 3;
    const FOUR = 4;
    const stars = (assert) => {
      switch (assert) {
      case 0:
        return (
          <div>
            <img src={ emptyStar } alt="emptyStar" width="40px" />
            <img src={ emptyStar } alt="emptyStar" width="40px" />
            <img src={ emptyStar } alt="emptyStar" width="40px" />
            <img src={ emptyStar } alt="emptyStar" width="40px" />
            <img src={ emptyStar } alt="emptyStar" width="40px" />
          </div>
        );
      case ONE:
        return (
          <div>
            <img src={ star } alt="star" width="40px" />
            <img src={ emptyStar } alt="emptyStar" width="40px" />
            <img src={ emptyStar } alt="emptyStar" width="40px" />
            <img src={ emptyStar } alt="emptyStar" width="40px" />
            <img src={ emptyStar } alt="emptyStar" width="40px" />
          </div>
        );
      case TWO:
        return (
          <div>
            <img src={ star } alt="star" width="40px" />
            <img src={ star } alt="star" width="40px" />
            <img src={ emptyStar } alt="emptyStar" width="40px" />
            <img src={ emptyStar } alt="emptyStar" width="40px" />
            <img src={ emptyStar } alt="emptyStar" width="40px" />
          </div>
        );
      case THREE:
        return (
          <div>
            <img src={ star } alt="star" width="40px" />
            <img src={ star } alt="star" width="40px" />
            <img src={ star } alt="star" width="40px" />
            <img src={ emptyStar } alt="emptyStar" width="40px" />
            <img src={ emptyStar } alt="emptyStar" width="40px" />
          </div>
        );
      case FOUR:
        return (
          <div>
            <img src={ star } alt="star" width="40px" />
            <img src={ star } alt="star" width="40px" />
            <img src={ star } alt="star" width="40px" />
            <img src={ star } alt="star" width="40px" />
            <img src={ emptyStar } alt="emptyStar" width="40px" />
          </div>
        );
      default:
        return (
          <div>
            <img src={ star } alt="star" width="40px" />
            <img src={ star } alt="star" width="40px" />
            <img src={ star } alt="star" width="40px" />
            <img src={ star } alt="star" width="40px" />
            <img src={ star } alt="star" width="40px" />
          </div>
        );
      }
    };
    const wellDone = (assert) => (
      <div>
        {stars(assert)}
        <p data-testid="feedback-text" className="mt-3">Well Done!</p>
      </div>
    );
    const beBetter = (assert) => (
      <div>
        {stars(assert)}
        <p data-testid="feedback-text" className="mt-3">Could be better...</p>
      </div>
    );
    return (
      <div>
        <Header />
        <div className="container pt-5 text-center">
          <h1 className="mb-5">
            {
              assertions >= magicNumb
                ? wellDone(assertions)
                : beBetter(assertions)
            }
          </h1>
          <div className="alert alert-info">
            <h3 data-testid="feedback-total-score">
              Score:
              {' '}
              { score }
            </h3>
            <p data-testid="feedback-total-question">
              Assertions:
              {' '}
              { assertions }
            </p>
          </div>
          <button
            className="btn btn-danger m-2"
            type="button"
            data-testid="btn-ranking"
            onClick={ () => {
              const { history } = this.props;
              history.push('/ranking');
            } }
          >
            Ranking
          </button>
          <button
            type="button"
            className="btn btn-success m-2"
            data-testid="btn-play-again"
            onClick={ () => {
              const { history } = this.props;
              history.push('/');
            } }
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
