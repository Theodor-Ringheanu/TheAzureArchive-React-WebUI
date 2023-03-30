import React, { useState, useEffect } from "react";
import "../Styles/App.css"
import add_story from "../assets/Images/add_story.jpg";
import StoryCover from "../Components/StoryCover";
import Navbar from "../Components/Navbar.js";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../Components/Footer.js";

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

  return (
    <div>

      <React.Fragment>
        <Navbar />
      </React.Fragment>

      <div className="page-background">
        <img
          alt="Short Stories Page Background" />
      </div>
      <div className="app">
        <h1 style={{ padding: "5%" }
        }>Short Stories</h1>
      </div>

      {
        stories?.length > 0 ? (
          <div className="story-container">
            {stories.map((story) => (
              <Link to={`/story/${encodeURIComponent(story.id)}`} key={story.id}>
                <StoryCover story={story} />
              </Link>
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
            <h2>No stories found</h2>
          </div>
        )
      }

      <Footer />
    </div >
  );
};

export default ShortStoriesPage;
