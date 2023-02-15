import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = (props) => {
  const { _id, title, price, fileName, description } = props.products || {};

  // displaying 200 characters of string
  // let result = desc.slice(0, 100) + (desc.length > 100 ? "..." : "");

  return (
    <Col md={4}>
      <Card className="my-3 mx-auto shadow">
        <Card.Img variant="top" src={fileName} />
        <Card.Body>
          <Card.Title className="pb-3 fw-bold">{title}</Card.Title>
          <Card.Text>
            <small className="text-ellipsis">{description}</small>
          </Card.Text>
          <h4 className="fw-bold py-3">
            &#2547;
            {new Intl.NumberFormat('en-IN', {
              maximumSignificantDigits: 3,
            }).format(price)}
          </h4>
          <Link to={`details/${_id}`}>
          <button className="btn btn-danger fw-bold w-100">
            {/* <FontAwesomeIcon className="me-1" icon={faShoppingCart} /> */}
            See Details
          </button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Product;
