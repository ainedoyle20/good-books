import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import { Home, Profile, FriendProfile } from './pages';
import { Navbar, ScrollButton } from './components/reusable';

const App = () => {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<FriendProfile />} />
      </Routes>
      <ScrollButton />
    </Box>
  );
}

export default App;
