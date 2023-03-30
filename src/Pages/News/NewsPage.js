import React, { useState, useEffect } from "react";
import "../../Styles/App.css"
import add_story from "../../assets/Images/add_story.jpg";
import NewsCover from "../../Components/NewsCover";
import Navbar from "../../Components/Navbar.js";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../../Components/Footer.js";

const NewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7080/api/News")
      .then((response) => {
        setNews(response.data.value);
      })
      .catch(() => {
        alert('Failed to fetch news!');
      });
  }, []);

  return (
    <div>

      <React.Fragment>
        <Navbar />
      </React.Fragment>

      <div className="page-background">
        <img
          alt="Blog Page Background" />
      </div>
      <div className="app">
        <h1 style={{ padding: "5%" }
        }>Industry News</h1>
      </div>

      {
        news?.length > 0 ? (
          <div className="story-container">
            {news.map((news) => (
              <Link to={`/news/${encodeURIComponent(news.idNews)}`} key={news.idNews}>
                <NewsCover news={news} />
              </Link>
            ))}

            <div>
              <Link to={`/AddNews`}>
                <div className="story">
                  <div >
                  </div>
                  <div>
                    <img src={add_story}
                      alt="add_news">
                    </img>
                  </div>

                </div>
              </Link>
            </div>
          </div>
        ) : (
          <div className="empty">
            <h2>No news found</h2>
          </div>
        )
      }

      <Footer />
    </div >
  );
};

export default NewsPage;
