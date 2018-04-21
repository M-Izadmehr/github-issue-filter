import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import './style.scss';

export class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    let searchInput = '';
    if (props.route.indexOf('search') > 0 && props.route.split('/')[2]) {
      searchInput = props.route.split('/')[2];
    }
    this.state = { searchInput };
  }

  render() {
    return (
      <div className="comp-header">
        <nav className="navbar navbar-light bg-light justify-content-between">
          <a className="navbar-brand" href="/">Issue Manager</a>
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search for a repository"
              aria-label="Search"
              value={this.state.searchInput}
              onChange={(evt) => this.setState({ searchInput: evt.target.value })}
            />
            <Link to={`/search/${this.state.searchInput}`}>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </Link>
          </form>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  route: propTypes.string,
};

function mapStateToProps(stateJS) {
  return { route: stateJS.toJS().route.location.pathname };
}

export default connect(mapStateToProps)(Header);
