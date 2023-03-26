import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Timer extends Component {
  state = {
    time: 30,
    idTimer: '',
  };

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {
    const { stopTimer } = this;
    const { idTimer, time } = this.state;
    const { stopTimerNow } = this.props;
    if (stopTimerNow || time === 0) {
      stopTimer(idTimer);
    }
  }

  timerCounter = () => {
    const { updateTime } = this.props;
    this.setState((prevState) => ({
      time: prevState.time - 1,
    }), () => {
      const { time } = this.state;
      updateTime(time);
    });
  };

  stopTimer = (id) => {
    clearInterval(id);
  };

  startTimer = () => {
    const ONE_SECOND = 1000;
    const idTimer = setInterval(this.timerCounter, ONE_SECOND);
    this.setState({ idTimer });
  };

  render() {
    const { time } = this.state;
    return (
      <div>{ time }</div>
    );
  }
}

Timer.propTypes = {
  updateTime: PropTypes.func.isRequired,
  stopTimerNow: PropTypes.bool.isRequired,
};
