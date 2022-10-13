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
      <div className="container-fluid text-center">
        <h1 className="display-3 my-3" data-testid="ranking-title">Ranking</h1>
        <div>
          <ul className="list-group col-sm-12 col-md-8 col-lg-8 col-xl-4 mx-auto my-4">
            {
              rankingList.map((player) => {
                i += 1;
                return (
                  <li key={ i } className="list-group-item text-center p-4 shadow">
                    <img
                      src={ `https://www.gravatar.com/avatar/${player.email}` }
                      className="img-thumbnail rounded-circle shadow-sm"
                      alt="..."
                    />
                    <h4
                      data-testid={ `player-name-${i}` }
                      className="fw-normal mt-2"
                    >
                      { player.name }
                    </h4>
                    <h4
                      data-testid={ `player-score-${i}` }
                      className="fw-light"
                    >
                      { player.score }
                      &nbsp;pts
                    </h4>
                  </li>
                );
              })
            }
          </ul>
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          className="btn btn-outline-primary btn-lg my-4"
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
