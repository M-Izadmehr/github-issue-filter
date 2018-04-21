import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import propTypes from 'prop-types';
import SearchCard from '../../components/Card/Search';
import saga from '../../containers/Search/saga';
import { searchRepository } from '../../containers/Search/actions';
import injectSaga from '../../utils/injectSaga';
import Loader from '../../images/loader.gif';
import { changeRepository } from '../HomePage/actions';

class Search extends React.PureComponent {
  componentDidMount() {
    this.props.searchRepository(this.props.match.params.input);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.url !== nextProps.match.url) {
      this.props.searchRepository(this.props.match.params.input);
    }
  }

  render() {
    const { loading, error, data } = this.props;
    return (
      <div className="container">
        {loading &&
        <div className="loading"><img className="loading-icon" src={Loader} alt="loading..." /></div>}
        {!loading && !error && data.items.map((item) => (<SearchCard
          key={item.id}
          item={item}
          changeRepository={this.props.changeRepository}
        />))
        }
      </div>
    );
  }
}

Search.propTypes = {
  searchRepository: propTypes.func,
  changeRepository: propTypes.func,
  match: propTypes.object,
  data: propTypes.object,
  error: propTypes.object,
  loading: propTypes.bool,
};

function mapStateToProps(stateJS) {
  const { loading, error, data } = stateJS.toJS().search;
  return { loading, error, data };
}

function mapDispatchToProps(dispatch) {
  return {
    searchRepository: (input) => dispatch(searchRepository(input)),
    changeRepository: (input) => dispatch(changeRepository(input)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'searchRepository', saga });
export default compose(withConnect, withSaga)((Search));
