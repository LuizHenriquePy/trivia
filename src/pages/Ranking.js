import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  state = {
    rankingList: [], // vem do localStorage
  };

  componentDidMount() {
    const { name, email, score } = this.props;
    const playerObj = {
      name,
      email: md5(email).toString(),
      score,
    };
    console.log(playerObj);
    const list = JSON.parse(localStorage.getItem('ranking') || '[]');
    console.log(JSON.stringify(list));
    list.push(playerObj);
    list.sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(list));
    this.setState({ rankingList: list });
  }

  render() {
    const { rankingList } = this.state;
    const MINUS_1 = -1;
    let i = MINUS_1;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          {
            rankingList.map((player) => {
              i += 1;
              return (
                <div key={ i }>
                  <img src={ `https://www.gravatar.com/avatar/${player.email}` } alt="Foto usuário" />
                  <p data-testid={ `player-name-${i}` }>{ player.name }</p>
                  <p data-testid={ `player-score-${i}` }>{ player.score }</p>
                  <hr />
                </div>
              );
            })
          }
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            const { history } = this.props;
            history.push('/');
          } }
        >
          Go Home
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Ranking);
