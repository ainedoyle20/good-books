import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

// import useGlobalStore from './store/globalStore';
// import { auth, onAuthStateChanged } from './utils/firebase';
import { Home, Profile, GroupPage, DiscussionPage, MessagePage } from './pages';
import { Navbar, ScrollButton } from './components/reusable';

const App = () => {
  // const { addUser } = useGlobalStore();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is signed in
  //       addUser()
  //     } else {
  //       // User is signed out
  //     }
  //   })
  // }, [])

  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/group/:id" element={<GroupPage />} />
        <Route path="/discussion/:id" element={<DiscussionPage />} />
        <Route path="/messages/:id" element={<MessagePage />} />
      </Routes>
      <ScrollButton />
    </Box>
  );
}

export default App;
