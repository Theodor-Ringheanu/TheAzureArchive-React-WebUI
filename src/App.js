import React from 'react';
import { Routes, Route } from 'react-router-dom';


import ShortStoriesPage from './Pages/ShortStoriesPage';
import StoryLayoutPage from './Pages/StoryLayoutPage';
import HomePage from './Pages/HomePage';
import BlogPage from './Pages/BlogPage';
import AboutPage from './Pages/AboutPage';
import AddStoryPage from './Pages/AddStoryPage';
import EditStoryPage from './Pages/EditStoryPage';

export default function App() {
  return (
    <div>
        <Routes>
          <Route path='/home' element={<HomePage />} />
          <Route path='/blog' element={<BlogPage />} />
          <Route path='/short-stories' element={<ShortStoriesPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/story/:id' element={<StoryLayoutPage />} />
          <Route path='/AddStory' element={<AddStoryPage />} />
          <Route path='/story/EditStory/:id' element={<EditStoryPage />} />
        </Routes>
    </div>
  );
};
