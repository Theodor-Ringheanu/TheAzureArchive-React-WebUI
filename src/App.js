import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ShortStoriesPage from './Pages/ShortStories/ShortStoriesPage';
import StoryLayoutPage from './Pages/ShortStories/StoryLayoutPage';
import StoryAdminPage from './Pages/Admin/StoryAdminPage'
import HomePage from './Pages/HomePage';
import BlogPage from './Pages/Blog/BlogPage';
import PrivacyPage from './Pages/PrivacyPage';
import AddStoryPage from './Pages/ShortStories/AddStoryPage';
import AddArticlePage from './Pages/Blog/AddArticlePage';
import EditStoryPage from './Pages/ShortStories/EditStoryPage';
import EditArticlePage from './Pages/Blog/EditArticlePage';
import ArticleLayoutPage from './Pages/Blog/ArticleLayoutPage';
import ArticleAdminPage from './Pages/Admin/ArticleAdminPage'
import AdminPage from './Pages/Admin/AdminPage';
import CopyrightPage from './Pages/CopyrightPage';
import AboutPage from './Pages/AboutPage';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/articles' element={<BlogPage />} />
        <Route path='/short-stories' element={<ShortStoriesPage />} />
        <Route path='/privacy' element={<PrivacyPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/copyright' element={<CopyrightPage />} />
        <Route path='/7bcdt4gw462' element={<AdminPage />} />
        <Route path='/story/:id' element={<StoryLayoutPage />} />
        <Route path='/article/:id' element={<ArticleLayoutPage />} />
        <Route path='/story7bcdt4gw462/:id' element={<StoryAdminPage />} />
        <Route path='/article7bcdt4gw462/:id' element={<ArticleAdminPage />} />
        <Route path='/AddStory7bcdt4gw462' element={<AddStoryPage />} />
        <Route path='/AddArticle7bcdt4gw462' element={<AddArticlePage />} />
        <Route path='/story7bcdt4gw462/EditStory/:id' element={<EditStoryPage />} />
        <Route path='/article7bcdt4gw462/EditArticle/:id' element={<EditArticlePage />} />
        <Route path='/faq' element={<AboutPage />} />
        <Route path='/contact' element={<AboutPage />} />

      </Routes>
    </div>
  );
};
