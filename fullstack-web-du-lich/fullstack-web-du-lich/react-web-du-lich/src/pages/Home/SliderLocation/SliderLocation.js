import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './SliderLocation.scss';

const SliderLocation = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // Thay đổi số 3000 để điều chỉnh thời gian chuyển đổi tự động giữa các slide

    return () => clearInterval(intervalId);
  }, []);

  const slides = [
    'https://res.klook.com/image/upload/fl_lossy.progressive,q_90/c_fill,,w_2560,/v1670577664/banner/rtw7fgqatgoc1vpcpamb.webp',
    'https://res.klook.com/image/upload/fl_lossy.progressive,q_90/c_fill,,w_2560,/v1670577678/banner/tvhfgpkiapfldzoaj8ll.webp;',
  ];

  return (
    <div className="slider-wrapper my-2">
      <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
        {slides.map((slide, i) => (
          <Carousel.Item key={i}>
            <img className="d-block w-100" src={slide} alt={`Slide ${i + 1}`} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default SliderLocation;
