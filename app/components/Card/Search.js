import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Card = ({ item, changeRepository }) => (
  <div className="card mt-5">
    <div className="card-header">
      {item.owner.login}
    </div>
    <div className="card-body">
      <h5 className="card-title">{item.name}</h5>
      <p
        className="card-text"
      >{item.description[0] === ':' ? item.description.split(' ').splice(1).join(' ') : item.description}</p>
      <Link to="/" className="btn btn-primary" onClick={() => changeRepository(item.full_name)}>Go To Repository</Link>
    </div>
  </div>
);
Card.propTypes = {
  item: propTypes.object,
  changeRepository: propTypes.func,
};
export default Card;
