import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import '../../Styles/App.css';
import Footer from "../../Components/Footer.js";

const ArticleLayout = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);
  const [paragraphs, setParagraphs] = useState([]);
  const handleScroll = () => {
    setScrollPosition(window.pageYOffset);
  };
  const opacity = Math.max(1 - scrollPosition / 1, 0);

  useEffect(() => {
    axios
      .get(`https://localhost:7080/api/Articles/${id}`)
      .then((response) => {
        setArticle(() => {
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
    <Col key={article.id}>
      <div>

        <div className='app'>
          <Link to={`/article/EditArticle/${encodeURIComponent(article.id)}`} key={article.id}>
            <h2>(edit)</h2>
          </Link>
        </div>

        <div
          className='story-title'
          style={{ opacity: opacity, }}>
          <h1>{article.title}</h1>
          <h2>{article.author}</h2>
        </div>

        <p
          className='scroller'
          style={{ opacity: opacity, }}>
          It all begun with a scroll...
        </p>

        <div
          className='content'>
          {paragraphs.map((paragraph, index) => (
            <React.Fragment key={index}>
              <p>{paragraph}</p>
              {index !== paragraphs.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>

        <div
          id='story-background'
          style={{
            backgroundImage: `url(${article.imageUrl})`,
            opacity: opacity,
          }}>
        </div>
      </div>

      <Footer />
    </Col>
  );
};

export default ArticleLayout;
