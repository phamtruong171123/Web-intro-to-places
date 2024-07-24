import React, { useEffect, useState, useContext } from 'react';
import { Table, Button } from 'react-bootstrap'; // Import thư viện Bootstrap hoặc thư viện khác tương tự
import { UserContext } from '../../../context/UserContext';
import './TripsOfCustomer.scss';
import { getTripsOfUser } from '../../../services/tripService';

const TripOfCustomer = () => {
    const { user } = useContext(UserContext);
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        const response = await getTripsOfUser(user.account.id);
        if(response && response.data.EC === 0) {
            setTrips(response.data.DT);
        }
    };
  
  // Mặc định khi không có chuyến đi
  if (!trips || trips.length === 0) {
    return <p>Bạn chưa có chuyến đi nào</p>;
  }

  return (
    <div className="trip-list-container">
        <h3 className='my-5'>Các chuyến đi đã đăng ký</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Địa điểm</th>
            <th>Người đăng ký</th>
            <th>Số lượng</th>
            <th>SĐT</th>
            <th>Email</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Trạng thái</th>
            <th>Giá</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.Location.name}</td>
              <td>{trip.name}</td>
              <td>{trip.numberOfPeople}</td>
              <td>{trip.phone}</td>
              <td>{trip.email}</td>
              <td>{trip.startDate}</td>
              <td>{trip.endDate}</td>
              <td>{trip.status}</td>
              <td>{trip.price}</td>
              <td>
                <Button variant="danger">Hủy chuyến</Button>{' '}
                <Button variant="info">Cập nhật</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TripOfCustomer;
