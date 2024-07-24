import React, { useState } from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { createLocation } from '../../../services/locationService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateLocation = () => {
  const [locationData, setLocationData] = useState({
    name: '',
    description: '',
    map: '',
    image1: null,
    image2: null,
    image3: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocationData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e, imageKey) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setLocationData((prevData) => ({ ...prevData, [imageKey]: event.target.result }));
      };

      reader.readAsDataURL(file);
    } else {
      setLocationData((prevData) => ({ ...prevData, [imageKey]: null }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform any additional validation if needed

      // Call locationService to handle location creation
      const response = await createLocation(locationData);

      // Handle the response from the server
      if (response.EC === 0) {
        toast.success('Địa điểm đã được thêm thành công!');
      } else {
        toast.error('Đã xảy ra lỗi khi thêm địa điểm.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Đã xảy ra lỗi khi thêm địa điểm.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Tạo địa điểm mới</h2>
          <Form onSubmit={handleFormSubmit}>
            <FormGroup row>
              <Label for="name" sm={2}>
                Tên địa điểm
              </Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nhập tên địa điểm"
                  value={locationData.name}
                  onChange={handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="description" sm={2}>
                Mô tả
              </Label>
              <Col sm={6}>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Nhập mô tả"
                  value={locationData.description}
                  onChange={handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="map" sm={2}>
                Bản đồ hoặc tọa độ
              </Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="map"
                  id="map"
                  placeholder="Nhập bản đồ hoặc tọa độ"
                  value={locationData.map}
                  onChange={handleInputChange}
                />
              </Col>
            </FormGroup>
            {['image1', 'image2', 'image3'].map((imageKey) => (
              <FormGroup key={imageKey} row>
                <Col sm={2}>
                  <Label for={imageKey}>
                    {imageKey.charAt(5).toUpperCase() + imageKey.slice(6)}
                  </Label>
                </Col>
                <Col sm={6}>
                  <div className="input-group">
                    <Input
                      type="file"
                      name={imageKey}
                      id={imageKey}
                      onChange={(e) => handleImageChange(e, imageKey)}
                    />
                    {locationData[imageKey] && (
                      <img
                        src={locationData[imageKey]}
                        alt={`${imageKey} preview`}
                        style={{ width: '70px', height: '70px' }}
                      />
                    )}
                  </div>
                </Col>
              </FormGroup>
            ))}
            <FormGroup row>
              <Col sm={{ offset: 2, size: 6 }}>
                <Button color="primary" type="submit">
                  Thêm địa điểm
                </Button>
              </Col>
            </FormGroup>
          </Form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default CreateLocation;
