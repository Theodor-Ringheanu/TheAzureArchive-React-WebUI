import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import '../../Styles/App.css';
import Footer from "../../Components/Footer.js";

const NewsLayout = () => {
  const { id } = useParams();
  const [news, setNews] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);
  const [paragraphs, setParagraphs] = useState([]);
  const handleScroll = () => {
    setScrollPosition(window.pageYOffset);
  };

  const partialOpacity = () => {
    let i = 1 - scrollPosition / 200;
    if (i > 0.2) {
      return i;
    }
    else return 0.2;
  };

  const blur = () => {
    if (scrollPosition / 50 > 0 && scrollPosition / 50 < 10) {
      return scrollPosition / 10;
    }
    if (scrollPosition / 50 >= 10) {
      return 50;
    }
    else return 1;
  };
  
  useEffect(() => {
    axios
      .get(`https://localhost:7080/api/News/${id}`)
      .then((response) => {
        setNews(() => {
          return response.data.value;
        });
        setParagraphs(() => {
          return response.data.value.content.split('\n\n');
        });
        window.scrollTo(0, 0);
      });
  }, [id]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Col key={news.idNews}>
      <div>

        <div className='app'>
          <Link to={`/news/EditNews/${encodeURIComponent(news.idNews)}`} key={news.idNews}>
            <h2>(edit)</h2>
          </Link>
        </div>

        <div
          className='content-title content-title-article'>
          <h1>{news.title}</h1>
          <h2>{news.author}</h2>
        </div>

        <div
          className='content content-article'>
          {paragraphs.map((paragraph, index) => (
            <React.Fragment key={index}>
              <p>{paragraph}</p>
              {index !== paragraphs.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>

        <div
          className='content-background content-background-article'
          style={{
            backgroundImage: `url(${news.imageUrl})`,
            opacity: partialOpacity(),
            filter: `blur(${blur()}px)`,
          }}>
        </div>
      </div>

      <Footer />
    </Col>
  );
};

export default NewsLayout;
