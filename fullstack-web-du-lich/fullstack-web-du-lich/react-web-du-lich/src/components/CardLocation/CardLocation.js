// CardLocation.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Thêm Link từ react-router-dom

import './CardLocation.scss';

const CardLocation = ({ id, name, imageUrl, description, rating }) => {
  return (
    <Card className="card-location">
      <Card.Body>
        {/* Sử dụng Link để bao bọc ảnh và tên */}
        <Link to={`/location/${id}`}>
          <Card.Img className="card-img" variant="top" src={imageUrl} alt="Location Image" />
          <Card.Title>{name}</Card.Title>
        </Link>
        <div className="rating">{renderStars(rating)}</div>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

const renderStars = (rating) => {
  const stars = [];
  const numberOfStars = rating || 5;
  for (let i = 0; i < numberOfStars; i++) {
    stars.push(<span key={i}>&#9733;</span>);
  }
  return stars;
};

CardLocation.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default CardLocation;
