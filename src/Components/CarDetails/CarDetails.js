import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { UserContext } from '../../App';
import swal from 'sweetalert';

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState({});
  const [loginUser] = useContext(UserContext);
  const [admin, setAdmin] = useState();

  const { title, price, fileName, description, date } = car || {};

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/admin`)
      .then((res) => res.json())
      .then((data) => {
        const result = data?.filter((item) => item._id === id);
        setCar(result[0]);
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/make-admin`)
      .then((response) => response.json())
      .then((data) => {
        const oneAdmin = data.find(
          (adminData) => adminData.email === loginUser.email
        );
        setAdmin(oneAdmin);
      })
      .catch((error) => {
        console.error(error);
        swal('Error', error.message, 'error');
      });
  }, [admin, loginUser]);

  console.log(car);

  return (
    <div>
      <Navigation></Navigation>
      <Container className='py-5'>
        <Row>
          <Col lg={6}>
            <Image className="img-fluid" src={fileName} />
          </Col>
          <Col lg={6}>
            <h2>{title}</h2>
            <h4 className="fw-bold py-3">
                      &#2547;
                      {new Intl.NumberFormat('en-IN', {
                        maximumSignificantDigits: 3,
                      }).format(price)}
                    </h4>
            <p>{description}</p>
            <Link
              to={
                admin?.email
                  ? ''
                  : `/customer/order/${id}/${title}/${
                      price
                    }/${encodeURIComponent(fileName)}/${description}`
              }
              className="btn btn-danger text-light w-100 fw-bold"
            >
              <FontAwesomeIcon className="me-1" icon={faShoppingCart} />
              Purchase
            </Link>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
}
