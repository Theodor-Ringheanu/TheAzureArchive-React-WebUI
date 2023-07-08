import { useParams } from 'react-router-dom';
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

  const [sections, setSections] = useState([]);

  useEffect(() => {
    axios
      .get(`https://localhost:7080/api/Articles/${id}`)
      .then((response) => {
        const content = response.data.value.content;
        const splitContent = content.split('\n\n');
        const newSections = [];
        splitContent.forEach((p, index) => {
          if (p.startsWith('>') && p.endsWith('>')) {
            const text = p.slice(1, -1);
            newSections.push({ text, index });
          }
        });
        setSections(newSections);
        setArticle(() => {
          return response.data.value;
        });
        setParagraphs(() => {
          const paragraphs = [];
          splitContent.forEach((p, index) => {
            if (p.startsWith('=') && p.endsWith('=')) {
              const text = p.slice(1, -1);
              paragraphs.push(
                <h3
                  key={p}
                  id={`section-${index}`}
                  style={{ textAlign: 'center', margin: '0 auto' }}
                >
                  {text}
                </h3>
              );
            } else if (p.startsWith('_') && p.endsWith('_')) {
              const text = p.slice(1, -1);
              paragraphs.push(<p key={p}><i>{text}</i></p>);
            } else if (p.startsWith('+') && p.endsWith('+')) {
              const text = p.slice(1, -1);
              paragraphs.push(
                <h3 key={p} style={{ textAlign: 'center' }}><i>{text}</i></h3>
              );
            } else if (p.startsWith('*') && p.endsWith('*')) {
              const text = p.slice(1, -1);
              paragraphs.push(<p key={p}><strong>{text}</strong></p>);
            } else if (p.startsWith('>') && p.endsWith('>')) {
              const text = p.slice(1, -1);
              paragraphs.push(
                <h3 key={p} style={{ textAlign: 'center' }}><strong>{text}</strong></h3>
              );
            } else if (p.startsWith('<') && p.endsWith('<')) {
              const text = p.slice(1, -1);
              paragraphs.push(
                <p key={p} style={{ textAlign: 'right' }}><i>{text}</i></p>
              );
            } else {
              const words = p.split(' ');
              const formattedParagraph = [];
              words.forEach((word, index) => {
                if (word.startsWith('*') && word.endsWith('*')) {
                  const text = word.slice(1, -1);
                  formattedParagraph.push(<strong key={index}>{text}</strong>);
                } else if (word.startsWith('_') && word.endsWith('_')) {
                  const text = word.slice(1, -1);
                  formattedParagraph.push(<i key={index}>{text}</i>);
                } else {
                  formattedParagraph.push(word);
                }
                formattedParagraph.push(' ');
              });
              paragraphs.push(<p key={p}>{formattedParagraph}</p>);
            }
          });
          return paragraphs;
        });
        setNumWords(() => {
          return response.data.value.content.split(/\s+/).length;
        });
      });
  }, [id]);

  const handleClick = (index) => {
    const sectionElement = document.getElementById(`section-${index}`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  const [isLightOn, setIsLightOn] = useState(false);
  const handleLightSwitch = () => {
    setIsLightOn(!isLightOn);
  };

  return (
    <Col key={article.id}>
      <div>

        <React.Fragment>
          <Navbar />
        </React.Fragment>

        <div className='app'>
          <a href={`/article/EditArticle/${encodeURIComponent(article.id)}`} key={article.id}>
            <h1>(edit)</h1>
          </a>
        </div>

        <div>
          {scrollPosition >= 1 ? (
            <button className={isLightOn ? 'lightSwitch-off' : 'lightSwitch-on'}
              onClick={handleLightSwitch}>
            </button>) : (<h1></h1>)}
        </div>

        <div className={isLightOn ? 'tldr' : 'tldr tldr-light'}>
          {sections.map((section, index) => (
            <p
              key={index}
              onClick={() => handleClick(section.index)}
              style={{ cursor: 'pointer' }}
            >
              {section.text}
            </p>
          ))}
        </div>

        <div
          className={isLightOn ? 'content-title content-title-article-dark'
            : 'content-title content-title-article-light'}>
          <h2>{article.author}</h2>
          <h1>{article.title}</h1>
          <h2>{publicationDate ? article.publicationDate : publicationDate} · {numWords} words · {Math.floor(numWords / 160)} mins read</h2>
        </div>

        <div className={isLightOn ? 'content content-article-dark' : 'content content-light content-article-light'}>
          {paragraphs.map((paragraph, index) => (
            <React.Fragment key={index}>
              {paragraph}
              {index !== paragraphs.length - 1 && <br />}
              <span id={`section-${index + 1}`}></span>
            </React.Fragment>
          ))}
        </div>

        <div className="content-background content-background-article">
          <div
            className="blur-overlay"
            style={{
              backgroundImage: `url(${article.imageUrl})`,
            }}
          ></div>
          <div
            className={
              isLightOn
                ? "article-gradient-overlay"
                : "article-gradient-overlay article-gradient-overlay-light"
            }
          ></div>
        </div>
      </div>

      <Footer />
    </Col>
  );
};

export default ArticleLayout;
