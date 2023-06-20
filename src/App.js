import React from 'react';
import { Routes, Route } from 'react-router-dom';


import ShortStoriesPage from './Pages/ShortStories/ShortStoriesPage';
import StoryLayoutPage from './Pages/ShortStories/StoryLayoutPage';
import HomePage from './Pages/HomePage';
import BlogPage from './Pages/Blog/BlogPage';
import PrivacyPage from './Pages/PrivacyPage';
import AddStoryPage from './Pages/ShortStories/AddStoryPage';
import AddArticlePage from './Pages/Blog/AddArticlePage';
import EditStoryPage from './Pages/ShortStories/EditStoryPage';
import EditArticlePage from './Pages/Blog/EditArticlePage';
import ArticleLayoutPage from './Pages/Blog/ArticleLayoutPage';
import AdminPage from './Pages/Admin/AdminPage';
import CopyrightPage from './Pages/CopyrightPage';
import AboutPage from './Pages/AboutPage';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/posts' element={<BlogPage />} />
        <Route path='/short-stories' element={<ShortStoriesPage />} />
        <Route path='/privacy' element={<PrivacyPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/copyright' element={<CopyrightPage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/story/:id' element={<StoryLayoutPage />} />
        <Route path='/article/:id' element={<ArticleLayoutPage />} />
        <Route path='/AddStory' element={<AddStoryPage />} />
        <Route path='/AddArticle' element={<AddArticlePage />} />
        <Route path='/story/EditStory/:id' element={<EditStoryPage />} />
        <Route path='/article/EditArticle/:id' element={<EditArticlePage />} />
        <Route path='/faq' element={<AboutPage />} />
        <Route path='/contact' element={<AboutPage />} />
        
      </Routes>
    </div>
  );
};
