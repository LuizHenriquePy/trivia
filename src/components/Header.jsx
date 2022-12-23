import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import logo1 from '../images/logo1.png';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    const emailHash = md5(email).toString();
    return (
      <header className="shadow-custom mb-4">
        <div className="container row">
          <div className="d-none d-md-block col-md-3">
            <img className="trivia-logo" alt="trivia-logo" src={ logo1 } />
          </div>
          <div
            className="col-6
          col-md-6 profile justify-content-start justify-content-md-center"
          >
            <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${emailHash}` } alt="Foto usuário" />
            <h4 data-testid="header-player-name">
              { name }
            </h4>
          </div>
          <div className="col-6 col-md-3 text-end">
            <h4 data-testid="header-score">
              Pontos:
              {' '}
              { score }
            </h4>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
