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
    window.scrollTo(0, 0);
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
              paragraphs.push(<h3 key={p} style={{ textAlign: 'center', margin: '0 auto' }}>{text}</h3>);
            } else if (p.startsWith('_') && p.endsWith('_')) {
              const text = p.slice(1, -1);
              paragraphs.push(<p key={p}><i>{text}</i></p>);
            } else if (p.startsWith('+') && p.endsWith('+')) {
              const text = p.slice(1, -1);
              paragraphs.push(<h3 key={p} style={{ textAlign: 'center' }}><i>{text}</i></h3>);
            } else {
              const words = p.split(' ');
              const formattedParagraph = [];
              words.forEach((word, index) => {
                if (word.startsWith('_') && word.endsWith('_')) {
                  const text = word.slice(1, -1);
                  formattedParagraph.push(<i key={index}>{text}</i>);
                } else {
                  formattedParagraph.push(word);
                }
                formattedParagraph.push(' ');
              });
              paragraphs.push(<p key={p}>{formattedParagraph}</p>);
            }
            paragraphs.push(<br key={`${p}_br`} />);
          });
          return paragraphs;
        });
      });
  }, [id]);
  
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [isLightOn, setIsLightOn] = useState(false);
  const handleLightSwitch = () => {
    setIsLightOn(!isLightOn);
    if (isLightOn) {
      document.body.style.backgroundColor = "#111314";
    } else {
      document.body.style.backgroundColor = "white";
    }
  };

  return (
    <Col key={story.id}>
      <div>

        <div className='app'>
          <Link to={`/story/EditStory/${encodeURIComponent(story.id)}`} key={story.id}>
            <h3>edit</h3>
          </Link>
        </div>

        <div
          className='content-title'
          style={{ opacity: opacity, }}>
          <h1 className='content-title-story'>{story.title}</h1>
          <h2 className='content-title-story-author'>{story.author}</h2>
        </div>

        <p
          className='scroller'
          style={{ opacity: opacity, }}>
          It all begun with a scroll...
        </p>

        <div>
          {scrollPosition >= 1 ? (
            <button className={!isLightOn ? 'lightSwitch-off' : 'lightSwitch-on'}
              onClick={handleLightSwitch}>
            </button>) : (<h1></h1>)}
        </div>


        <div className={!isLightOn ? 'content' : 'content content-light'}>
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
