import React, { useState, useEffect } from 'react';
import '../Styles/home.css';
import { format } from 'date-fns'
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar.js";
import Footer from "../Components/Footer.js";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { EffectCoverflow } from 'swiper';
import ArticleCover from '../Components/ArticleCover';
import StoryCover from '../Components/StoryCover';
import axios from 'axios';

const HomePage = () => {
  const [stories, setStories] = useState([]);
  const [articles, setArticles] = useState([]);
  const publications = [...stories, ...articles];

  useEffect(() => {
    axios
      .get("https://localhost:7080/api/Stories")
      .then((response) => {
        setStories(response.data.value);
      })
    axios
      .get("https://localhost:7080/api/Articles")
      .then((response) => {
        setArticles(response.data.value);
      })
  }, []);

  publications.sort(() => Math.random() - 0.5);

  const renderSwiperSlides = (startIndex, endIndex) => {
    return publications.length > 0 ? (
      <div>
        {publications
          .slice(startIndex, endIndex)
          .map((item) => (
            <SwiperSlide key={item.id}>
              {item.series ? (
                <a href={`/story/${encodeURIComponent(item.id)}`} key={item.id}>
                  <StoryCover story={item} />
                </a>
              ) : (
                <a href={`/article/${encodeURIComponent(item.id)}`} key={item.id}>
                  <ArticleCover article={item} />
                </a>
              )}
            </SwiperSlide>
          ))}
      </div>
    ) : (
      <div className="empty">
        <h2>No publications found</h2>
      </div>
    );
  };

  const navigate = useNavigate();
  const emailRef = React.createRef();
  const gdprRef = React.createRef();
  const buttonRef = React.createRef();

  function checkForm() {
    const emailInput = emailRef.current;
    const gdprCheckbox = gdprRef.current;
    const button = buttonRef.current;

    if (!emailInput.value || !gdprCheckbox.checked) {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  }

  function submitEmail(e) {
    e.preventDefault();
    const emailInput = emailRef.current;
    const payload = {
      email: emailInput.value,
      isSubscribed: true,
      dateAdded: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    };

    axios
      .post("https://localhost:7080/api/EmailsSubscribed", payload)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.log(`Apparently there's this error: ${error}`);
      });
  }

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='home-body'>

      <Navbar />

      <div className="bg-header">
        <div className="scroll-down" />
      </div>

      <div className="hp-container">
        <div className="hp-container-box" id='updates'>
          <div className='hp-container-box-heading'>
            <h2>
              SIGN UP FOR MONTHLY UPDATES
            </h2>
          </div>
          <div className='hp-container-box-formbox' id='formbox'>
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

        {screenWidth >= 1024 && (
          <div>
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={'5'}
              coverflowEffect={{
                rotate: -2,
                stretch: 15,
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
        )}
      </div>

      <Footer />

    </div>
  );
};

export default HomePage;
