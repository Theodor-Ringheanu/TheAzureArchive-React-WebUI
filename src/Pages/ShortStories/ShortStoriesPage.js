import React, { useState, useEffect } from "react";
import "../../Styles/App.css";
import "../../Styles/covers.css";
import add_story from "../../assets/Images/add_story.jpg";
import StoryCover from "../../Components/StoryCover";
import Navbar from "../../Components/Navbar.js";
import Sidebar from "../../Components/Sidebar.js";
import { Link } from "react-router-dom";
import axios from "axios";

const ShortStoriesPage = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7080/api/Stories")
      .then((response) => {
        setStories(response.data.value);
      })
      .catch(() => {
        alert('Failed to fetch stories!');
      });
  }, []);

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    document.body.style.overflowX = 'scroll';
    const handleWheel = (e) => {
      if (e.deltaX !== 0 || e.deltaY !== 0) {
        e.preventDefault();
        window.scrollBy(e.deltaY, e.deltaX);
      }
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      document.body.style.overflowY = 'auto';
      document.body.style.overflowX = 'auto';
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const [sidebar, setSidebar] = useState(false)

  const scrollEvent = () => {
    if (window.scrollX >= 1) {
      setSidebar(true);
    }
  }

  window.addEventListener('scroll', scrollEvent);

  return (
    <div>
      <div className="story-page-background ">
      </div>

      <div className="story-intro">
        <h1>Short Stories</h1>
      </div>

      <div>
        {
          stories?.length > 0 ? (
            <div className="story-container">
              {stories
                .sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate))
                .map((story) => (
                  <a href={`/story/${encodeURIComponent(story.id)}`} key={story.id}>
                    <StoryCover story={story} />
                  </a>
                ))}

              <div>
                <Link to={`/AddStory`}>
                  <div className="story">
                    <div >
                    </div>
                    <div>
                      <img src={add_story}
                        alt="add_story">
                      </img>
                    </div>

                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <div className="empty">
              <h2></h2>
            </div>
          )
        }
      </div >

      {!sidebar ? <Navbar /> : <Sidebar />}

    </div>
  );
};

export default ShortStoriesPage;
