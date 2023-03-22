import React, { useState, useEffect } from 'react';
import '../Styles/home.css';

import frontpage_vid from '../assets/videos/frontpage_vid.mp4';
import Navbar from "../Components/Navbar.js";
import Footer from "../Components/Footer.js";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';

import { Link } from 'react-router-dom';
import StoryCover from '../Components/StoryCover';
import axios from 'axios';

const HomePage = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7080/Stories/GetAllStories")
      .then((response) => {
        setStories(response.data.value);
      })
      .catch(() => {
        alert('Failed to fetch stories!');
      });
  }, []);

  const renderSwiperSlides = (startIndex, endIndex) => {
    return stories?.length > 0 ? (
      <div>
        {stories
          .sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate))
          .slice(startIndex, endIndex)
          .map((story) => (
            <SwiperSlide key={story.id}>
              <Link to={`/story/${encodeURIComponent(story.id)}`} key={story.id}>
                <StoryCover story={story} />
              </Link>
            </SwiperSlide>
          ))}
      </div>
    ) : (
      <div className="empty">
        <h2>No stories found</h2>
      </div>
    );
  };

  const emailRef = React.createRef();
  const gdprRef = React.createRef();
  const buttonRef = React.createRef();

  function checkForm() {
    const emailInput = emailRef.current;
    const gdprCheckbox = gdprRef.current;
    const button = buttonRef.current;

    if (!emailInput.value || !gdprCheckbox.checked) {
      button.disabled = true;
      console.log(`button: ${button.disabled}`);
    } else {
      button.disabled = false;
      console.log(`button: ${button.disabled}`);
    }
  }

  function submitEmail(event) {
    event.preventDefault();
    const emailInput = emailRef.current;
    console.log(`email: ${emailInput.value}`);
  }

  return (
    <div className='home-body'>

      <Navbar />

      <div className="bg-header" id="video-background">
        <video autoPlay muted loop playsInline>
          <source src={frontpage_vid} />
        </video>
      </div>

      <div className="hp-container">
        <div className="hp-container-box">
          <div className='hp-container-box-heading'>
            <h2>
              SIGN UP FOR MONTHLY UPDATES
            </h2>
          </div>
          <div id='formbox' className='hp-container-box-formbox'>
            <form id='form' action='' method='POST' acceptCharset='utf-8'
              target='_blank' onSubmit={submitEmail}>
              <input ref={emailRef} className='input' type='email' name='email'
                onKeyUp={checkForm} placeholder='EMAIL ADDRESS' />
              <div>
                <label>
                  <input type="checkbox" ref={gdprRef} onChange={checkForm} name="gdpr" />
                  <strong> Subscription agreement</strong>
                </label>
                <span>: I agree to allow The Azure Archive to email me news and
                  updates and understand that each email will include unsubscribe
                  information.
                </span>
              </div>
              <input ref={buttonRef} className='input-button' name='submit'
                type="submit" value="SUBMIT" disabled />
            </form>
          </div>
        </div>

        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'5'}
          coverflowEffect={{
            rotate: -2,
            stretch: 60,
            depth: 100,
            modifier: 1,
          }}
         
          modules={[EffectCoverflow]}
          className="swiper-container"
        >
          <SwiperSlide>
            {renderSwiperSlides(0, 1)}
          </SwiperSlide>
          <SwiperSlide>
            {renderSwiperSlides(1, 2)}
          </SwiperSlide>
          <SwiperSlide>
            {renderSwiperSlides(2, 3)}
          </SwiperSlide>
          <SwiperSlide>
            {renderSwiperSlides(3, 4)}
          </SwiperSlide>
          <SwiperSlide>
            {renderSwiperSlides(4, 5)}
          </SwiperSlide>
          <SwiperSlide>
            {renderSwiperSlides(6, 7)}
          </SwiperSlide>
          <SwiperSlide>
            {renderSwiperSlides(7, 8)}
          </SwiperSlide>
          <SwiperSlide>
            {renderSwiperSlides(8, 9)}
          </SwiperSlide>
          <SwiperSlide>
            {renderSwiperSlides(9, 10)}
          </SwiperSlide>
          <SwiperSlide>
            {renderSwiperSlides(10, 11)}
          </SwiperSlide>
          <SwiperSlide>
            {renderSwiperSlides(11, 12)}
          </SwiperSlide>
        </Swiper>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
