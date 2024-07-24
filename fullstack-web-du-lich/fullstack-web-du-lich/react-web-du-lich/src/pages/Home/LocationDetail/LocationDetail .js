import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Carousel, Card, Form, Button } from 'react-bootstrap';
import {getLocationAndReviewByLocationId} from '../../../services/locationService';
import { UserContext } from "../../../context/UserContext";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './LocationDetail.scss';
import { format } from 'date-fns';
import { Modal, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const LocationDetail = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const { user } = useContext(UserContext);
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);  // Thêm state để quản lý trạng thái của Modal
  const [bookingInfo, setBookingInfo] = useState({});  // Thêm state để lưu thông tin đăng ký chuyến đi
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    fetchLocation();

  }, [id]);

  const fetchLocation = async () => {
    let response = await getLocationAndReviewByLocationId(id); 
    if(response && response.data.EC === 0) {
        setLocation(response.data.DT);
    }
}

const handleReviewSubmit = async () => {
    if (!user.isAuthenticated) {
      history.push("/login");
      return;
    }

    try {
      // Gửi đánh giá và bình luận đến server
      const response = await axios.post('http://localhost:8081/add-review', {
        rating: newReview.rating,
        comment: newReview.comment,
        locationId: location.id,
        username: user.account.username,
        userId: user.account.id,
      });

      // Xử lý response từ server nếu cần
      console.log('Review submitted successfully', response.data);

      // Cập nhật location sau khi thêm đánh giá và bình luận
      fetchLocation();
    } catch (error) {
      console.error('Error submitting review', error);
    }
  };

  if (!location) {
    return <div>Loading...</div>;
  }

  // Create an array of image URLs from image1, image2, image3
  const imageArray = [location.image1, location.image2, location.image3].filter(Boolean);

  const roundToNearestHalf = (number) => {
    return Math.round(number * 2) / 2;
  };

  const calculateAverageRating = () => {
  if (!location.reviews || location.reviews.length === 0) {
    return 0; // Trả về 0 nếu không có đánh giá
  }

  // Tính tổng số sao từ tất cả các đánh giá
  const totalStars = location.reviews.reduce((sum, review) => sum + review.rating, 0);

  // Tính số sao trung bình
  const averageRating = totalStars / location.reviews.length;

  // Làm tròn số sao trung bình về phần nửa gần nhất
  return roundToNearestHalf(averageRating);
};

const handleBookingSubmit = async () => {
    // Kiểm tra xem có thông tin location và locationId không
    console.log('Location ID:', location ? location.id : 'N/A');
  
    if (!location) {
      console.error('Location information is missing.');
      return;
    }
  
    // Kiểm tra giá trị userId và locationId trước khi gửi yêu cầu API
    console.log('Booking Info Before:', bookingInfo);
  
    // Thêm locationId vào bookingInfo
    const updatedBookingInfo = {
      ...bookingInfo,
      userId: user.account.id,
      locationId: location.id,
      startDate: startDate,
      endDate: endDate
    };
  
    console.log('Booking Info After:', updatedBookingInfo);
  
    // Gọi API đăng ký chuyến đi
    try {
      const response = await axios.post('http://localhost:8081/book-trip', updatedBookingInfo);
      console.log('Booking response:', response.data);
  
      // Xử lý logic sau khi đặt chuyến đi thành công
      history.push('/trips-of-customer');
    } catch (error) {
      console.error('Error submitting booking', error);
    }
  };
  

  const handleShowModal = () => {
    console.log('Location:', location);
    console.log('Location ID:', location ? location.id : 'N/A');
    if (!user.isAuthenticated) {
        history.push('/login');
    }
  
    if (location) {
      // Nếu location đã được tải, thêm locationId vào bookingInfo
      
    }
    setBookingInfo({ ...bookingInfo, locationId: location.id });
    setBookingInfo({ ...bookingInfo, userId: user.account.id });

    // Thêm locationId vào bookingInfo (nếu location không tồn tại)
    if (!location && bookingInfo.locationId) {
        setBookingInfo({ ...bookingInfo, locationId: bookingInfo.locationId });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setBookingInfo({});
    setShowSuccessAlert(false);
  };

  return (
    <Container className="location-detail my-5">
      {/* Hiển thị thông tin chi tiết của location */}
      <Row>
        <Col md={6}>
          {imageArray.length > 0 ? (
            <Carousel>
              {imageArray.map((image, index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100" src={image} alt={`Image ${index + 1}`} style={{ height: '600px', objectFit: 'cover' }} />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <p>No images available</p>
          )}
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>{location.name}</Card.Title>
              <Card.Text>{location.description}</Card.Text>
              <div className="rating">
                <div>
                    <span style={{fontSize:'30px'}}>{calculateAverageRating()}</span> 
                    <span>{renderStars(calculateAverageRating())}</span>
                </div>
                <div style={{fontSize:'15px', transition:'0.5'}}>
                    ({location.reviews.length} đánh giá)
                </div>
              </div>
            </Card.Body>
          </Card>

            <Button variant="primary" className='mt-2' onClick={handleShowModal}>Book</Button>

          {/* Hiển thị bình luận và form bình luận */}
          <div className="mt-2">
            <h4 className='my-2'>Customer Reviews</h4>
            {location.reviews && location.reviews.length > 0 ? (
              <ul style={{listStyle: 'none'}}>
                {location.reviews.map((review, index) => (
                  <li key={index}>
                    <div className='review my-4'>
                        <div className='username-review'>
                            <div className="circle"></div>
                            <div>
                                <div className='username'>{review.username}</div>
                                <div className='time'>{format(new Date(review.createdAt), "d 'tháng' M, yyyy 'lúc' HH:mm")}</div>
                            </div>
                        </div>
                        <div className='content-review'>
                            <div className='rating'>
                                {renderStars(review.rating)}
                            </div>
                            <div className='comment'>
                                {review.comment}
                            </div>
                        </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet</p>
            )}

            {/* Form để bình luận mới */}
            <Form className="mt-3">
              <Form.Group controlId="rating">
                <Form.Label>Rating:</Form.Label>
                <Form.Control
                  as="select"
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                >
                  <option value="0">Select rating</option>
                  <option value="1">1 star</option>
                  <option value="2">2 stars</option>
                  <option value="3">3 stars</option>
                  <option value="4">4 stars</option>
                  <option value="5">5 stars</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="comment">
                <Form.Label>Comment:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                />
              </Form.Group>
              <Button variant="primary" className='my-2' onClick={handleReviewSubmit}>
                Submit Review
              </Button>
            </Form>
          </div>
        </Col>
      </Row>

        {/* Modal để nhập thông tin đăng ký chuyến đi */}
        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
            <Modal.Title>Booking Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* Hiển thị form để nhập thông tin đăng ký chuyến đi */}
            <Form>
            <Form.Group controlId="formName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter your name"
                value={bookingInfo.name || ''}
                onChange={(e) => setBookingInfo({ ...bookingInfo, name: e.target.value })}
                />
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                type="email"
                placeholder="Enter your email"
                value={bookingInfo.email || ''}
                onChange={(e) => setBookingInfo({ ...bookingInfo, email: e.target.value })}
                />
            </Form.Group>

            <Form.Group controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                type="tel"
                placeholder="Enter your phone number"
                value={bookingInfo.phone || ''}
                onChange={(e) => setBookingInfo({ ...bookingInfo, phone: e.target.value })}
                />
            </Form.Group>

            <Form.Group controlId="formNumberOfPeople">
                <Form.Label>Number of People</Form.Label>
                <Form.Control
                type="number"
                placeholder="Enter the number of people"
                value={bookingInfo.numberOfPeople || ''}
                onChange={(e) => setBookingInfo({ ...bookingInfo, numberOfPeople: e.target.value })}
                />
            </Form.Group>

            <Form.Group controlId="formStartDate">
                <Form.Label>Start Date</Form.Label>
                <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                />
            </Form.Group>

            <Form.Group controlId="formEndDate">
                <Form.Label>End Date</Form.Label>
                <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                />
            </Form.Group>

            <Button variant="primary" onClick={handleBookingSubmit}>
                Submit Booking
            </Button>
            </Form>
        </Modal.Body>
        </Modal>

        {/* Hiển thị alert thông báo thành công */}
        <Alert variant="success" show={showSuccessAlert} onClose={() => setShowSuccessAlert(false)} dismissible>
        Booking submitted successfully!
        </Alert>

    </Container>
  );
};

const renderStars = (rating) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<span style={{color:'#FFC400', fontSize:'20px'}} key={i}>&#9733;</span>);
  }
  return stars;
};

export default LocationDetail;
