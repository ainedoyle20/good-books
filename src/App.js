import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import { Home, Profile, GroupPage, DiscussionPage } from './pages';
import { Navbar, ScrollButton } from './components/reusable';

const App = () => {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/group/:id" element={<GroupPage />} />
        <Route path="/discussion/:id" element={<DiscussionPage />} />
      </Routes>
      <ScrollButton />
    </Box>
  );
}

export default App;
