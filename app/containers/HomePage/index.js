import React from 'react';
import propTypes from 'prop-types';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Switch, Route, Link } from 'react-router-dom';
import Issues from '../Issues/';
import saga from './saga';
import Loader from '../../images/loader.gif';
import { getRepositoryData } from './actions';
import './style.scss';

export class HomePage extends React.PureComponent {
  componentDidMount() {
    this.props.getRepositoryData(this.props.name);
  }
  render() {
    const { loading, error, data } = this.props;
    return (
      <div className="cont-homepage container">
        {loading && <div className="loading"><img className="loading-icon" src={Loader} alt="loading..." /></div>}
        {!loading && !error &&
        <div>
          <div className="repo-header d-flex flex-column flex-md-row align-items-end">
            <h1 className="display-4 mb-0 mt-0 mr-2">{data.name[0].toUpperCase() + data.name.substr(1)} Repository</h1>
            <div className="pagehead mb-2">
              <div className="item">
                <div className="social-title">
                  <svg className="octicon octicon-star" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true" >
                    <path fillRule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z" />
                  </svg>
                  Star
                </div>
                <a className="social-count"> {data.stargazers_count} </a>
              </div>
            </div>
          </div>
          <div className="jumbotron mb-1">
            <p className="lead" >{data.description[0] === ':' ? data.description.split(' ').splice(1).join(' ') : data.description}</p>
            <hr className="my-4" />
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <ul>
                <li>Language: {data.language}</li>
                <li>Open Issues: {data.open_issues}</li>
              </ul>
              <p className="lead">
                <Link className="btn btn-primary btn-lg" to="/issues">Track Issues</Link>
              </p>
            </div>
          </div>

          <Switch>
            <Route exact path="/issues" component={Issues} />
          </Switch>
        </div>
        }
      </div>
    );
  }
}

HomePage.propTypes = {
  getRepositoryData: propTypes.func,
  loading: propTypes.bool,
  error: propTypes.object,
  data: propTypes.object,
  name: propTypes.string,
};

function mapStateToProps(stateJs) {
  const state = stateJs.toJS().repository;
  const { loading, data, error, name } = state;
  return {
    loading, data, error, name,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRepositoryData: (input) => dispatch(getRepositoryData(input)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'searchRepository', saga });
export default compose(withConnect, withSaga)((HomePage));
