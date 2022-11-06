import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import { Home, Profile, GroupPage, DiscussionPage, MessagePage, BookDetailsPage, SearchResultsPage } from './pages';
import { ScrollButton } from './components/reusable';
import Navbar from "./components/reusable/navbar/Navbar";

const App = () => {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/group/:id" element={<GroupPage />} />
        <Route path="/discussion/:id" element={<DiscussionPage />} />
        <Route path="/messages/:id" element={<MessagePage />} />
        <Route path="/bookdetails/:id" element={<BookDetailsPage />} />
        <Route path="/search/:searchTerm" element={<SearchResultsPage />} />
      </Routes>
      <ScrollButton />
    </Box>
  );
}

export default App;
