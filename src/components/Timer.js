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
    const { idTimer } = this.state;
    stopTimer(idTimer);
  }

  timerCounter = () => {
    const { changeTime } = this.props;
    this.setState((prevState) => ({
      time: prevState.time - 1,
    }), () => {
      const { time } = this.state;
      changeTime(time);
    });
  };

  stopTimer = (id) => {
    const { time } = this.state;
    const { checkedAnswer } = this.props;
    if (time === 0) {
      clearInterval(id);
      checkedAnswer('INCORRECT');
    }
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
  changeTime: PropTypes.func.isRequired,
  checkedAnswer: PropTypes.func.isRequired,
};
