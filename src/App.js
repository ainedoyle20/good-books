import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

import { Home, Profile, GroupPage, DiscussionPage, MessagePage, BookDetailsPage, SearchResultsPage } from './pages';
import { ScrollButton } from './components/reusable';
import Navbar from "./components/reusable/navbar/Navbar";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      "2xl": 2000,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
