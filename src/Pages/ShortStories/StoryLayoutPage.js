import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import '../../Styles/App.css';
import Footer from "../../Components/Footer.js";

const StoryLayout = () => {
  const { id } = useParams();
  const [story, setStory] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);
  const [paragraphs, setParagraphs] = useState([]);
  const handleScroll = () => {
    setScrollPosition(window.pageYOffset);
  };
  const opacity = Math.max(1 - scrollPosition / 1, 0);

  useEffect(() => {
    axios
      .get(`https://localhost:7080/api/Stories/${id}`)
      .then((response) => {
        setStory(() => {
          return response.data.value;
        });
        setParagraphs(() => {
          const content = response.data.value.content;
          const splitContent = content.split('\n\n');
          const paragraphs = [];
          splitContent.forEach((p) => {
            if (p.startsWith('*') && p.endsWith('*')) {
              const text = p.slice(1, -1);
              paragraphs.push(<h3 key={p}>{text}</h3>);
            } else {
              paragraphs.push(<p key={p}>{p}</p>);
            }
            paragraphs.push(<br key={`${p}_br`} />);
          });
          return paragraphs;
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
    <Col key={story.id}>
      <div>

        <div className='app'>
          <Link to={`/story/EditStory/${encodeURIComponent(story.id)}`} key={story.id}>
            <h2>(edit)</h2>
          </Link>
        </div>

        <div
          className='content-title'
          style={{ opacity: opacity, }}>
          <h1>{story.title}</h1>
          <h2>{story.author}</h2>
        </div>

        <p
          className='scroller'
          style={{ opacity: opacity, }}>
          It all begun with a scroll...
        </p>

        <div className='content'>
          {paragraphs.map((paragraph, index) => (
            <React.Fragment key={index}>
              {paragraph}
              {paragraph.type === "p"}
            </React.Fragment>
          ))}
        </div>

        <div
          className='content-background'
          style={{
            backgroundImage: `url(${story.imageUrl})`,
            opacity: opacity,
          }}>
        </div>
      </div>

      <Footer />
    </Col>
  );
};

export default StoryLayout;
