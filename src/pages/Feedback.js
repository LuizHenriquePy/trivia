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
    const wellDone = () => (
      <div>
        <img src={ star } alt="star" width="40px" />
        <img src={ star } alt="star" width="40px" />
        <img src={ star } alt="star" width="40px" />
        <p data-testid="feedback-text" className="mt-3">Well Done!</p>
      </div>
    );
    const beBetter = () => (
      <div>
        <img src={ star } alt="star" width="40px" />
        <img src={ emptyStar } alt="emptyStar" width="40px" />
        <img src={ emptyStar } alt="emptyStar" width="40px" />
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
                ? wellDone()
                : beBetter()
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
