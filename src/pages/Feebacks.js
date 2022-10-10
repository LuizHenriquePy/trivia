import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedbacks extends Component {
  render() {
    const { score, assertions } = this.props;
    const magicNumb = 3;
    return (
      <div>
        <h1>
          Feedbacks:
          {
            assertions >= magicNumb ? <span data-testid="feedback-text">Well Done!</span>
              : <span data-testid="feedback-text">Could be better...</span>
          }
        </h1>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedbacks.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedbacks);
