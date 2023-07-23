import React, { useState, useEffect } from "react";
import "../../Styles/App.css"
import '../../Styles/edit.css';
import '../../Styles/covers.css';
import ArticleCover from "../../Components/ArticleCover";
import Navbar from "../../Components/Navbar.js";
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
      
        <Navbar />

      <div className="blog-page-background">
        <img />
      </div>
      <div className="blog-page-title">
        <h1>Articles</h1>
      </div>

      {
        articles?.length > 0 ? (
          <div className="article-container">
            {articles
              .sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate))
              .map((article) => (
                <a href={`/article/${encodeURIComponent(article.id)}`} key={article.id}>
                  <ArticleCover article={article} />
                </a>
              ))}
          </div>
        ) : (
          <div className="empty">
            <h2></h2>
          </div>
        )
      }

      <Footer />
    </div >
  );
};

export default BlogPage;
