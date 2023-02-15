import {
  faClock,
  faEnvelope,
  faEnvelopeOpenText,
  faHeart,
  faMapMarkerAlt,
  faMobile,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Button,
} from 'react-bootstrap';
import logo from '../../images/logo.png';

const Footer = () => {
  return (
    <footer>
      <Container fluid className="bg-dark py-5">
        <Container className="pb-5 pt-3">
          <Row>
            <Col className="text-center">
              <img className="img-fluid" src={logo} alt="" />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="text-light">
            <Col>
              <p>
                <FontAwesomeIcon
                  className="text-danger me-2"
                  icon={faMapMarkerAlt}
                ></FontAwesomeIcon>
                Block B, House 64 Rd No 18, Dhaka
              </p>
              <p>
                <a className='text-light' href="tel:01731335439">
                  <FontAwesomeIcon
                    className="text-danger me-2"
                    icon={faMobile}
                  ></FontAwesomeIcon>
                  +880 1731335439
                </a>
              </p>
              <p>
                <a className='text-light' href="mailto:ambroseshishir306@gmail.com">
                  <FontAwesomeIcon
                    className="text-danger me-2"
                    icon={faEnvelope}
                  ></FontAwesomeIcon>
                  ambroseshishir306@gmail.com
                </a>
              </p>
            </Col>
            <Col>
              <p>
                <FontAwesomeIcon
                  className="text-danger me-2"
                  icon={faClock}
                ></FontAwesomeIcon>
                Sales Department
              </p>
              <p>
                <small>Mon-Fri: 8:00 am – 5:00 pm</small> <br />
                <small>Sunday is closed</small>
              </p>
            </Col>
            <Col>
              <p>
                <FontAwesomeIcon
                  className="text-danger me-2"
                  icon={faClock}
                ></FontAwesomeIcon>
                Service Department
              </p>
              <p>
                <small>Mon-Fri: 8:00 am – 5:00 pm</small> <br />
                <small>Sunday is closed</small>
              </p>
            </Col>
            <Col>
              <p>
                <FontAwesomeIcon
                  className="text-danger me-2"
                  icon={faEnvelopeOpenText}
                ></FontAwesomeIcon>
                NEWSLETTER
              </p>
              <InputGroup className="mb-3">
                <InputGroup.Text id="email">@</InputGroup.Text>
                <FormControl
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="email"
                />
              </InputGroup>
              <Button variant="danger">Subscribe</Button>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container>
        <Col className="text-center mt-4">
          <p className="fw-bold">
            Design with{' '}
            <FontAwesomeIcon className="text-danger" icon={faHeart} /> by SCD
            MOTORS
          </p>
        </Col>
      </Container>
    </footer>
  );
};

export default Footer;
