import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, email } = this.props;
    return (
      <header>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${email}` } alt="Foto usuário" />
        <h4 data-testid="header-player-name">{ name }</h4>
        <h4 data-testid="header-score">{ 0 }</h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state,
  name: state,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
