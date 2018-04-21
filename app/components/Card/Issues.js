import React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';

const Card = ({ item }) => (
  <div className="card mb-4">
    <div className="card-header">
      {item.title}
    </div>
    <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
      <div className="">
        <p className="card-text">Created at: {moment(item.created_at).format('YYYY/DD/MM')}</p>
        <p className="card-text">Updated at: {moment(item.updated_at).format('YYYY/DD/MM')}</p>
        {item.closed_at &&
        <p className="card-text">Closed at: {moment(item.closed_at).format('YYYY/DD/MM')}</p>}
      </div>
      <a href={item.url} className="btn btn-primary">Go to Issue</a>
    </div>
  </div>
);
Card.propTypes = {
  item: propTypes.object,
};
export default Card;
