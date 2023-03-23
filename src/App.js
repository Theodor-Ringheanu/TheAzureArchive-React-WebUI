import React from 'react';
import { Routes, Route } from 'react-router-dom';


import ShortStoriesPage from './Pages/ShortStoriesPage';
import StoryLayoutPage from './Pages/StoryLayoutPage';
import HomePage from './Pages/HomePage';
import BlogPage from './Pages/Blog/BlogPage';
import AboutPage from './Pages/AboutPage';
import AddStoryPage from './Pages/AddStoryPage';
import AddArticlePage from './Pages/Blog/AddArticlePage';
import EditStoryPage from './Pages/EditStoryPage';
import EditArticlePage from './Pages/Blog/EditArticlePage';
import ArticleLayoutPage from './Pages/Blog/ArticleLayoutPage';

export default function App() {
  return (
    <div>
        <Routes>
          <Route path='/home' element={<HomePage />} />
          <Route path='/blog' element={<BlogPage />} />
          <Route path='/short-stories' element={<ShortStoriesPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/story/:id' element={<StoryLayoutPage />} />
          <Route path='/article/:id' element={<ArticleLayoutPage />} />
          <Route path='/AddStory' element={<AddStoryPage />} />
          <Route path='/AddArticle' element={<AddArticlePage />} />
          <Route path='/story/EditStory/:id' element={<EditStoryPage />} />
          <Route path='/article/EditArticle/:id' element={<EditArticlePage />} />
        </Routes>
    </div>
  );
};
