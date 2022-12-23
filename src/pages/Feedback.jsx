import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import yellowStar from '../images/star.png';
import blackStar from '../images/emptyStar.png';

class Feedback extends Component {
  addStars = () => {
    const { assertions } = this.props;
    const numberOfStars = 5;
    const starList = [];
    for (let index = 0; index < numberOfStars; index += 1) {
      if (index < assertions) {
        starList.push(<img
          src={ yellowStar }
          alt="yellow star"
          key={ index }
          width="40px"
        />);
      } else {
        starList.push(<img
          src={ blackStar }
          alt="black star"
          key={ index }
          width="40px"
        />);
      }
    }
    return starList;
  };

  render() {
    const { score, assertions } = this.props;
    const numberOfCorrectAnswersToBeWellDone = 3;
    return (
      <div>
        <Header />
        <div className="container pt-5 text-center">
          <div className="mb-5">
            <div>{ this.addStars() }</div>
            <div>
              {
                assertions >= numberOfCorrectAnswersToBeWellDone
                  ? <h1 className="mt-3">Well Done!</h1>
                  : <h1 className="mt-3">Could be better...</h1>
              }
            </div>
          </div>
          <div className="alert alert-info">
            <h3>
              Score:
              {' '}
              { score }
            </h3>
            <p>
              Assertions:
              {' '}
              { assertions }
            </p>
          </div>
          <button
            className="btn btn-danger m-2"
            type="button"
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
