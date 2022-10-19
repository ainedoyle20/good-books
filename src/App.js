import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import { Home, Profile } from './pages';
import { Navbar, ScrollButton } from './components/reusable';

const App = () => {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
      <ScrollButton />
    </Box>
  );
}

export default App;
