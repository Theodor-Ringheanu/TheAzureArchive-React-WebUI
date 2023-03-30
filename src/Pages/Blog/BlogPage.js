import React, { useState, useEffect } from "react";
import "../../Styles/App.css"
import add_story from "../../assets/Images/add_story.jpg";
import ArticleCover from "../../Components/ArticleCover";
import Navbar from "../../Components/Navbar.js";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../../Components/Footer.js";

const BlogPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7080/api/Articles")
      .then((response) => {
        setArticles(response.data.value);
      })
      .catch(() => {
        alert('Failed to fetch articles!');
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
        }>Posts</h1>
      </div>

      {
        articles?.length > 0 ? (
          <div className="story-container">
            {articles.map((article) => (
              <Link to={`/article/${encodeURIComponent(article.id)}`} key={article.id}>
                <ArticleCover article={article} />
              </Link>
            ))}

            <div>
              <Link to={`/AddArticle`}>
                <div className="story">
                  <div >
                  </div>
                  <div>
                    <img src={add_story}
                      alt="add_article">
                    </img>
                  </div>

                </div>
              </Link>
            </div>
          </div>
        ) : (
          <div className="empty">
            <h2>No articles found</h2>
          </div>
        )
      }

      <Footer />
    </div >
  );
};

export default BlogPage;
