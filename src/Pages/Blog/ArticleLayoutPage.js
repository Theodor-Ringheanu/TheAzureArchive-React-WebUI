import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import '../../Styles/App.css';
import Footer from "../../Components/Footer.js";
import Navbar from "../../Components/Navbar.js";

const ArticleLayout = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [publicationDate, setPublicationDate] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);
  const [paragraphs, setParagraphs] = useState([]);
  const handleScroll = () => {
    setScrollPosition(window.pageYOffset);
  };
  const [numWords, setNumWords] = useState(0);

  const partialOpacity = () => {
    let i = 1 - scrollPosition / 200;
    if (i > 1) {
      return i;
    }
    else return 1;
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
      .get(`https://localhost:7080/api/Articles/${id}`)
      .then((response) => {
        setArticle(() => {
          return response.data.value;
        });
        setParagraphs(() => {
          return response.data.value.content.split('\n\n');
        });
        setNumWords(() => {
          return response.data.value.content.split(/\s+/).length;
        });
        window.scrollTo(0, 0);
      });
  }, [id]);

  console.log(article.publicationDate);

  useEffect(() => {
    if (article && article.publicationDate) {
      const date = new Date(article.publicationDate);
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const monthName = months[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
      const _publicationDate = `${day} ${monthName} ${year}`;
      setPublicationDate(_publicationDate);
    }
  }, [article]);
  
  console.log(publicationDate);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Col key={article.id}>
      <div>

        <React.Fragment>
          <Navbar />
        </React.Fragment>

        <div className='app'>
          <Link to={`/article/EditArticle/${encodeURIComponent(article.id)}`} key={article.id}>
            <h2>(edit)</h2>
          </Link>
        </div>

        <div
          className='content-title content-title-article'>
          <h2>{article.author}</h2>
          <h1>{article.title}</h1>
          <h2>{publicationDate ? article.publicationDate :  publicationDate} · {numWords} words · {Math.floor(numWords / 160)} mins</h2>
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
            backgroundImage: `url(${article.imageUrl})`,
            opacity: partialOpacity(),
            filter: `blur(${blur()}px)`,
          }}>
          <div className='article-gradient-overlay'></div>
        </div>
      </div>

      <Footer />
    </Col>
  );
};

export default ArticleLayout;
