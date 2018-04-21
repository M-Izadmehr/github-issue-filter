import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import TagsInput from 'react-tagsinput';
import moment from 'moment';
import 'react-tagsinput/react-tagsinput.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import saga from './saga';
import { getRepositoryIssues } from './actions';
import Loader from '../../images/loader.gif';
import IssuesCard from '../../components/Card/Issues';

export class Issues extends React.PureComponent {
  constructor(props) {
    super(props);
    const search = props.location.search.substring(1);
    const query = search ? JSON.parse(`{"${decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`) : {};
    this.state = {
      creator: query.creator ? query.creator : '',
      sort: query.sort ? query.sort : '',
      direction: query.direction ? query.direction : '',
      state: query.state ? query.state : '',
      //
      tags: query.tags ? query.tags.split(',') : [],
      since: query.since ? moment(query.since) : null,
      url: props.location.search ? props.location.search : '?',
      redirect: false,
    };
  }

  componentDidMount() {
    this.props.getRepositoryIssues(this.props.name, this.state.url);
  }

  componentWillReceiveProps(nextProps) {
    this.state.redirect && this.setState({ redirect: false }); // eslint-disable-line no-unused-expressions
    if (nextProps.name !== this.props.name || nextProps.location.search !== this.props.location.search) {
      this.props.getRepositoryIssues(this.props.name, this.state.url);
    }
  }


  submitFilter = () => {
    const { creator, sort, direction, state, tags, since } = this.state;
    const query = {};
    if (creator) query.creator = creator;
    if (sort) query.sort = sort;
    if (direction) query.direction = direction;
    if (state) query.state = state;
    if (tags.length) query.tags = tags.join(',');
    if (since) query.since = since.format('YYYY-MM-DDTHH:MM:SSZ');
    this.setState({ url: `?${Object.keys(query).map((k) => `${k}=${query[k]}`).join('&')}`, redirect: true });
  };

  renderForm = () => (
    <form>
      <div className="card-body bg-light text-dark">
        {this.state.redirect && <Redirect push to={this.state.url} />}
        {/* creator */}
        <div className="form-row mb-3">
          <div className="col">
            <label htmlFor="inputState">Sort by</label>
            <select
              id="inputState"
              className="form-control"
              onChange={(evt) => this.setState({ sort: evt.target.value })}
            >
              <option value="created">created</option>
              <option value="updated">updated</option>
              <option value="comments">comments</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="inputDirection">Sort direction</label>
            <select
              id="inputState"
              className="form-control"
              onChange={(evt) => this.setState({ direction: evt.target.value })}
            >
              <option value="desc">descending</option>
              <option value="asc">ascending</option>
            </select>
          </div>
        </div>
        <hr />
        <div className="form-row mb-3">
          <div className="col">
            <label htmlFor="inputTags">Labels</label>
            <TagsInput
              value={this.state.tags}
              onChange={(tags) => {
                this.setState({ tags });
              }}
            />
          </div>
          <div className="col">
            <label htmlFor="inputState">State</label>
            <select
              id="inputState"
              className="form-control"
              onChange={(evt) => this.setState({ state: evt.target.value })}
            >
              <option value="all">all</option>
              <option value="open">open</option>
              <option value="closed">closed</option>
            </select>
          </div>
        </div>
        <hr />
        <div className="form-row mb-3">
          <div className="col">
            <label htmlFor="date">date</label>
            <DatePicker
              selected={this.state.since}
              onChange={(date) => {
                this.setState({ since: date });
              }}
            />
          </div>
          <div className="col">
            <label htmlFor="author">author</label>
            <div className="col input-group p-0">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">@</span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Creator"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={this.state.creator}
                onChange={(evt) => this.setState({ creator: evt.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );

  render() {
    const { loading, error, data } = this.props;
    return (
      <div>
        {loading && <div className="loading"><img className="loading-icon" src={Loader} alt="loading..." /></div>}
        {!loading && !error &&
        <div>

          <div className="card text-white bg-success mb-5">
            <div className="card-header d-flex justify-content-between">
              <h4>Filter Issues</h4>
              <button className="btn btn-danger" onClick={this.submitFilter}>Apply</button>
            </div>
            {this.renderForm()}
          </div>
          {data.map((item) => <IssuesCard item={item} key={item.id} />)}
        </div>
        }
      </div>
    );
  }
}

Issues.propTypes = {
  getRepositoryIssues: propTypes.func,
  loading: propTypes.bool,
  error: propTypes.object,
  location: propTypes.object,
  data: propTypes.array,
  name: propTypes.string,
};

function mapStateToProps(stateJs) {
  const name = stateJs.toJS().repository.name;
  const { loading, data, error } = stateJs.toJS().issues;
  return {
    loading, data, error, name,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRepositoryIssues: (name, search) => dispatch(getRepositoryIssues(name, search)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'issues', saga });
export default compose(withConnect, withSaga)((Issues));

